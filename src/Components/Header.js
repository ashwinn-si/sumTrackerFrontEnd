import {useEffect, useState} from "react";

function Header({ email, backContext = "Back", onClickHelper }) {
    const [date , setDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString(); // Default locale format
        const customFormat = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; // DD/MM/YYYY format
        setDate(customFormat)
    },[])


    return(
        <div className="w-[95vw] p-3 mx-[2.5vw] my-[1vw] flex justify-between items-center  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
            <div>
                    <button
                        className="text-l text-text_primary font-semibold flex items-center space-x-2 hover:translate-x-2 transition-transform"
                        onClick={onClickHelper}>
                        {/* Left Arrow Icon (SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M15 10a1 1 0 01-1 1H5.414l6.293 6.293a1 1 0 01-1.414 1.414l-8-8a1 1 0 010-1.414l8-8a1 1 0 011.414 1.414L5.414 9H14a1 1 0 011 1z"
                                  clipRule="evenodd"/>
                        </svg>

                        <span>{backContext}</span>
                    </button>

            </div>
            <div>
                <p className="text-l text-text_primary font-semibold">email : <span
                    className="font-[500] text-text_secondary">{email}</span></p>
            </div>
            <div>
                <p className="text-l text-text_primary font-semibold">date : <span
                    className="font-[500] text-text_secondary">{date}</span></p>
            </div>
        </div>
    )
}

export default Header;