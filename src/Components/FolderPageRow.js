import InputBox from "./InputBox";
import Checkbox from "./CheckBox";
import ReviseStar from "./ReviseStar";
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import DropDownBox from "./DropDownBox";
import FolderInputBox from "./FolderInputBox";

const FolderPageRow  = forwardRef((props,ref) => {
    const defaultValue = props.props;
    const [date , setDate] = useState(defaultValue.date!== null ? new Date(defaultValue.date).toISOString().split('T')[0] : null);
    const Refs = {
        QuestionName : useRef(""),
        QuestionNumber : useRef(0),
        Type : useRef(""),
        solved : useRef(false),
        revise : useRef(false),
    }

    function handleDateChange(event){
        setDate(event.target.value);
        console.log(event.target.value);
    }


    useImperativeHandle(ref, () => ({
        getData(){
            const data = {
                date,
                QuestionNumber : Refs.QuestionNumber.current.getData(),
                QuestionName : Refs.QuestionName.current.getData(),
                Type : Refs.Type.current.getData(),
                Status : Refs.solved.current.getData(),
                Revise : Refs.revise.current.getData(),
            }
            return (data)
        }
    }))

    return (
            <div className="w-full p-3  flex justify-evenly items-center">
                <div className="w-[20vw]">
                    <input type={"date"}
                           value={date || ""}
                           className="border border-border_primary bg-transparent text-center text-text_secondary m-3 p-2 hover:border-dotted transition-all duration-300 rounded"
                           onChange={handleDateChange}/>
                </div>
                <div className="w-[24vw]">
                    <FolderInputBox props={{placeholder: "Enter No.", type: "Number" , value : defaultValue.QuestionNumber}} ref={Refs.QuestionNumber}/>
                </div>
                <div className="w-[24vw]">
                    <FolderInputBox props={{placeholder: "Enter Name", type: "text" , value : defaultValue.QuestionName}} ref={Refs.QuestionName}/>
                </div>
                <div className="w-[16vw]">
                    <DropDownBox props={{type : "hard" , value : defaultValue.Type}} ref={Refs.Type}/>
                </div>
                <div className="w-[10vw] flex justify-center items-center">
                    <Checkbox props={{status: false , value : defaultValue.Status}} ref={Refs.solved}/>
                </div>
                <div className="w-[10vw] flex justify-center items-center">
                    <ReviseStar props={{status: false , value : defaultValue.Revise}} ref={Refs.revise}/>
                </div>
            </div>
    )
});

export default FolderPageRow;