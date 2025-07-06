import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../common/AuthButton";
import { InputField } from "../common/InputField";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { API_BASE_URL } from "../../config/api";
import { Spinner } from "../common/Spinner";

export function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const navigate = useNavigate();

    const { setToken, setUserType, setIsUserLoaded } = useUserContext();

    useEffect(() => {

        const checkAuthStatus = async () => {
            const token = localStorage.getItem('token');
            if(token){
                try{
                    const response = await axios.get(`${API_BASE_URL}/api/v1/user/me`,{
                        'headers': {
                            'Authorization' : `Bearer ${token}`
                        }
                    });
                    if(response.status == 200){
                        navigate('/home')
                        return
                    }
                    else{
                        localStorage.removeItem('token');
                        setToken(null);
                    }
                }
                catch(error){
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setIsCheckingAuth(false);
        }
        checkAuthStatus();
    }, [])

    async function submitData(){
        try{
            const response = await axios.post(`${API_BASE_URL}/api/v1/user/signin`,
                {
                    email,
                    password
                }
            )
            if(response.status==200){
                localStorage.setItem('token', response.data.token)
            }
            setToken(response.data.token);
            navigate('/home');
        }
        catch(error){
            if(isAxiosError(error) && error.response){
                const status = error.response.status;
                switch (status){
                    case 401: {
                        alert("The email or password you entered is incorrect. Please check and try again.");
                        navigate('/signin');
                        break;
                    }
                    case 422:
                        alert("Invalid username, email, or password format. Please check your input and try again.");
                        navigate('/signin');
                        break;
                    default:
                        alert("Please try again. Some error occurred");
                        navigate('/signin');
                        break;
                }
            }
        }
    }

    const handleGuestAccess = async () => {
        if (localStorage.getItem('token') !== null) {
            localStorage.setItem('token', '');
        }
        setIsUserLoaded(true);
        setToken(null);
        setUserType('guest');
        navigate('/home');
    }

    if(isCheckingAuth){
        return <Spinner></Spinner>
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex justify-center items-center h-full w-full lg:w-1/2 px-4">
                <div>
                    <div className = "flex flex-col justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className="mt-3">
                                <h1 className="text-4xl font-bold">Welcome back!</h1>
                            </div>
                            <div className="mt-3">
                                <span className="text-base">Don't have an account? </span>
                                <Link to='/signup'><span className="underline text-base">Signup</span></Link>
                            </div>
                        </div>
                        <div className="mt-3">
                            <InputField onChange = {function(e){
                                setEmail(e.target.value);
                            }} name="email" text='Email' placeholder='Enter your email' isPassword={false} />
                        </div>
                        <div className="mt-3">
                            <InputField onChange = {function(e){
                                setPassword(e.target.value)}} name="password" text='Password' placeholder='Enter your password' isPassword={true} />
                        </div>
                        <div className="mt-3 hover:bg-gray-50">
                            <AuthButton text="Signin" onClick={submitData}></AuthButton>
                        </div>
                        <div className="mt-3">
                            <AuthButton text="Continue as Guest" onClick={handleGuestAccess}></AuthButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block bg-gray-100 h-full w-1/2">
                <div className="flex flex-col justify-center items-center h-full w-full">
                    <div className="text-2xl font-bold w-130">
                        <p>"Working with this team has been a game-changer for our business. Their attention to detail exceeded all our expectations."</p>
                    </div>
                    <div className="w-130 mt-3">
                        <p className="font-bold">Sarah Chen</p>
                    </div>
                    <div className="w-130">
                        <p className="text-sm text-gray-500">Founder, TechFlow Solutions</p>
                    </div>
                </div>
            </div>
        </div>
    )
}