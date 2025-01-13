import React, {useEffect, useState} from "react";

function FolderHeader(props) {
    return(
        <div
            className="w-[95vw] p-3 mx-[2.5vw] my-[1vw] flex justify-evenly items-center border border-border_primary rounded text-center">
            <div className="w-[20vw]">
                <p className="text-l text-text_primary font-semibold">Date</p>
            </div>
            <div className="w-[24vw]">
                <p className="text-l text-text_primary font-semibold ">Question <br/> No</p>
            </div>
            <div className="w-[24vw]">
                <p className="text-l text-text_primary font-semibold ">Question <br/> Name</p>
            </div>
            <div className="w-[16vw]">
                <p className="text-l text-text_primary font-semibold ">Type</p>
            </div>
            <div className="w-[10vw]">
                <p className="text-l text-text_primary font-semibold">Solved</p>
            </div>
            <div className="w-[10vw]">
                <p className="text-l text-text_primary font-semibold">Revise</p>
            </div>
        </div>
    )
}

export default FolderHeader;