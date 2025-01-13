import React, {useEffect, useRef, useState} from "react";
import { useParams } from "react-router";
import FolderButton from "../Components/FolderButton";
import Header from "../Components/Header";
import TextHeader from "../Components/TextHeader";
import FolderAddButton from "../Components/FolderAddButton";
import AddFolderContainer from "../Components/AddFolderContainer";
import TosterMessage from "../Components/TosterMessage";
import {useNavigate} from "react-router-dom";

function FolderDashBoard() {
    const { email } = useParams();
    const [availableFolders, setAvailableFolders] = useState([]);
    const [folderCreatContainerFlag , setFolderCreatContainerFlag] = useState(false);
    const folderNameRef = useRef(null);
    const [tosterMessage , setToasterMessage] = useState(null);
    const [toasterVisiblity, setToasterVisiblity] = useState(false);
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

    function allFolderGetter(){
        fetch(`http://localhost:5000/${email}/folder-dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch folders");
                }
                return response.json();
            })
            .then((data) => {
                setAvailableFolders(data.allFolders || []);
            })
            .catch((err) => {
                console.error("Error fetching folders:", err);
            });
    }

    // Fetch folders when the component mounts
    useEffect(() => {
        if (email) {
            allFolderGetter();
        }
        }, [email]);

    //function to get the folder name from the child component
    async function getFolderName(){
        const folder_name = folderNameRef.current.getData();
        fetch(`http://localhost:5000/${email}/folder/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email,
                folder_name: folder_name,
            })
        }).then(
            res => {
                if(res.status === 409){
                    toasterHelper("Folder Already Exists");
                }else if(res.status === 401){
                    toasterHelper("Server Busy");
                }else{
                    allFolderGetter()
                    toasterHelper("Folder Created !!")
                }

            }
        )
        setFolderCreatContainerFlag(false);
    }

    function handleAddFolder(){
        setFolderCreatContainerFlag(true);
    }

    function handleDeleteFolder(folderName){
        const folder_name = folderName;
        fetch(`http://localhost:5000/${email}/folder/delete`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
            },
            body:JSON.stringify({
                folder_name,
            })
        }).then(res => {
            if(res.ok){
                toasterHelper("Folder Deleted !!")
                allFolderGetter();
            }else{
                toasterHelper("Server Busy !!")
            }
        })
    }

    function handleOpenFolder(folderName){
        navigate(`/${email}/${folderName}`);
    }
    function backHelper(){
        navigate("/");
    }
    return (
        <div
            className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex   absolute flex-col">
            <Header email={useParams().email}
                    backContext="Logout"
                    onClickHelper={backHelper}/>
            <TextHeader props={{header: "Available Folders"}}/>
            {
                folderCreatContainerFlag ? <AddFolderContainer props={{folderGetter : getFolderName}} ref={folderNameRef}/> : null
            }
            {
                toasterVisiblity ? <TosterMessage content={tosterMessage}/> : null
            }
            <div
                className="w-[95vw] p-3 mx-[2.5vw]  my-[1vw] flex justify-evenly border border-border_primary rounded flex-row flex-wrap">
                {
                    availableFolders.map((folder,index) => (
                        <div className="w-[22vw] flex justify-center items-center h-auto mb-5" key={index}>
                            <FolderButton props={{folderName: folder.FolderName , onDelete : handleDeleteFolder , onOpen : handleOpenFolder}}/>
                        </div>
                    ))
                }

                <div className="w-[22vw] flex justify-center items-center h-auto mb-2">
                    <FolderAddButton props={{folderName: "add Folder" , onClick : handleAddFolder}}/>
                </div>
            </div>
        </div>
    )
}

export default FolderDashBoard;