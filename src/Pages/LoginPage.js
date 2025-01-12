import TextHeader from "../Components/TextHeader";
import InputBox from "../Components/InputBox";
import Button from "../Components/Button";
import {use, useEffect, useRef, useState} from "react";
import EmailChecker from "../Scripts/EmailChecker";
import TosterMessage from "../Components/TosterMessage";
import {Link} from "react-router-dom";
import Loader from "../Components/Loader";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [tosterMessage , setToasterMessage] = useState(null);
    const [toasterVisiblity, setToasterVisiblity] = useState(false);
    const[loaderFlag, setLoaderFlag] = useState(false);
    const navigator = useNavigate();

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

    function onLoginClick() {
        const email = emailRef.current.getData();
        const password = passwordRef.current.getData();
        if(EmailChecker(email)) {
            setToasterVisiblity(true);
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
                            toasterHelper("User Doesn't Exsist")
                        }else if(res.status === 200){
                            toasterHelper("Logining...!")
                            navigator(`/${email}/folderdashboard`)
                        }else if(res.status === 404){
                            toasterHelper("password incorrect");
                        }else{
                            toasterHelper("Something went wrong!");
                        }
                    }
                )
            }catch(err){
                setLoaderFlag(false);
                toasterHelper("Server Busy");
            }

        }else{
            toasterHelper("Invalid Email")
        }
    }

    return (
        <div  className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex justify-center items-center absolute flex-col" >
            <p className="text-text_primary font-black text-center text-2xl fixed top-10">Sum Manager</p>
            <div className="flex flex-col justify-evenly items-center w-[40vw] h-[20vw] bg-primary p-[1.5%] border-border_primary border-solid border rounded ">
                <TextHeader props={{header : "Login Page"}}/>
                {
                    toasterVisiblity ? <TosterMessage content={tosterMessage}/> : null
                }

                <InputBox props={{placeholder : "Email Address" , type:"email"}} ref={emailRef}/>
                <InputBox props={{placeholder : "Password" , type:"text"}} ref={passwordRef}/>
                {
                    loaderFlag ? <Loader/> : null
                }
                <Button props={{content : "Login" , onClick : onLoginClick}} />
                <Link className="font-light text-text_primary hover:text-highlight_error transition-all duration-300" to="/create">New User ?</Link>

            </div>
        </div>
    )
}
export default LoginPage;