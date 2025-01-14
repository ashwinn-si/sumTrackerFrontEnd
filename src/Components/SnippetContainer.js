import TextHeader from "./TextHeader";
import Button from "./Button";
import React, {useState} from "react";
import TextSubHeader from "./TextSubHeader";
import TosterMessage from "./TosterMessage";

function SnippetContainer(props) {
    const [userCode , setUserCode] = useState(props.props.snippetData.code);

    const [toast, setToast] = useState({
        message: '',
        isVisible: false
    });

    const showToast = (message) => {
        setToast({ message, isVisible: true });
        setTimeout(hideToast, 2000); // Automatically hides after 2 seconds
    };

    const hideToast = () => {
        setToast(prev => ({
            ...prev,
            isVisible: false
        }));
    };

    function handleCodeChange(e) {
        setUserCode(e.target.value);
    }
    function handleClose(){
        props.props.close(userCode,props.props.index)
    }
    function handleCopy(){
        navigator.clipboard.writeText(userCode)
        showToast("Code Copied!!")
    }
    return (
        <div className="absolute h-full w-full bg-netural bg-opacity-95 flex justify-center items-center z-[9998]">
            <TosterMessage
                content={toast.message}
                isVisible={toast.isVisible}
                onHide={hideToast}
            />
            <div
                className="  flex flex-col justify-evenly items-center w-[60vw] h-[70vh] bg-primary p-[1.5%] border-border_primary border-solid border rounded ">
                <TextHeader props={{header: props.props.header}}/>
                <TextSubHeader props={{header:"Image"}}/>
                <TextSubHeader props={{header:"Code"}}/>
                <textarea
                    className="w-full h-[70%] p-4 bg-gray-900 text-gray-200 font-mono text-sm border border-gray-700 rounded-md resize-y overflow-auto focus:outline-none focus:border-blue-500"
                    placeholder="Write your code here..."
                    value={userCode}
                    onChange={handleCodeChange}
                />
                <div className="w-full flex justify-center items-center ">
                    <Button props={{content: "Save", onClick: handleClose}}/>
                    <Button props={{content:"Copy",onClick: handleCopy}}/>
                </div>
            </div>
        </div>
    )
}

export default SnippetContainer;