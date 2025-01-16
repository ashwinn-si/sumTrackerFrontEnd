import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import FolderButton from "../Components/FolderButton";
import Header from "../Components/Header";
import TextHeader from "../Components/TextHeader";
import FolderAddButton from "../Components/FolderAddButton";
import AddFolderContainer from "../Components/AddFolderContainer";
import TosterMessage from "../Components/TosterMessage";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import LoaderPage from "../Components/LoaderPage";
import Button from "../Components/Button";

function FolderDashBoard() {
    const email= atob(useParams().email);
    const [availableFolders, setAvailableFolders] = useState([]);
    const [folderCreatContainerFlag, setFolderCreatContainerFlag] = useState(false);
    const folderNameRef = useRef(null);
    const [loaderFlag, setLoaderFlag] = useState(false);
    const [loaderMessage, setLoaderMessage] = useState("Deleting Folder");
    const navigate = useNavigate();
    const API_URL = "https://sumtrackerbackend.onrender.com";

    function allFolderGetter() {
        setLoaderMessage("Getting all folders...");
        setLoaderFlag(true);
        fetch(`${API_URL}/${email}/folder-dashboard`, {
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
        setLoaderFlag(false);
    }


    useEffect( () => {
        setLoaderFlag(true);
        if (email) {
            allFolderGetter();
        }
    }, [email]);

    async function getFolderName() {
        const folder_name = folderNameRef.current.getData();
        setLoaderMessage("Creating folder...");
        setLoaderFlag(true);
        fetch(`${API_URL}/${email}/folder/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                folder_name: folder_name,
            })
        }).then(res => {
            if (res.status === 409) {
                setLoaderFlag(false);
            } else if (res.status === 401) {
                setLoaderFlag(false);
            } else {
                allFolderGetter();
            }
        })
        setFolderCreatContainerFlag(false);
    }

    function handleAddFolder() {
        setFolderCreatContainerFlag(true);
    }

    async function handleDeleteFolder(folderName) {
        const folder_name = folderName;
        let dbID = [];
        setLoaderMessage("Deleting folder...");
        setLoaderFlag(true);
        await fetch(`${API_URL}/${email}/${folderName}/image-details`, {
            method: "POST",

        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data.data)
            dbID = data.data;
        })
        for (const id of dbID) {
            fetch(`${API_URL}/store-image/delete/${id}`, {
                method: "DELETE",
            }).then(res => {
                return res.json();
            })
        }
        fetch(`${API_URL}/${email}/folder/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                folder_name,
            })
        }).then(res => {
            if (res.ok) {
                setLoaderFlag(false);
                allFolderGetter();
            } else {
                setLoaderFlag(false);
            }
        })
    }

    function handleOpenFolder(folderName) {
        const encodedEmail  = btoa(email)
        const encodedFolderName = btoa(folderName)
        navigate(`/${encodedEmail}/${encodedFolderName}`);
    }

    function backHelper() {
        navigate("/");
    }


    return (
        <div className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex absolute flex-col">
            <Header email={email}
                    backContext="Logout"
                    onClickHelper={backHelper}/>
            <TextHeader props={{header: "Available Folders"}}/>
            {
                folderCreatContainerFlag ?
                    <AddFolderContainer props={{folderGetter: getFolderName}} ref={folderNameRef}/> : null
            }
            {
                loaderFlag && <LoaderPage loadermessage={loaderMessage}/>
            }
            <div
                className="w-[95vw] p-3 mx-[2.5vw]  my-[1vw] flex justify-evenly  flex-row flex-wrap
                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
                {
                    availableFolders.map((folder, index) => (
                        <div className="w-[22vw] flex justify-center items-center h-auto mb-5" key={index}>
                            <FolderButton props={{
                                folderName: folder.FolderName,
                                onDelete: handleDeleteFolder,
                                onOpen: handleOpenFolder
                            }}/>
                        </div>
                    ))
                }

                <div className="w-[22vw] flex justify-center items-center h-auto mb-2">
                    <FolderAddButton props={{folderName: "add Folder", onClick: handleAddFolder}}/>

                </div>
            </div>
        </div>
    )
}

export default FolderDashBoard;
