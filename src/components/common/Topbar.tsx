import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Avatar } from "./Avatar"
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

type TopbarType = {
    profileName: string,
    profileId: string,
    userType: string,
    isUserLoaded: boolean
}
export function Topbar({profileName, profileId, userType, isUserLoaded}: TopbarType){
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { setToken } = useUserContext()
    

    const logout = async () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/signin');
    }

    useEffect(() => {
        const filter = searchParams.get('filter') || "";
        setSearchTerm(filter);
    }, [searchParams])

    return (
        <div>
            <div className="h-16 w-screen shadow-sm flex items-center">
                <Link to="/home">
                    <div className="text-3xl font-bold text-gray-900 ml-5 mt-2 mb-2">
                        PenCraft
                    </div>
                </Link>
                <div className="hidden md:flex h-10 bg-gray-100 w-60 ml-8 rounded-3xl items-center">
                    <div className="ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                    </div>
                    <div className="ml-3">
                        <input className="outline-none" placeholder="Search" value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }} 
                        onKeyDown={(e) => { if(e.key == 'Enter'){navigate(`/home?filter=${encodeURIComponent(searchTerm.trim())}`)}}}></input>
                    </div>
                </div>
                <div className="flex justify-end items-center w-full">
                    {userType == 'registered' ?
                    <Link to = "/create" className="flex items-center group">
                        <div className="md:mr-1 group-hover:bg-gray-50 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                        </div>
                        <div className="">
                            <div className="hidden md:block mr-6 group-hover:bg-gray-50">
                                Write
                            </div>
                        </div>
                    </Link>
                    : null}
                    <div className="mr-2">
                        <Avatar name = {profileName} profileId = {profileId} userType={userType} isUserLoaded={isUserLoaded}></Avatar>
                    </div>
                    {userType != 'guest' ?
                    <div className="flex justify-center items-center w-20 h-8 mr-5 rounded-md bg-gray-900 shadow-sm transition hover:bg-gray-800 active:bg-gray-700">
                        <button className="w-full h-full text-white text-sm font-semibold cursor-pointer" onClick={logout}>Logout</button>
                    </div> :
                    <div className="flex justify-center items-center w-20 h-8 mr-6 rounded-md bg-gray-900 shadow-sm transition hover:bg-gray-800 active:bg-gray-700">
                        <button className="w-full h-full text-white text-sm font-semibold cursor-pointer" onClick={() => {
                            navigate('/signup');
                        }}>Signup</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}