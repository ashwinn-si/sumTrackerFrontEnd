import TextHeader from "./TextHeader";
import InputBox from "./InputBox";
import Button from "./Button";

function deleteFolderContainer(props) {
    function handleDeleteFolder() {
        props.props.handleDelete(props.props.folderName);
    }
    function handleDeleteBack(){
        props.props.handleClose();
    }
    return (
        <div className="absolute h-[100vh] w-[100vw] bg-netural bg-opacity-95 flex justify-center items-center">
            <div
                className="flex flex-col justify-evenly items-center w-[40vw] h-[20vw] bg-netural p-[1.5%] border-solid  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
                <TextHeader props={{header: "Confirm Delete"}}/>
                <Button props={{content: "DELETE", onClick: handleDeleteFolder}}/>
                <Button props={{content: "BACK", onClick: handleDeleteBack}}/>
            </div>
        </div>
    )
}

export default deleteFolderContainer;