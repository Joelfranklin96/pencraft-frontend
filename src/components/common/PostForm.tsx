import { useEffect, useMemo, useState } from "react"
import { Avatar } from "../common/Avatar"
import { useUserContext } from "../../contexts/UserContext"
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";
import JoditEditor from 'jodit-react';

export const PostForm = ({isCreateMode} : {isCreateMode: boolean}) => {

    const { user, userType, isUserLoaded } = useUserContext();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [profileId, setProfileId] = useState("");

    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    
    const editorConfig = useMemo(() => ({
      readonly: false,
      height: 400,
      placeholder: 'Write your story…',
      buttons: [
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'ul', 'ol', '|', 'outdent', 'indent', '|',
        'fontsize', 'paragraph', '|', 'link', '|',
        'left', 'center', 'right', 'justify', '|',
        'undo', 'redo', '|', 'eraser', 'fullsize'
      ],
      removeButtons: ['about', 'image', 'video', 'file', 'table', 'iframe'],
      showXPathInStatusbar: false,
      showCharsCounter: true,
      showWordsCounter: true,
      toolbarAdaptive: true,
      uploader: { insertImageAsBase64URI: false },
      disablePlugins: ['drag-and-drop', 'drag-and-drop-element', 'file'],
      enter: 'p' as const,
      statusbar: true,
      hidePoweredByJodit: true,
      license: 'MIT'
    }), []);
    
    const publishPost = async () => {
        if(isCreateMode){
            try{
                const response = await axios.post(`${API_BASE_URL}/api/v1/blog`, 
                    {
                        'title': title,
                        'content' : content
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                const statusCode = response.status
                if(statusCode == 200){
                    alert("Your story has been published successfully!");
                    navigate(`/blog/${response.data.blog.id}`);
                }
            }
            catch(error){
                if(axios.isAxiosError(error) && error.response){
                    const statusCode = error.response.status;
                    switch(statusCode){
                        case 422:
                            alert("Please check your title and content. Make sure both fields are filled out properly before publishing.");
                            break;
                        case 500:
                            alert("We're experiencing technical difficulties. Please try publishing your story again in a moment.");
                            break;
                        case 401:
                            alert("Your session has expired. Please sign in again to publish your story.");
                            break;
                        default:
                            alert("Something went wrong while publishing your story. Please try again.");
                            break;
                    }
                }
            }
        }
        else{
            try{
                const response = await axios.put(`${API_BASE_URL}/api/v1/blog/${id}`, 
                    {
                        'title': title,
                        'content': content
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                if(response.status == 200){
                    alert("Blog updated successfully!");
                    navigate(`/blog/${response.data.blog.id}`);
                }
            }
            catch(error){
                if(axios.isAxiosError(error) && error.response){
                    const statusCode = error.response.status;
                    switch(statusCode){
                        case 422:
                            alert("Invalid update details. Please check your title and content.");
                            break;
                        case 500:
                            alert("Error while updating. Please try again.");
                            break;
                        default:
                            alert("Something went wrong. Please try again.");
                            break;
                    }
                }
            }
        }
    }

    useEffect(() => {
        setName(user ? user.name : "");
        setProfileId(user ? user.id : "");
    }, [user]);
    
    useEffect(() => {
        const fetchTitleAndContent = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/blog/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setTitle(response.data.blog.title);
            setContent(response.data.blog.content);
        }
        
        if(!isCreateMode){
            fetchTitleAndContent();
        }
    }, [])

    return (
        <div>
            <div className="flex justify-center mt-5">
                <div className="flex w-50 lg:w-200 items-center">
                    <Link to='/home'>
                        <div className="mr-4 flex items-center">
                            <p className="font-bold text-3xl">PenCraft</p>
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center">
                        <p>Draft Post</p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="mr-4 w-19 bg-green-400 rounded-xl flex items-center justify-center hover:bg-gray-300 active:bg-gray-400">
                        <button onClick={publishPost}><p className="font-bold cursor-pointer">Publish</p></button>
                    </div>
                    <Avatar name={name} profileId={profileId} userType={userType} isUserLoaded={isUserLoaded}></Avatar>
                </div>
            </div>
            <div className="flex justify-center mt-20">
                <div className="flex flex-col w-70 md:w-150 lg:w-200">
                    <div className="bg-gray-100 rounded-sm w-full">
                        <input onChange={(e) => {setTitle(e.target.value)}} value={title} placeholder="Title" className="text-2xl w-full pl-2 py-2"></input>
                    </div>
                    <div className="bg-white rounded-sm w-full mt-3 border border-gray-300">
                        <div className="prose prose-lg max-w-none">
                            <JoditEditor
                                value={content}
                                config={editorConfig}
                                onBlur={(newContent) => {setContent(newContent)}}
                                onChange={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}