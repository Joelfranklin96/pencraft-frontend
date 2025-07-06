import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Topbar } from "../common/Topbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BlogCard } from "../common/BlogCard";
import type { Blog } from "../../assets/types";
import { formatDate, trimContent } from "../../services/services";
import { Spinner } from "../common/Spinner";
import { API_BASE_URL } from "../../config/api";


export const Profile = () => {
    const [name, setName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [profileId, setProfileId] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const {user, userType, isUserLoaded } = useUserContext();
    const { authorId } = useParams();
    
    const token = localStorage.getItem('token');


    useEffect(() => {
        setProfileId(user ? user.id : "");
        setName(user ? user.name : "");
    }, [user]);

    useEffect(() =>{
        const fetchAuthor = async() => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/user/profile/${authorId}`,
                {
                    headers:
                    {
                        'Authorization' : `Bearer ${token}`
                    }
                }
            );
            setAuthorName(response.data.user.name);
            setBlogs(response.data.user.posts);
            setLoading(false);
        }
        fetchAuthor();
    }, [authorId])

    return (
        <div>
            <Topbar profileName={name} profileId={profileId} userType={userType} isUserLoaded={isUserLoaded}></Topbar>
            {!loading ?
            <div className="flex justify-center">
                <div className="w-80 lg:w-200 mt-20">
                    <p className="font-bold text-2xl">{authorName}</p>
                    <div className="grid">
                    {blogs.map((blog : Blog) => (
                        <BlogCard key={blog.id} authorId={authorId!} id={blog.id} authorName={authorName} date={formatDate(blog.date)} title={blog.title} content={trimContent(blog.content, 50)}></BlogCard>
                    ))}
                </div>
                </div>
            </div> :
            <Spinner></Spinner>
            }
        </div>
    )
}