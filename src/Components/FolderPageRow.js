import InputBox from "./InputBox";
import Checkbox from "./CheckBox";
import ReviseStar from "./ReviseStar";
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import DropDownBox from "./DropDownBox";
import FolderInputBox from "./FolderInputBox";
import bin from "../Assests/Images/bin.png"
import snippet from "../Assests/Images/snippet.png"
import notepad from "../Assests/Images/notepad.png"
import notepadContains from "../Assests/Images/notepad-added.png"
import snippetContains from "../Assests/Images/snippetContains.png"
import java from "./../Assests/Images/Languages/java.png"
import python from "../Assests/Images/Languages/py.png"
import js from "./../Assests/Images/Languages/js.png"
import text from "./../Assests/Images/Languages/text.png"
import c_plus_plus from "./../Assests/Images/Languages/c++.png"

const FolderPageRow  = forwardRef((props,ref) => {
    const defaultValue = props.props;
    const [date , setDate] = useState(defaultValue.date!== null ? new Date(defaultValue.date).toISOString().split('T')[0] : new Date());
    const [language , setLanguage] = useState("");
    const Refs = {
        QuestionName : useRef(""),
        QuestionNumber : useRef(0),
        Type : useRef(""),
        solved : useRef(false),
        revise : useRef(false),
    }

    function handleDateChange(event){
        setDate(event.target.value);
    }


    useImperativeHandle(ref, () => ({
        getData(){
            const data = {
                Date : date,
                QuestionNumber : Refs.QuestionNumber.current.getData() || "",
                QuestionName : Refs.QuestionName.current.getData() || "",
                Type : Refs.Type.current.getData() || "easy",
                Status : Refs.solved.current.getData() || false,
                Revise : Refs.revise.current.getData() || false,
            }
            return (data)
        }
    }))

    function handleDeleteQuestionHelper(event){
            defaultValue.handleDelete(defaultValue.index);
    }

    function handleOpenNotepad(){
        defaultValue.handleNotepad(defaultValue.index);

    }

    function handleSnippet(){
        defaultValue.handleSnipper(defaultValue.index);
    }

    useEffect(() => {
       switch(defaultValue.language) {
           case "text":
               setLanguage(text);
               break;
           case "java":
               setLanguage(java);
               break;
           case "python":
               setLanguage(python);
               break;
           case "js":
               setLanguage(js);
               break;
           case "c++":
               setLanguage(c_plus_plus);
               break;
       }
    },[defaultValue])

    return (
        <div className="w-full p-3  flex justify-evenly items-center">
            <div className="w-[5vw]">
                <button
                    className=" text-l font-semibold text-highlight_green hover:translate-y-[-5px] transition-all duration-[3000]"
                    onClick={handleDeleteQuestionHelper}><img src={bin}/></button>
            </div>
            <div className="w-[10vw]">
                <input type={"date"}
                       value={date || ""}
                       className="w-[95%] p-[2%]   bg-transparent text-center text-text_secondary  transition-all duration-300 shadow-[rgba(50,_50,_105,_0.4)_0px_8px_20px_0px,_rgba(0,_0,_0,_0.2)_0px_4px_4px_0px] false rounded-md border border-zinc-800"
                       onChange={handleDateChange}/>
            </div>
            <div className="w-[19vw]">
                <FolderInputBox props={{placeholder: "Problem No.", type: "Number", value: defaultValue.QuestionNumber}}
                                ref={Refs.QuestionNumber}/>
            </div>
            <div className="w-[5vw] flex justify-center items-center">
                <img src={language} className="w-[50%]"/>
            </div>
            <div className="w-[24vw]">
                <FolderInputBox props={{placeholder: "Problem Name", type: "text", value: defaultValue.QuestionName}}
                                ref={Refs.QuestionName}/>
            </div>
            <div className="w-[5vw]">
                {
                    props.props.notepadContainsFlag ?  <button
                        className=" font-semibold text-highlight_green hover:translate-y-[-5px] transition-all duration-[3000] pt-3"
                        onClick={handleOpenNotepad}><img src={notepadContains}/></button> : <button
                        className=" font-semibold text-highlight_green hover:translate-y-[-5px] transition-all duration-[3000] pt-3"
                        onClick={handleOpenNotepad}><img src={notepad}/></button>
                }

            </div>
            <div className="w-[11vw]">
                <DropDownBox props={{type: "hard", value: defaultValue.Type}} ref={Refs.Type}/>
            </div>
            <div className="w-[10vw] flex justify-center items-center">
                <Checkbox props={{status: false, value: defaultValue.Status}} ref={Refs.solved}/>
            </div>
            <div className="w-[10vw] flex justify-center items-center">
                <ReviseStar props={{status: false, value: defaultValue.Revise}} ref={Refs.revise}/>
            </div>
            <div className="w-[5vw]">
                {
                    props.props.snippetContainsFlag ? <button
                        className=" font-semibold text-highlight_green hover:translate-y-[-5px] transition-all duration-[3000] pt-3"
                        onClick={handleSnippet}><img src={snippetContains}/></button>
                        :
                        <button
                            className=" font-semibold text-highlight_green hover:translate-y-[-5px] transition-all duration-[3000] pt-3"
                            onClick={handleSnippet}><img src={snippet}/></button>
                }
            </div>
        </div>
    )
});

export default FolderPageRow;