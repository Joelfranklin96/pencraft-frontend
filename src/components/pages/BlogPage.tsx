import { Topbar } from "../common/Topbar";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { BlogTitleBar } from "../common/BlogTitleBar";
import { formatDate, trimContent } from "../../services/services";
import { Avatar } from "../common/Avatar";
import type { Blog } from "../../assets/types";
import { BlogCard } from "../common/BlogCard";
import { Spinner } from "../common/Spinner";
import { API_BASE_URL } from "../../config/api";
import DOMPurify from 'dompurify';


export function BlogPage(){
    const [name, setName] = useState("");
    const [profileId, setProfileId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [isAuthor, setIsAuthor] = useState(false);
    const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    const { user, userType, isUserLoaded } = useUserContext();

    const { id } = useParams(); 

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const deleteBlog = async () => {
    try{
        const response = await axios.delete(`${API_BASE_URL}/api/v1/blog/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if(response.status == 200){
            alert("Blog deleted successfully!");
            navigate('/home');
        }
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            const statusCode = error.response.status;
            switch(statusCode){
                case 404:
                    alert("Blog not found or you are not authorized to delete this blog.");
                    break;
                case 500:
                    alert("Error occurred while deleting blog. Please try again.");
                    break;
                default:
                    alert("Something went wrong. Please try again.");
                    break;
            }
        } else {
            alert("Network error. Please check your connection and try again.");
        }
    }
}

    useEffect(() => {
        setName(user ? user.name : "");
        setProfileId(user ? user.id : "");
    }, [user]);

    useEffect(()=>{
        const fetchBlog = async () => {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/v1/blog/${id}`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            const blog = response.data.blog;
            setCurrentBlog(blog);

            setTitle(blog.title);
            setContent(blog.content);
            setDate(blog.date);
            setAuthorName(blog.author.name);
            setAuthorId(blog.authorId);
            setLoading(false);
        }
        fetchBlog();
    }, [id]);

    useEffect(() => {
        const fetchRelatedBlogs = async () => {

            if(!isUserLoaded || !currentBlog){
                return
            }

            const bulkResponse = await axios.get(`${API_BASE_URL}/api/v1/blog/bulk`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(bulkResponse);
            
            const ownBlogs = bulkResponse.data.blogs.filter((blog: Blog)=>(blog.authorId == currentBlog.author.id && blog.id != currentBlog.id))
            setBlogs(ownBlogs);
        }
        fetchRelatedBlogs();
    }, [id, user, isUserLoaded, currentBlog]);

    useEffect(() => {
    if (user && authorId) {
        setIsAuthor(user.id === authorId);
    } else {
        setIsAuthor(false);
    }
}, [user, authorId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div>
            <Topbar profileName={name} profileId={profileId} userType={userType} isUserLoaded={isUserLoaded}></Topbar>
            {!loading ?
            <div>
                <div className="flex justify-center">
                    <div className="flex flex-col w-80 lg:w-200">
                        <div className='mt-5 flex items-center'>
                            <p className="font-bold text-3xl">{title}</p>
                            {isAuthor?
                            <div className="block lg:flex items-center">
                                <div onClick={() => {navigate(`/blog/${id}/edit`)}} 
                                    className="w-14 bg-yellow-300 rounded-full ml-10 flex items-center justify-center cursor-pointer hover:bg-gray-300 active:bg-gray-400">
                                    <span className="font-bold">Edit</span>
                                </div>
                                <div 
                                    onClick={deleteBlog} 
                                    className="w-17 bg-red-500 rounded-full ml-10 mt-2 lg:ml-3 lg:mt-0 flex items-center justify-center cursor-pointer hover:bg-gray-300 active:bg-gray-400">
                                    <span className="font-bold">Delete</span>
                                </div>
                            </div> : null
                            }
                        </div>
                        <div className="-mt-5">
                            <BlogTitleBar authorId={authorId} authorName={authorName} date={date?formatDate(date):""}></BlogTitleBar>
                        </div>
                        <div className="mt-10 min-h-screen prose prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                        </div>
                        <div className="flex mt-10 items-center">
                            <div className="">
                                <Avatar name={authorName} profileId={authorId} userType="registered" isUserLoaded={isUserLoaded}></Avatar>
                            </div>
                            <div>
                                <p className="font-bold text-xl">Written by {authorName}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center bg-gray-50 w-screen mt-10">
                    {blogs.length != 0 ?
                    <div className="w-80 lg:w-200">
                        <div className="mt-10">
                            <p className="font-bold text-xl">More from {authorName}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {blogs.map((blog:Blog)=>(
                                <div key={blog.id} className="mr-10">
                                    <BlogCard key={blog.id} authorId={authorId} id= {blog.id} authorName={blog.author.name} date={formatDate(blog.date)} title={blog.title} content={trimContent(blog.content, 50)}></BlogCard>
                                </div>
                            ))}
                        </div>
                    </div> :
                    <div>
                    </div>}
                </div>
            </div> : 
            <Spinner></Spinner>
            }
        </div>
    )
}