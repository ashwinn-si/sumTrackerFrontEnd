import TextHeader from "./TextHeader";
import Button from "./Button";
import React, {useEffect, useState} from "react";
import TextSubHeader from "./TextSubHeader";
import TosterMessage from "./TosterMessage";
import {useNavigate} from "react-router-dom";
import imageCompression from 'browser-image-compression';
import {Buffer} from "buffer";

function SnippetContainer(props) {
    const [userCode , setUserCode] = useState(props.props.snippetData.code);
    const [image , setImage] = useState(props.props.snippetData.image);
    const [imageDisplay, setImageDisplay] = useState(false);
    const [prevDbID, setPrevDbID] = useState(null);
    const [uploadFlag , setUploadFlag] = useState(false);
    const navigate = useNavigate();
    const [imageToDisplay, setImageToDisplay] = useState(null);
    // const API_URL = "https://sumtrackerbackend.onrender.com";
    const API_URL = "http://localhost:5000";

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

    function handleCodeChange(e) {
        setUserCode(e.target.value);
    }
    function handleClose(){
        showToast("Saving Data")
        props.props.close(userCode,props.props.index,image,uploadFlag,prevDbID)
    }
    function handleCopy(){
        navigator.clipboard.writeText(userCode)
        showToast("Code Copied!!")
    }

    //functions for image handling

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    async function handleFileUpload(e) {
        setUploadFlag(true);
        showToast("Image Uploaded");
        const file = e.target.files[0];
        setImageToDisplay(await convertImageToBase64(file));
        setImage(file);
        setImageDisplay(true)
    }

    async function handleView() {
        localStorage.clear();
        // const imageURL = await convertImageToBase64(image);
        localStorage.setItem("imageURL", JSON.stringify(imageToDisplay));
        window.open(`/${props.props.email}/${props.props.folderName}/image-display`, '_blank');
    }

    useEffect(() => {
        if(image.length > 0){
            setPrevDbID(image);
            fetch(`${API_URL}/store-image/${image}`,{
                method: "POST"
            }).then(res =>{
                return res.json();
            }).then(data =>{

                const imageType = 'image/png'; // Replace with the appropriate type, e.g., 'image/jpeg'
                setImage(data.image) //data.image is in form of base 64
                setImageToDisplay(`data:${imageType};base64,${data.image}`); //setting as data.image as base64
            })
            setImageDisplay(true);
        }
    },[])

    return (
        <div
            className="absolute h-full w-full bg-netural bg-opacity-95 flex justify-center items-center z-[9998] overflow-auto">
            <TosterMessage
                content={toast.message}
                isVisible={toast.isVisible}
                onHide={hideToast}
            />
            <div
                className="flex flex-col justify-evenly items-center w-[60vw] h-[70vh] bg-netural p-[1.5%]  border-solid shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
                <TextHeader props={{header: props.props.header}}/>
                <TextSubHeader props={{header: "Image"}}/>
                <div className="flex flex-row">
                    <div className="relative">
                        <input
                            type="file"
                            accept=".jpg, .png"
                            onChange={handleFileUpload}
                            id="fileUpload"
                            className="hidden"
                        />

                        <label
                            htmlFor="fileUpload"
                            className="inline-block mb-1 py-1 px-2 border rounded-lg  border-gray-700 text-white font-semibold hover:border-gray-400 focus:outline-none focus:ring-2  hover:text-gray-100 transition duration-300 ease-in-out"
                        >
                            Upload File
                        </label>
                    </div>
                    {
                        imageDisplay ?
                            <button className= "cursor-none ml-2 inline-block mb-1 py-1 px-2 border rounded-lg border-gray-700 text-white font-semibold hover:border-gray-400 focus:outline-none focus:ring-2  hover:text-gray-100 transition duration-300 ease-in-out" onClick={handleView}> View</button>
                            : null
                    }

                </div>

                {
                    imageDisplay && (
                        <img src={imageToDisplay} alt="uploaded image" className="w-[30%] mb-2"/>
                    )
                }

                <TextSubHeader props={{header: "Code"}}/>
                <textarea
                    className="w-full h-[40%] p-4 bg-primary text-gray-200 font-mono text-sm border border-gray-700 rounded-md resize-none overflow-y-auto focus:outline-none focus:border-gray-200 transition duration-300 ease-in-out"
                    placeholder="Write your code here..."
                    value={userCode}
                    onChange={handleCodeChange}
                />
                <div className="w-full flex justify-center items-center ">
                    <Button props={{content: "Save", onClick: handleClose}}/>
                    <Button props={{content: "Copy", onClick: handleCopy}}/>
                </div>
            </div>
        </div>


    )
}

export default SnippetContainer;