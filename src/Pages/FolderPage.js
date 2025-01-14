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
    // const API_URL = "https://sumtrackerbackend.onrender.com";
    const API_URL = "http://localhost:5000";

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

    function formateDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }
    //function to generate excel
    async function generateExcel() {
        await saveQuestionHelper();
        await dataRetrieval();
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

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const colHeadings = [["Created Date", "Date", "Problem Number", "Problem Name", "Type", "Status", "Revise"]];

        // Create worksheet with the data
        const workSheetData = XLSX.utils.aoa_to_sheet([...colHeadings, ...excelData]);

        // Define styles
        const headerStyle = {
            font: {
                bold: true,
                color: { rgb: "FFFFFF" }
            },
            alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true  // Enable text wrapping
            }
        };

        const dataStyle = {
            alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true
            },
            border: {  // Added borders for better visibility
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" }
            }
        };

        // Apply styles
        const range = XLSX.utils.decode_range(workSheetData['!ref']);
        for (let R = range.s.r; R <= range.e.r; R++) {
            for (let C = range.s.c; C <= range.e.c; C++) {
                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                if (R === 0) {  // Header row
                    workSheetData[cellAddress].s = headerStyle;
                } else {  // Data rows
                    workSheetData[cellAddress].s = dataStyle;
                }
            }
        }

        // Set column widths
        workSheetData['!cols'] = [
            { wch: 20 }, // Created Date
            { wch: 20 }, // Date
            { wch: 20 }, // Problem Number
            { wch: 25 }, // Problem Name
            { wch: 15 }, // Type
            { wch: 15 }, // Status
            { wch: 15 }  // Revise
        ];

        // Freeze first row
        workSheetData['!freeze'] = { xSplit: 0, ySplit: 1 };

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, workSheetData, folderName);

        // Generate and save file
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
            cellStyles: true  // Enable cell styles
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
                    <Button props={{ content: "Generate Excel", onClick: generateExcel }} />
                </div>

            </div>
        </div>
    );
}

export default FolderPage;
