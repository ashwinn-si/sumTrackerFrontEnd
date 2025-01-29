import React, {useEffect, useState} from "react";

function FolderHeader(props) {
    return(
        <div
            className="w-[95vw] p-3 mx-[2.5vw] my-[1vw] flex justify-evenly items-center  text-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
            <div className="w-[5vw]">
            </div>
            <div className="w-[10vw]">
                <p className="text-l text-text_primary font-semibold">Date</p>
            </div>
            <div className="w-[19vw]">
                <p className="text-l text-text_primary font-semibold ">Question <br/> No</p>
            </div>
            <div className="w-[5vw]">

            </div>
            <div className="w-[24vw]">
                <p className="text-l text-text_primary font-semibold ">Question <br/> Name</p>
            </div>
            <div className="w-[5vw]">
                <p className="text-l text-text_primary font-semibold">Note</p>
            </div>
            <div className="w-[11vw]">
                <p className="text-l text-text_primary font-semibold ">Type</p>
            </div>
            <div className="w-[10vw]">
                <p className="text-l text-text_primary font-semibold">Solved</p>
            </div>
            <div className="w-[10vw]">
                <p className="text-l text-text_primary font-semibold">Revise</p>
            </div>
            <div className="w-[5vw]">
                <p className="text-l text-text_primary font-semibold">Snippet</p>
            </div>
        </div>
    )
}

export default FolderHeader;