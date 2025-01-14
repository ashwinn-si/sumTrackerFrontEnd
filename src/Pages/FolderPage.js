import { useParams } from "react-router";
import React, { useEffect, useState, createRef } from "react";
import FolderHeader from "../Components/FolderHeader";
import Header from "../Components/Header";
import TextHeader from "../Components/TextHeader";
import FolderPageRow from "../Components/FolderPageRow";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import LoaderPage from "../Components/LoaderPage";
import SnippetContainer from "../Components/SnippetContainer";

function FolderPage(props) {
    const [AllRefs, setAllRefs] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const { email, folderName } = useParams();
    const navigate = useNavigate();
    const [loaderFlag, setLoaderFlag] = useState(false);
    const [snippetFlag ,setSnippetFlag] = useState(false);
    const [snippetHeader, setSnippetHeader] = useState("");
    const [loaderMessage,setLoaderMessage] = useState("");
    const [snippetData ,setSnippetData] = useState(null);
    const [snippetOpenIndex , setSnippetOpenIndex] = useState(0);
    const API_URL = "https://sumtrackerbackend.onrender.com";
    // const API_URL = "http://localhost:5000";

    function dataRetrieval() {
        setLoaderMessage("Getting data...");
        setLoaderFlag(true);  // Start loading indicator
        setAllRefs([]);
        fetch(`${API_URL}/${email}/${folderName}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setAllRefs(data.map(() => React.createRef())); // Create refs dynamically based on fetched data
            setAllQuestions(data);

            setLoaderFlag(false);  // Hide loading indicator after data is fetched
        }).catch(() => {
            setLoaderFlag(false); // Hide loading indicator if error occurs
        });
    }

    function addQuestionHelper() {
        setAllRefs((prevState) => {
            const newRef = React.createRef();
            return [...prevState, newRef];
        });
        setAllQuestions(prevState => [...prevState, {
            Snippet : {code : "", img : ""}
        }]);
    }



    async function saveQuestionHelper() {
        const allData = AllRefs.map(ref => {
            if (ref && ref.current && typeof ref.current.getData === 'function') {
                return ref.current.getData();
            }
            return null;
        });

        const filteredData = allData.filter(item => item !== null);
        const filterQuestionData = allQuestions.filter(item => item !== null);

        filteredData.map((item,index) => {
            item.Snippet = filterQuestionData[index].Snippet;
        })
        setLoaderMessage("Saving data...");
        setLoaderFlag(true);  // Start loading indicator
        fetch(`${API_URL}/${email}/${folderName}/update`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ allQuestions: filteredData })
        }).then(res => {
            if (res.ok) {
                dataRetrieval();  // Fetch updated data after saving
            }
            setLoaderFlag(false);  // Hide loading indicator after save operation
        }).catch(() => {
            setLoaderFlag(false); // Hide loading indicator if error occurs
        });
    }

    async function backHelper() {
        await saveQuestionHelper();
        navigate(`/${email}/folderdashboard`);
    }

    function handleDeleteQuestionHelper(targetIndex) {
        setAllRefs((prevState) =>
            prevState.map((item, index) => {
                if (index === targetIndex) {
                    return null;
                }
                return item;
            })
        );
        setAllQuestions((prevState) =>
            prevState.map((item, index) => {
                if (index === targetIndex) {
                    return null;
                }
                return item;
            })
        );

    }

    async function handleOpenSnippetHelper(targetIndex) {
        const questionData = AllRefs[targetIndex].current.getData();
        const questionName = questionData.QuestionName;
        const snippetDataTrial = allQuestions[targetIndex].Snippet || {code : "", img : ""};
        setSnippetOpenIndex(targetIndex)
        setSnippetData(snippetDataTrial);
        setSnippetHeader(questionName);
        setSnippetFlag(true);
    }

    function snippetClose(code,targetIndex){
        setSnippetFlag(false);
        allQuestions[targetIndex].Snippet.code = code;
    }

    useEffect(() => {
        if (email && folderName) {
            dataRetrieval();
        }
    }, [email, folderName]);

    return (
        <div className="font-Montserrat bg-netural w-[100vw] min-h-[100vh] flex absolute flex-col">
            <Header email={email} backContext="Back" onClickHelper={backHelper} />
            <TextHeader props={{ header: folderName }} />
            <FolderHeader />
            {
                snippetFlag ? < SnippetContainer props={{header : snippetHeader , close:snippetClose , snippetData , index : snippetOpenIndex}}/> : null
            }
            <div className="overflow-y-auto w-[95vw] p-3 mx-[2.5vw] my-[1vw] flex justify-evenly items-center border border-border_primary rounded text-center flex-col">
                {
                    allQuestions.map((item, index) => {
                        if (item && AllRefs[index] !== null) {
                            return (
                                <FolderPageRow
                                    key={index}
                                    props={{
                                        date: item.Date || null, // Use today's date as fallback
                                        QuestionNumber: item.QuestionNumber || "",
                                        QuestionName: item.QuestionName || "",
                                        Type: item.Type || "easy",
                                        Status: item.Status || false,
                                        Revise: item.Revise || false,
                                        index,
                                        handleDelete: handleDeleteQuestionHelper,
                                        handleSnipper : handleOpenSnippetHelper
                                    }}
                                    ref={AllRefs[index] || null}
                                />
                            );
                        }
                        return null; // Skip rendering for null/undefined items
                    })
                }
                {loaderFlag && <LoaderPage loadermessage={loaderMessage}/>}
                <div className="w-full flex justify-center items-center ">
                    <Button props={{ content: "Add Question", onClick: addQuestionHelper }} />
                </div>

            </div>
        </div>
    );
}

export default FolderPage;
