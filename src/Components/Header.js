import {useEffect, useState} from "react";

function Header({props}) {
    const [date , setDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString(); // Default locale format
        const customFormat = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; // DD/MM/YYYY format
        setDate(customFormat)
    },[])

    return(
        <div className="w-[95vw] p-3 mx-[2.5vw] my-[1vw] flex justify-between items-center border border-border_primary rounded">
            <div>
                <p className="text-l text-text_primary font-semibold">email : <span className="font-[500] text-text_secondary">{props.email}</span></p>
            </div>
            <div>
                <p className="text-l text-text_primary font-semibold">date : <span
                    className="font-[500] text-text_secondary">{date}</span></p>
            </div>
        </div>
    )
}

export default Header;