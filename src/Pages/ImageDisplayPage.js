import {useParams} from "react-router";
import TextTitle from "../Components/TextTitle";
import SocialFooter from "../Components/SocialFooter";
import {useEffect, useState} from "react";

function ImageDisplayPage(props) {
    const [image , setImage] = useState(null);
    useEffect(() => {
       setImage(JSON.parse(localStorage.getItem("imageURL")));
    },[])
    return (
        <div
            className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex justify-center items-center absolute flex-col">
            <div
                className="flex flex-col justify-evenly items-center w-[80vw] min-h-[20vw] bg-primary p-[1.5%]  border-solid
            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
                <img src={image} alt="uploaded image"/>
            </div>
        </div>
    )
}
export default ImageDisplayPage