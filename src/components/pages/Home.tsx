import axios from "axios";
import { BlogCard } from "../common/BlogCard";
import { Topbar } from "../common/Topbar";
import { useEffect, useState } from "react";
import type { Blog} from "../../assets/types";
import { useUserContext } from "../../contexts/UserContext";
import { formatDate, trimContent } from "../../services/services";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "../common/Spinner";
import { API_BASE_URL } from "../../config/api";

export function Home(){

    const [blogs, setBlogs] = useState([]);
    const [name, setName] = useState("");
    const [profileId, setProfileId] = useState("");
    const [myView, setMyView] = useState(false);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const filter = searchParams.get('filter') || '';

    const { user, userType, isUserLoaded } = useUserContext();

    const handleViewToggle = () => {
        if(myView == true){
            setMyView(false);
            setLoading(true);
        }
        else{
            setMyView(true);
            setLoading(true);
        }
    }

    useEffect(() => {
        setName(user ? user.name : "");
        setProfileId(user ? user.id : "");
    }, [user]);

    useEffect(() => {

        if(!isUserLoaded){
            return
        }
        let filteredBlogs;
        const fetchBlogs = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/blog/bulk`,
                {
                    params:
                    {
                        filter: filter
                    }
                }
            );
            if(myView == true){
                filteredBlogs = response.data.blogs.filter((blog : Blog) => blog.author.id == user?.id);
            }
            else{
                filteredBlogs = response.data.blogs.filter((blog: Blog) => blog.author.id != user?.id);
            }
            setBlogs(filteredBlogs);
            setLoading(false);
        }
        fetchBlogs();
    }, [user, myView, filter, isUserLoaded]);
    return (
        <div>
            <Topbar profileName={name} profileId={profileId} userType={userType} isUserLoaded={isUserLoaded}></Topbar>
            {myView == false ? 
            <div className="ml-15 mt-5 mb-5 flex">
                <div className="bg-green-400 rounded-full mr-2 hover:bg-gray-300 active:bg-gray-400">
                    <button className="p-2 font-bold cursor-pointer">Other blogs</button>
                </div>
                <div className="bg-gray-200 rounded-full mr-2 hover:bg-gray-300 active:bg-gray-400">
                    <button onClick={handleViewToggle} className="p-2 font-bold cursor-pointer">My blogs</button>
                </div>
            </div> :
            <div className="ml-15 mt-5 mb-5 flex">
                <div className="bg-gray-200 rounded-full mr-2 hover:bg-gray-300 active:bg-gray-400">
                    <button onClick={handleViewToggle} className="p-2 font-bold cursor-pointer">Other blogs</button>
                </div>
                <div className="bg-green-400 rounded-full mr-2 hover:bg-gray-300 active:bg-gray-400">
                    <button className="p-2 font-bold cursor-pointer">My blogs</button>
                </div>
            </div>}
            {!loading ? 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-15">
                {blogs.map((blog : Blog)=>(
                    <div key={blog.id} className="flex">
                        <BlogCard id={blog.id} authorId={blog.authorId} authorName={blog.author.name} date={formatDate(blog.date)} title={blog.title} content={trimContent(blog.content, 100)}></BlogCard>
                        <div className="ml-10 mt-10 mr-15">
                            <hr className="w-1 h-9/10 bg-gray-100 border-0 rounded-sm"></hr>
                        </div>
                    </div>
                ))}
            </div> : 
            <Spinner></Spinner>
            }
        </div>
    )
}