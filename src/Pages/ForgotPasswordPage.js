import TextTitle from "../Components/TextTitle";
import SocialFooter from "../Components/SocialFooter";
import TextHeader from "../Components/TextHeader";
import InputBox from "../Components/InputBox";
import React, {useRef, useState} from "react";
import Button from "../Components/Button";
import TosterMessage from "../Components/TosterMessage";
import EmailChecker from "../Scripts/EmailChecker";
import Loader from "../Components/Loader";
import {Link, useNavigate} from "react-router-dom";

function ForgotPasswordPage() {
    const emailRef = useRef(null);
    const [emailVerificationFlag, setEmailVerificationFlag] = useState(true);
    const [loaderFlag, setLoaderFlag] = useState(false);
    const [OTPFlag, setOTPFlag] = useState(false);
    const otpRef = useRef(null);
    const [passwordFlag,setPasswordFlag] = useState(false);
    const passRef = useRef(null);
    const navigate = useNavigate();
    const [count , setCount] = useState(0);
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
    function generateOTP(email) {
            fetch(`${API_URL}/${email}/forgot-password/generateOTP`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                showToast("OTP Generated !")
                setOTPFlag(true)
            })
            setCount(2);


    }

    function verifyEmail() {
        const email = emailRef.current.getData();
        if (!EmailChecker(email)) {
            showToast("Email invalid");
            return null;
        }
        try {
            setLoaderFlag(true);
            fetch(`${API_URL}/${email}/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    setLoaderFlag(false); // Move this here
                    if (res.status === 200) {
                        showToast("Email verified");
                        generateOTP(email,count);
                        setEmailVerificationFlag(false);
                    } else if (res.status === 404) {
                        showToast("Email doesn't exist");
                    } else {
                        showToast("Server Busy");
                    }
                })
                .catch((err) => {
                    setLoaderFlag(false); // Handle errors
                    showToast("Server Busy");
                });
        } catch (err) {
            setLoaderFlag(false);
            showToast("Server Busy");
        }
    }


    async function handleVerifyOTP() {
        const email = emailRef.current.getData();
        const otp = otpRef.current.getData();
        setLoaderFlag(true);
        try {
            const response = await fetch(`${API_URL}/${email}/forgot-password/generateOTP`, {
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
                setPasswordFlag(true);
                setOTPFlag(false);
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

    async function handleChangePassword() {
        const email = emailRef.current.getData();
        const password = passRef.current.getData();

        try {
            const response = await fetch(`${API_URL}/${email}/forgot-password/reset`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.status === 200) {
                showToast("Password Changed successfully!");
                showToast("navigating to Login");
                setTimeout(()=>{
                    navigate("/");
                },2000)
            }
            else {
                showToast("Server Busy");
            }
        } catch (e) {
            showToast("Server Busy");
        } finally {
            setLoaderFlag(false);
        }
    }

    return (
        <div
            className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex justify-center items-center absolute flex-col">
            <TextTitle/>
            <SocialFooter/>
            <div
                className="flex flex-col justify-evenly items-center w-[40vw]  min-h-[20vw] bg-primary p-[1.5%]  border-solid  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
                <TextHeader props={{header: "Forgot Password"}}/>
                <TosterMessage
                    content={toast.message}
                    isVisible={toast.isVisible}
                    onHide={hideToast}
                />
                <InputBox
                    props={{placeholder: "Email Address", type: "email", required: true, autoComplete: "email"}}
                    ref={emailRef}
                />
                {
                    emailVerificationFlag && <Button props={{ content: "Verify Email", onClick: verifyEmail }} />
                }
                {
                    OTPFlag ?
                        <>
                            <InputBox
                                props={{placeholder: "OTP", type: "number", required: true, autoComplete: "email"}}
                                ref={otpRef}
                            />
                            <Button props={{ content: "Verify OTP", onClick: handleVerifyOTP }} />
                        </>
                        : null
                }
                {
                    passwordFlag ?
                        <>
                            <InputBox
                                props={{placeholder: "New Password", type: "text", required: true, autoComplete: "email"}}
                                ref={passRef}
                            />
                            <Button props={{ content: "Change", onClick: handleChangePassword }} />
                        </> : null
                }
                {loaderFlag ? <Loader/> : null}
                <Link
                    className="font-light text-text_primary hover:text-gray-500 transition-all duration-300"
                    to="/"
                >
                    Already a User!
                </Link>
            </div>
        </div>
    )

}

export default ForgotPasswordPage;