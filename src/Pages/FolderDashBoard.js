import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import FolderButton from "../Components/FolderButton";
import Header from "../Components/Header";
import TextHeader from "../Components/TextHeader";
import FolderAddButton from "../Components/FolderAddButton";
import AddFolderContainer from "../Components/AddFolderContainer";
import TosterMessage from "../Components/TosterMessage";
import { useNavigate } from "react-router-dom";

function FolderDashBoard() {
    const { email } = useParams();
    const [availableFolders, setAvailableFolders] = useState([]);
    const [folderCreatContainerFlag, setFolderCreatContainerFlag] = useState(false);
    const folderNameRef = useRef(null);
    const [toasterMessage, setToasterMessage] = useState(null);
    const [toasterVisibility, setToasterVisibility] = useState(false);
    const navigate = useNavigate();
    const API_URL = "https://sumtrackerbackend.onrender.com";

    function toasterHelper(message) {
        setToasterMessage(message);
        setToasterVisibility(true);
    }

    useEffect(() => {
        let timer;
        if (toasterVisibility) {
            timer = setTimeout(() => {
                setToasterVisibility(false);
            }, 4000); 
        }
        return () => clearTimeout(timer); 
    }, [toasterVisibility]);

    function allFolderGetter() {
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
    }

    
    useEffect(() => {
        if (email) {
            allFolderGetter();
        }
    }, [email]);

    async function getFolderName() {
        const folder_name = folderNameRef.current.getData();
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
                toasterHelper("Folder Already Exists");
            } else if (res.status === 401) {
                toasterHelper("Server Busy");
            } else {
                allFolderGetter();
                toasterHelper("Folder Created !!");
            }
        })
        setFolderCreatContainerFlag(false);
    }

    function handleAddFolder() {
        setFolderCreatContainerFlag(true);
    }

    function handleDeleteFolder(folderName) {
        const folder_name = folderName;
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
                toasterHelper("Folder Deleted !!");
                allFolderGetter();
            } else {
                toasterHelper("Server Busy !!");
            }
        })
    }

    function handleOpenFolder(folderName) {
        navigate(`/${email}/${folderName}`);
    }

    function backHelper() {
        navigate("/");
    }

    return (
        <div className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex absolute flex-col">
            <Header email={useParams().email}
                backContext="Logout"
                onClickHelper={backHelper} />
            <TextHeader props={{ header: "Available Folders" }} />
            {
                folderCreatContainerFlag ? <AddFolderContainer props={{ folderGetter: getFolderName }} ref={folderNameRef} /> : null
            }
            {
                toasterVisibility ? <TosterMessage content={toasterMessage} /> : null
            }
            <div className="w-[95vw] p-3 mx-[2.5vw]  my-[1vw] flex justify-evenly border border-border_primary rounded flex-row flex-wrap">
                {
                    availableFolders.map((folder, index) => (
                        <div className="w-[22vw] flex justify-center items-center h-auto mb-5" key={index}>
                            <FolderButton props={{ folderName: folder.FolderName, onDelete: handleDeleteFolder, onOpen: handleOpenFolder }} />
                        </div>
                    ))
                }

                <div className="w-[22vw] flex justify-center items-center h-auto mb-2">
                    <FolderAddButton props={{ folderName: "add Folder", onClick: handleAddFolder }} />
                </div>
            </div>
        </div>
    )
}

export default FolderDashBoard;
