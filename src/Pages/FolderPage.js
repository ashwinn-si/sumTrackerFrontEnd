import { useParams } from "react-router";
import React, { useEffect, useState, createRef } from "react";
import FolderHeader from "../Components/FolderHeader";
import Header from "../Components/Header";
import TextHeader from "../Components/TextHeader";
import FolderPageRow from "../Components/FolderPageRow";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import LoaderPage from "../Components/LoaderPage";

function FolderPage(props) {
    const [AllRefs, setAllRefs] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const { email, folderName } = useParams();
    const navigate = useNavigate();
    const [loaderFlag, setLoaderFlag] = useState(false);
    const API_URL = "https://sumtrackerbackend.onrender.com";

    function dataRetrieval() {
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
        setAllQuestions(prevState => [...prevState, {}]);
    }

    function backHelper() {
        navigate(`/${email}/folderdashboard`);
    }

    async function saveQuestionHelper() {
        const allData = AllRefs.map(ref => ref.current ? ref.current.getData() : null); // Map data from refs
        setLoaderFlag(true);  // Start loading indicator

        fetch(`${API_URL}/${email}/${folderName}/update`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ allQuestions: allData })
        }).then(res => {
            if (res.ok) {
                dataRetrieval();  // Fetch updated data after saving
            }
            setLoaderFlag(false);  // Hide loading indicator after save operation
        }).catch(() => {
            setLoaderFlag(false); // Hide loading indicator if error occurs
        });
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
            <div className="overflow-y-auto w-[95vw] p-3 mx-[2.5vw] my-[1vw] flex justify-evenly items-center border border-border_primary rounded text-center flex-col">
                {
                    allQuestions.map((item, index) => (
                        <FolderPageRow
                            key={index}
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
                {loaderFlag && <LoaderPage />}
                <div className="w-full flex justify-center items-center ">
                    <Button props={{ content: "Add Question", onClick: addQuestionHelper }} />
                    <Button props={{ content: "Save", onClick: saveQuestionHelper }} />
                </div>
            </div>
        </div>
    );
}

export default FolderPage;
