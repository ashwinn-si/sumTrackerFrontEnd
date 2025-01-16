import TextHeader from "./TextHeader";
import Button from "./Button";
import React, {useEffect, useState} from "react";
import TextSubHeader from "./TextSubHeader";
import TosterMessage from "./TosterMessage";
import {useNavigate} from "react-router-dom";


function NotepadContainer(props) {
    const [note ,setNote] = useState(props.props.note);

    const handleChange = (event) =>{
        setNote(event.target.value);
    }

    function handleClose(){
        props.props.close(props.props.index,note);
    }

    return (
        <div
            className="absolute h-full w-full bg-netural bg-opacity-95 flex justify-center items-center z-[9998] overflow-auto">
            <div
                className="flex flex-col justify-evenly items-center w-[60vw] h-[70vh] bg-netural p-[1.5%]  border-solid shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
                <TextHeader props={{header: props.props.header}}/>

                <textarea
                    className="w-full h-[40%] p-4 bg-primary text-gray-200 font-mono text-sm border border-gray-700 rounded-md resize-none overflow-y-auto focus:outline-none focus:border-gray-200 transition duration-300 ease-in-out"
                    placeholder="Notes...."
                    value={note}
                    onChange={handleChange}
                />
                <div className="w-full flex justify-center items-center ">
                    <Button props={{content: "Save", onClick: handleClose}}/>
                </div>
            </div>
        </div>


    )
}

export default NotepadContainer;