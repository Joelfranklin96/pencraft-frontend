import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../common/AuthButton";
import { InputField } from "../common/InputField";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { API_BASE_URL } from "../../config/api";
import { Spinner } from "../common/Spinner";

export function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const navigate = useNavigate();

    const { setToken, setIsUserLoaded } = useUserContext();

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

    const submitData = async () => {
        try{
            const response = await axios.post(`${API_BASE_URL}/api/v1/user/signup`,
                {
                    name,
                    email,
                    password
                }
            );
            if(response.status==200){
                localStorage.setItem('token', response.data.token);
                setIsUserLoaded(false);
                setToken(response.data.token);
                navigate('/home');   
            }
        }
        catch(error){
            if (axios.isAxiosError(error) && error.response){
                const status = error.response.status
                switch (status){
                    case 409:
                        alert("This email is already in use. Please choose a different one.");
                        navigate('/signup');
                        break;
                    case 422:
                        alert("Invalid username, email, or password format. Please check your input and try again.");
                        navigate('/signup');
                        break;
                    default:
                        alert("Please try again. Some error occurred");
                        navigate('/signup');
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
        navigate('/home');
    }

    if(isCheckingAuth){
        return (
            <Spinner></Spinner>
        )
    }
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex justify-center items-center h-full w-full lg:w-1/2">
                <div>
                    <div className = "flex flex-col justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className="mt-3">
                                <h1 className="text-4xl font-bold">Create an account</h1>
                            </div>
                            <div className="mt-3">
                                <span className="text-base">Already have an account? </span>
                                <Link to="/signin" ><span className="underline text-base">Login</span></Link>
                            </div>
                        </div>
                        <div className="mt-5">
                            <InputField onChange={function(e){
                                setName(e.target.value);
                            }} name="username" text='Name' placeholder='Enter your name' isPassword={false} />
                        </div>
                        <div className="mt-3">
                            <InputField onChange={function(e){
                                setEmail(e.target.value);
                            }} name="email" text='Email' placeholder='Enter your email' isPassword={false} />
                        </div>
                        <div className="mt-3">
                            <InputField onChange={function(e){
                                setPassword(e.target.value);
                            }} name="password" text='Password' placeholder='' isPassword={true} />
                        </div>
                        <div className="mt-3">
                            <AuthButton text="Signup" onClick={submitData}></AuthButton>
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
                        <p>"The customer service I received was exceptional. The support team went above and beyond to address my concerns."</p>
                    </div>
                    <div className="w-130 mt-3">
                        <p className="font-bold">Jules Winnfield</p>
                    </div>
                    <div className="w-130">
                        <p className="text-sm text-gray-500">CEO, Acme Inc</p>
                    </div>
                </div>
            </div>
        </div>
    )
}