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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import NotepadContainer from "../Components/NotepadContainer";

function FolderPage(props) {
    const [AllRefs, setAllRefs] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const[imageDBID, setImageDBID] = useState([]);
    const  email = atob(useParams().email);
    const folderName = atob(useParams().folderName);
    const navigate = useNavigate();
    const [loaderFlag, setLoaderFlag] = useState(false);
    const [snippetFlag ,setSnippetFlag] = useState(false);
    const [snippetHeader, setSnippetHeader] = useState("");
    const [loaderMessage,setLoaderMessage] = useState("");
    const [snippetData ,setSnippetData] = useState(null);
    const [snippetOpenIndex , setSnippetOpenIndex] = useState(0);
    const [noteIndex , setNoteIndex] = useState(0);
    const [noteData , setNoteData] = useState(null);
    const [noteFlag , setNoteFlag] = useState(false);
    const [noteHeader ,setNoteHeader] = useState("");
    const API_URL = process.env.REACT_APP_backend_url;

    function dataRetrieval() {
        setLoaderMessage("Getting data...");
        setLoaderFlag(true);  // Start loading indicator
        setAllRefs([]);
        setImageDBID([])
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
            setImageDBID(
                data.map((items)=>{
                    return items.Snippet.image
                })
            )

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
            Snippet : {code : "", image : ""},
            Note : ""
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
            item.Note = filterQuestionData[index].Note;
        })

        const filterDBID = filterQuestionData.map(items =>{
            return items.Snippet.image
        })

        setLoaderMessage("Saving data...");
        setLoaderFlag(true);  // Start loading indicator
        //deleting the unnesscary images in db
        for(const id of imageDBID){
            if(!filterDBID.includes(id)){
                fetch(`${API_URL}/store-image/delete/${id}`, {
                    method: "DELETE",
                }).then(res =>{
                    return res.json();
                })
            }
        }

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
        const encodedEmail = btoa(email)
        navigate(`/${encodedEmail}/folderdashboard`);
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

    function handleNotepad(targetIndex){
        const questionData = AllRefs[targetIndex].current.getData();
        const questionName = questionData.QuestionName;
        const note = allQuestions[targetIndex].Note || "";
        setNoteIndex(targetIndex)
        setNoteData(note)
        setNoteHeader(questionName)
        setNoteFlag(true);
    }

    function handleNotepadClose(targetIndex,note){
        setNoteFlag(false);
        allQuestions[targetIndex].Note = note;
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


    function snippetClose(code,targetIndex,img,uploadFlag,prevDBID){
        if(uploadFlag){
            //if uploadflag is true and there already exsist a img in db and a new img is uploaded then we need to delete the previous image and create a new image | else create a new image
            if(prevDBID){
                //deleting the previously exsisting image in db and storing a new image
                fetch(`${API_URL}/store-image/delete/${prevDBID}`, {
                    method: "DELETE",
                }).then(res =>{
                    return res.json();
                })
            }
            if(img){
                const formData = new FormData();
                formData.append("image",img);
                fetch(`${API_URL}/store-image`, {
                    method: "POST",
                    body: formData
                }).then(res =>{
                    return res.json();
                }).then(data =>{
                    allQuestions[targetIndex].Snippet.image = data.message
                    setImageDBID(prevDBID =>{
                        return [...prevDBID,data.message];
                    });
                })
            }

        }
        allQuestions[targetIndex].Snippet.code = code;
        setSnippetFlag(false);
    }

    useEffect(() => {
        if (email && folderName) {
            dataRetrieval();
        }
    }, [email, folderName]);

    function formateDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }
    //function to generate excel
    async function generateExcel() {
        // Await helper functions
        await saveQuestionHelper();
        await dataRetrieval();

        // Prepare data for the worksheet
        const excelData = [];
        for (const item of allQuestions) {
            excelData.push([
                formateDate(item.CreateDate),
                formateDate(item.Date),
                item.QuestionNumber,
                item.QuestionName,
                item.Type,
                item.Status ? "Solved" : "Not Solved",
                item.Revise ? "Revise" : ""
            ]);
        }

        // Create workbook and add data with column headings
        const workbook = XLSX.utils.book_new();
        const colHeadings = [["Created Date", "Date", "Problem Number", "Problem Name", "Type", "Status", "Revise"]];
        const workSheetData = XLSX.utils.aoa_to_sheet([...colHeadings, ...excelData]);

        // Ensure the worksheet reference is defined
        if (!workSheetData["!ref"]) {
            workSheetData["!ref"] = XLSX.utils.encode_range({
                s: { r: 0, c: 0 },
                e: { r: excelData.length, c: colHeadings[0].length - 1 }
            });
        }

        // Set column widths for better readability
        workSheetData["!cols"] = [
            { wch: 20 }, // Created Date
            { wch: 20 }, // Date
            { wch: 20 }, // Problem Number
            { wch: 25 }, // Problem Name
            { wch: 15 }, // Type
            { wch: 15 }, // Status
            { wch: 15 }  // Revise
        ];

        // Freeze the first row
        workSheetData["!freeze"] = { xSplit: 0, ySplit: 1 };

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, workSheetData, "Questions");

        // Generate and save the Excel file
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const dataBlob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });

        saveAs(dataBlob, `${folderName}.xlsx`);
    }

    return (
        <div className="font-Montserrat bg-netural w-[100vw] min-h-[100vh] flex absolute flex-col">
            <Header email={email} backContext="Back" onClickHelper={backHelper} />
            <TextHeader props={{ header: folderName }} />
            <FolderHeader />
            {
                snippetFlag ? < SnippetContainer props={{header : snippetHeader , close:snippetClose , snippetData , index : snippetOpenIndex, folderName : btoa(folderName),email : btoa(email)}}/> : null
            }
            {
                noteFlag && <NotepadContainer props={{header : noteHeader , close : handleNotepadClose , index : noteIndex , note : noteData}}/>
            }
            <div className="overflow-y-auto w-[95vw] p-3 mx-[2.5vw] my-[1vw] flex justify-evenly items-center text-center flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
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
                                        Note : item.Note || "",
                                        index,
                                        handleDelete: handleDeleteQuestionHelper,
                                        handleSnipper : handleOpenSnippetHelper,
                                        handleNotepad : handleNotepad
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
                    <Button props={{ content: "Generate Excel", onClick: generateExcel }} />
                </div>

            </div>
        </div>
    );
}

export default FolderPage;
