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
    const [toasterState, setToasterState] = useState({
        message: "Welcome!!",
        isVisible: false
    });
    const[loaderFlag, setLoaderFlag] = useState(false);
    const navigator = useNavigate();

    const showToaster = (message) => {
        setToasterState({
            message,
            isVisible: true
        });
    };

    const hideToaster = () => {
        setToasterState(prev => ({
            ...prev,
            isVisible: false
        }));
    };



    function onLoginClick(e) {
        e.preventDefault();
        const email = emailRef.current.getData();
        const password = passwordRef.current.getData();
        if(EmailChecker(email)) {

            try{
                fetch("http://localhost:5000/login", {
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
                        if (res.status === 406) {
                            showToaster("User Doesn't Exsist")
                        }else if(res.status === 200){
                            showToaster("Login  Successful!")
                            navigator(`/${email}/folderdashboard`)
                        }else if(res.status === 404){
                            showToaster("Password Incorrect");
                        }else{
                            showToaster("Something went wrong!");
                        }
                    }
                )
            }catch(err){
                setLoaderFlag(false);
                showToaster("Server Busy");
            }

        }else{
            showToaster("Invalid Email");
        }
    }

    return (
        <div
            className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex justify-center items-center absolute flex-col">
            <TextTitle/>
            <SocialFooter />
            <div
                className="flex flex-col justify-evenly items-center w-[40vw]  min-h-[20vw] bg-primary p-[1.5%] border-border_primary border-solid border rounded ">
                <TextHeader props={{header: "Login Page"}}/>

                <TosterMessage
                    content={toasterState.message}
                    isVisible={toasterState.isVisible}
                    onHide={hideToaster}
                />
                <form onSubmit={onLoginClick}>
                    <InputBox
                        props={{placeholder: "Email Address", type: "email", required: true, autoComplete: "email"}}
                        ref={emailRef}/>
                    <InputBox props={{placeholder: "Password", type: "text", required: true, autoComplete: "password"}}
                              ref={passwordRef}/>
                    {
                        loaderFlag ? <Loader/> : null
                    }
                    <div className="v-[100vw] flex justify-center items-center">
                        <button
                            className="m-2 py-2 px-4 border rounded border-border_primary text-text_primary hover:border-dotted hover:border-highlight_error transition-all duration-300"
                            type="submit"
                        >
                            Login In
                        </button>
                    </div>
                </form>
                <Link className="font-light text-text_primary hover:text-highlight_error transition-all duration-300"
                      to="/create">New User ?</Link>

            </div>
        </div>
    )
}

export default LoginPage;