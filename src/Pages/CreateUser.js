import TosterMessage from "../Components/TosterMessage";
import TextHeader from "../Components/TextHeader";
import SocialFooter from "../Components/SocialFooter";
import TextTitle from "../Components/TextTitle";
import InputBox from "../Components/InputBox";
import Button from "../Components/Button";
import {Link, useNavigate} from "react-router-dom";
import Loader from "../Components/Loader";
import EmailChecker from "../Scripts/EmailChecker";
import {useRef, useState} from "react";

function CreateUser() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const OTPRef = useRef();
    const [loaderFlag, setLoaderFlag] = useState(false);
    const [verificationFlag, setVerificationFlag] = useState(false);
    const [generateOTPFlag, setGenerateOTPFlag] = useState(true);
    const navigate = useNavigate();
    const API_URL = "https://sumtrackerbackend.onrender.com";
    // const API_URL = "https://sum-tracker-backend.vercel.app";

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

    async function handleGenerateOTP() {
        const email = emailRef.current.getData();
        const password = passwordRef.current.getData();

        if (!EmailChecker(email)) {
            showToast("Invalid Email");
            return;
        }

        setLoaderFlag(true);
        try {
            const response = await fetch(`${API_URL}/create-user/otp-generation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            });

            if (response.status === 200) {
                showToast("OTP Generated Successfully");
                setGenerateOTPFlag(false);
            } else if (response.status === 404) {
                showToast("User already exists");
                setTimeout(() => {
                    showToast("Navigating to home");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }, 3000);
            } else {
                showToast("Server Busy");
            }
        } catch (e) {
            showToast("Server Busy");
        } finally {
            setLoaderFlag(false);
        }
    }

    async function handleVerifyOTP() {
        const email = emailRef.current.getData();
        const otp = OTPRef.current.getData();

        setLoaderFlag(true);
        try {
            const response = await fetch(`${API_URL}/create-user/otp-verification`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });

            if (response.status === 200) {
                setVerificationFlag(true);
                showToast("OTP successfully verified");
            } else if (response.status === 404) {
                showToast("OTP unsuccessful");
            } else {
                showToast("Server Busy");
            }
        } catch (e) {
            showToast("Server Busy");
        } finally {
            setLoaderFlag(false);
        }
    }

    async function handleCreate() {
        const email = emailRef.current.getData();
        const password = passwordRef.current.getData();

        setLoaderFlag(true);
        try {
            const response = await fetch(`${API_URL}/create-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.status === 200) {
                showToast("Account created successfully!");
                setTimeout(() => {
                    showToast("Navigating to Login");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }, 3000);
            } else {
                showToast("Server Busy");
            }
        } catch (e) {
            showToast("Server Busy");
        } finally {
            setLoaderFlag(false);
        }
    }

    return (
        <div className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex justify-center items-center absolute flex-col">
            <TextTitle />
            <SocialFooter />
            <div className="flex flex-col justify-evenly items-center w-[40vw] min-h-[20vw] bg-primary p-[1.5%]  border-solid
            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
                <TextHeader props={{ header: "Create User" }} />
                <TosterMessage
                    content={toast.message}
                    isVisible={toast.isVisible}
                    onHide={hideToast}
                />
                <InputBox props={{ placeholder: "Email Address", type: "email" ,autoComplete: "email"}} ref={emailRef} />
                <InputBox props={{ placeholder: "Password", type: "text",autoComplete: "password" }} ref={passwordRef} />
                {verificationFlag ? (
                    <Button props={{ content: "Create User", onClick: handleCreate }} />
                ) : (
                    <>
                        {generateOTPFlag ? (
                            <Button props={{ content: "Generate OTP", onClick: handleGenerateOTP }} />
                        ) : (
                            <>
                                <InputBox props={{ placeholder: "Enter OTP", type: "number" ,autoComplete: "on"}} ref={OTPRef} />
                                <Button props={{ content: "Verify OTP", onClick: handleVerifyOTP }} />
                            </>
                        )}
                    </>
                )}
                {loaderFlag && <Loader />}
                <Link
                    className="font-light text-text_primary hover:text-gray-500 transition-all duration-300"
                    to="/"
                >
                    Already a User!
                </Link>
            </div>
        </div>
    );
}

export default CreateUser;