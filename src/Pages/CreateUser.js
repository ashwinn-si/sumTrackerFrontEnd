import TextHeader from "../Components/TextHeader";
import {useRef, useState} from "react";
import InputBox from "../Components/InputBox";
import Button from "../Components/Button";
import EmailChecker from "../Scripts/EmailChecker";
import TosterMessage from "../Components/TosterMessage";
import {useNavigate} from "react-router-dom";
import Loader from "../Components/Loader";

function CreateUser(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const OTPRef = useRef();
    const [tosterMessage , setToasterMessage] = useState(null);
    const [toasterVisiblity, setToasterVisiblity] = useState(false);
    const[loaderFlag, setLoaderFlag] = useState(false);
    const[verificationFlag, setVerificationFlag] = useState(false);
    const [generateOTPFlag, setGenerateOTPFlag] = useState(true);
    const navigate = useNavigate();

    function toasterHelper(message){
        setToasterMessage(message);
        setToasterVisiblity(true);
        hidToaster()
    }

    function hidToaster(){
        setTimeout(() => {
            setToasterVisiblity(false);
        }, 4000);
    }

    function handleGenerateOTP(){
        const email = emailRef.current.getData();
        const password = passwordRef.current.getData();
        if(EmailChecker(email)) {
            setToasterVisiblity(true);
            try{
                fetch("http://localhost:5000/create-user/otp-generation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    })
                }).then(res => {
                    setLoaderFlag(false);
                    if(res.status === 200){
                        setGenerateOTPFlag(false);
                    }else if(res.status === 404){
                        toasterHelper("User already exist");
                        setTimeout(()=>{
                            toasterHelper("Navigating to home");
                            setTimeout(()=>{
                                navigate("/login");
                            },2000)
                        },4000)
                    }else{
                        toasterHelper("Server Busy");
                    }
                })
            }catch (e){
                setLoaderFlag(false);
                toasterHelper("Server Busy");
            }
        }else{
            toasterHelper("Invalid Email");
        }
        setGenerateOTPFlag(false);
    }

    function handleVerifyOTP(){
        const email = emailRef.current.getData();
        const otp = OTPRef.current.getData();
        try{
            setLoaderFlag(true);
            fetch("http://localhost:5000/create-user/otp-verification", {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body:JSON.stringify({
                    email,
                    otp
                })
            }).then(res => {
                setLoaderFlag(false);
                if(res.status === 200){
                    setVerificationFlag(true);
                    toasterHelper("OTP successfully verified");
                }else if(res.status === 404){
                    toasterHelper("OTP unsccessfull")
                }else{
                    toasterHelper("Server Busy");
                }
            })
        }catch(e){
            setLoaderFlag(false);
            toasterHelper("Server Busy");
        }
    }
    function handleCreate(){
        setToasterMessage("Navigating to Login");
        const email = emailRef.current.getData();
        const password = passwordRef.current.getData();
        try{
            setLoaderFlag(true);
            fetch("http://localhost:5000/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }).then(res => {
                setLoaderFlag(false);
                if(res.status === 200){
                    toasterHelper("Navigating to Login");
                    setTimeout(()=>{
                        navigate("/");
                    },2000)
                }else{
                    toasterHelper("Server Busy");
                }
            })
        }catch(e){
            setLoaderFlag(false);
            toasterHelper("Server Busy");
        }

    }
    return (
        <div
            className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex justify-center items-center absolute flex-col">
            <p className="text-text_primary font-black text-center text-2xl fixed top-10">Sum Manager</p>
            <div
                className="flex flex-col justify-evenly items-center w-[40vw] min-w-[20vw] bg-primary p-[1.5%] border-border_primary border-solid border rounded ">
                <TextHeader props={{header: "Create User"}}/>
                {
                    toasterVisiblity ? <TosterMessage content={tosterMessage}/> : null
                }
                <InputBox props={{placeholder : "Email Address" , type:"email"}} ref={emailRef}/>
                <InputBox props={{placeholder : "Password" , type:"text"}} ref={passwordRef}/>
                {
                    loaderFlag ? <Loader/> : null
                }
                {
                    verificationFlag ?
                        <>
                            <Button props={{content : "Create User", onClick : handleCreate}}/>

                        </>
                        :
                        <>
                        {
                            generateOTPFlag ?
                                <>
                                    <Button props={{content : "Generate OTP", onClick : handleGenerateOTP}}/>
                                </>
                                :
                                <>
                                    <InputBox props={{placeholder : "Enter OTP" , type:"number"}} ref={OTPRef}/>
                                    <Button props={{content : "Verify OTP", onClick : handleVerifyOTP}} />
                                </>
                        }
                        </>
                }
            </div>
        </div>
    )
}
export default CreateUser;