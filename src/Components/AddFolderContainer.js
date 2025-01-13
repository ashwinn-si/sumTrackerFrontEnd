import TextHeader from "./TextHeader";
import InputBox from "./InputBox";
import Button from "./Button";
import {forwardRef, useImperativeHandle, useRef} from "react";

const AddFolderContainer = forwardRef((props,ref) => {
    const folderNameRef = useRef(null);

    function handleClick(){
        props.props.folderGetter();
    }
    useImperativeHandle(ref, () => ({
        getData(){
            return(folderNameRef.current.getData());
        }
    }))

    return (
        <div className="absolute h-[100vh] w-[100vw] bg-netural opacity-90 flex justify-center items-center">
            <div className="flex flex-col justify-evenly items-center w-[40vw] h-[20vw] bg-primary p-[1.5%] border-border_primary border-solid border rounded ">
                <TextHeader props={{header:"Create Folder"}}/>
                <InputBox props={{placeholder : "Folder Name"}} ref={folderNameRef}/>
                <Button props={{content:"Create" , onClick:handleClick}}/>
            </div>
        </div>
    )
})

export default AddFolderContainer;