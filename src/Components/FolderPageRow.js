import InputBox from "./InputBox";
import Checkbox from "./CheckBox";
import ReviseStar from "./ReviseStar";
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import DropDownBox from "./DropDownBox";
import FolderInputBox from "./FolderInputBox";
import bin from "../Assests/Images/bin.png"
import snippet from "../Assests/Images/snippet.png"

const FolderPageRow  = forwardRef((props,ref) => {
    const defaultValue = props.props;
    const [date , setDate] = useState(defaultValue.date!== null ? new Date(defaultValue.date).toISOString().split('T')[0] : new Date());
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

    function handleSnippet(){
        defaultValue.handleSnipper(defaultValue.index);
    }

    return (
        <div className="w-full p-3  flex justify-evenly items-center">
            <div className="w-[5vw]">
                <button className=" text-l font-semibold text-highlight_green hover:translate-y-[-5px] transition-all duration-[3000]" onClick={handleDeleteQuestionHelper}> <img  src={bin} /></button>
            </div>
            <div className="w-[10vw]">
                <input type={"date"}
                       value={date || ""}
                       className="w-[95%] p-[2%]  border border-border_primary bg-transparent text-center text-text_secondary  hover:border-dotted transition-all duration-300 rounded"
                       onChange={handleDateChange}/>
            </div>
            <div className="w-[24vw]">
                <FolderInputBox props={{placeholder: "Problem No.", type: "Number", value: defaultValue.QuestionNumber}}
                                ref={Refs.QuestionNumber}/>
            </div>
            <div className="w-[24vw]">
                <FolderInputBox props={{placeholder: "Problem Name", type: "text", value: defaultValue.QuestionName}}
                                ref={Refs.QuestionName}/>
            </div>
            <div className="w-[16vw]">
                <DropDownBox props={{type: "hard", value: defaultValue.Type}} ref={Refs.Type}/>
            </div>
            <div className="w-[10vw] flex justify-center items-center">
                <Checkbox props={{status: false, value: defaultValue.Status}} ref={Refs.solved}/>
            </div>
            <div className="w-[10vw] flex justify-center items-center">
                <ReviseStar props={{status: false, value: defaultValue.Revise}} ref={Refs.revise}/>
            </div>
            <div className="w-[5vw]">
                <button
                    className=" font-semibold text-highlight_green hover:translate-y-[-5px] transition-all duration-[3000] pt-3"
                    onClick={handleSnippet}><img src={snippet}/></button>
            </div>
        </div>
    )
});

export default FolderPageRow;