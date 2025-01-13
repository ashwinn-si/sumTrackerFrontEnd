import {useParams} from "react-router";
import React, {createRef, useEffect, useState} from "react";
import FolderHeader from "../Components/FolderHeader";
import Header from "../Components/Header";
import TextHeader from "../Components/TextHeader";
import FolderPageRow from "../Components/FolderPageRow";
import Button from "../Components/Button";
import {useNavigate} from "react-router-dom";
import LoaderPage from "../Components/LoaderPage";

function FolderPage(props) {
    const [AllRefs, setAllRefs] = useState([]);
    const [allQuetions,setAllQuestions] = useState([]);
    const { email , folderName} = useParams();
    const navigate = useNavigate();
    const [loaderFlag, setLoaderFlag] = useState(false);
    const API_URL = "https://sumtrackerbackend.onrender.com";

    function dataReterival(){
        setAllRefs([]);
        fetch(`${API_URL}/${email}/${folderName}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            for(let i=0; i < data.length; i++){
                setAllRefs((prevState) => {
                    const newRef = React.createRef();
                    return [...prevState, newRef];
                });
            }
            setAllQuestions(data);
        })
        setLoaderFlag(false);
    }

    function addQuestionHelper(){
        setAllRefs((prevState) => {
            const newRef = React.createRef();
            return [...prevState, newRef];
        });
        setAllQuestions(prevState =>{
            return[...prevState,{}];
        });
    }

    function backHelper(){
        navigate(`/${email}/folderdashboard`)
    }

    async function saveQuestionHelper() {
        const allData = []
        for (let i = 0; i < AllRefs.length ; i++) {
            if(AllRefs.current !== null) {
                allData.push(AllRefs[i].current.getData());
            }
        }
        setLoaderFlag(true);
        fetch(`${API_URL}/${email}/${folderName}/update`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                allQuestions: allData
            })
        }).then(res => {
            if (res.ok) {
                dataReterival();
            }
        })
        setLoaderFlag(false);
    }

    useEffect(() => {
        if (email) {
            setLoaderFlag(true);
            dataReterival();
        }

    }, [email]);

    return (
        <div
            className="font-Montserrat bg-netural w-[100vw]  min-h-[100vh] flex   absolute flex-col ">
            <Header email={useParams().email}
                    backContext="Back"
                    onClickHelper={backHelper}/>
            <TextHeader props={{header: useParams().folderName }}/>
            <FolderHeader/>
            <div
                className="overflow-y-auto w-[95vw] p-3 mx-[2.5vw] my-[1vw] flex justify-evenly items-center border border-border_primary rounded text-center flex-col">
                {
                    allQuetions.map((item, index) => (
                        <FolderPageRow
                            key={index} // Add a unique key for each component
                            props={{
                                date: item.Date || null,
                                QuestionNumber: item.QuestionNumber || "",
                                QuestionName: item.QuestionName || "",
                                Type: item.Type || "easy",
                                Status: item.Status || false,
                                Revise: item.Revise || false,
                            }}
                            ref={AllRefs[index]}
                        />
                    ))
                }
                {
                    loaderFlag && <LoaderPage />
                }

                <div className="w-full flex justify-center items-center ">
                    <Button props={{content : "Add Question",onClick : addQuestionHelper}}/>
                    <Button props={{content : "Save",onClick : saveQuestionHelper}}/>
                </div>
            </div>
        </div>
    )
}

export default FolderPage;