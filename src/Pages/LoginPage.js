import TextHeader from "../Components/TextHeader";
import InputBox from "../Components/InputBox";
import Button from "../Components/Button";
import {use, useEffect, useRef, useState} from "react";
import EmailChecker from "../Scripts/EmailChecker";
import TosterMessage from "../Components/TosterMessage";
import {Link} from "react-router-dom";
import Loader from "../Components/Loader";
import {useNavigate} from "react-router-dom";
import img from "../Assests/Images/linkdin.png"
import SocialFooter from "../Components/SocialFooter";
import TextTitle from "../Components/TextTitle";

function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const[loaderFlag, setLoaderFlag] = useState(false);
    const navigator = useNavigate();
    const API_URL = process.env.REACT_APP_backend_url;

    const [toast, setToast] = useState({
        message: '',
        isVisible: false
    });

    const showToast = (message) => {
        setToast({ message, isVisible: true });
        setTimeout(hideToast, 2000); // Automatically hides after 2 seconds
    };

    const hideToast = () => {
        setToast(prev => ({
            ...prev,
            isVisible: false
        }));
    };



    function onLoginClick(e) {
        e.preventDefault();
        const email = emailRef.current.getData();
        const password = passwordRef.current.getData();
        setLoaderFlag(true);
        if(EmailChecker(email)) {

            try{
                fetch(`${API_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    })
                }).then(async res => {
                        setLoaderFlag(false);
                        if (res.status === 406) {
                            showToast("User Doesn't Exsist")
                        } else if (res.status === 200) {
                            showToast("Login  Successful!")
                            const encodedEmail = btoa(email)
                            navigator(`/${encodedEmail}/folderdashboard`)
                        } else if (res.status === 404) {
                            showToast("Password Incorrect");
                        } else {
                            showToast("Something went wrong!");
                        }
                    }
                )
            }catch(err){
                setLoaderFlag(false);
                showToast("Server Busy");
            }

        }else{
            showToast("Invalid Email");
            setLoaderFlag(false);
        }
    }

    return (
        <div
            className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex justify-center items-center absolute flex-col">
            <TextTitle/>
            <SocialFooter/>
            <div
                className="flex flex-col bg-primary justify-evenly items-center w-[40vw] h-[42vh] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
                <TextHeader props={{header: "Login"}}/>

                <TosterMessage
                    content={toast.message}
                    isVisible={toast.isVisible}
                    onHide={hideToast}
                />

                <form onSubmit={onLoginClick}>
                    <InputBox
                        props={{placeholder: "Email Address", type: "email", required: true, autoComplete: "email"}}
                        ref={emailRef}
                    />
                    <InputBox
                        props={{placeholder: "Password", type: "text", required: true, autoComplete: "password"}}
                        ref={passwordRef}
                    />

                    <div className="v-[100vw] flex justify-center items-center flex-col">
                        {loaderFlag ? <Loader/> : null}
                        <button
                            className="cursor-none m-2 py-2 px-4 shadow-[rgba(50,_50,_105,_0.25)_0px_4px_10px_0px,_rgba(0,_0,_0,_0.1)_0px_2px_2px_0px] false rounded-md border border-zinc-600 text-text_primary hover:shadow-[rgba(50,_50,_105,_0.4)_0px_8px_20px_0px,_rgba(0,_0,_0,_0.2)_0px_4px_4px_0px]  hover:border-zinc-400 transition-all duration-300"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="flex justify-between w-full px-4 mt-4 ">
                    <Link
                        to="/create"
                        className="font-light text-text_primary hover:text-gray-600 transition-all duration-300 text-center w-full"
                    >
                        New User ?
                    </Link>

                    <Link
                        to="/forgot-password"
                        className="  font-light text-text_primary hover:text-gray-600 transition-all duration-300 text-center w-full"
                    >
                        Forgot Password !
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default LoginPage;