function FolderButton(props) {
    function deletehandler(){
        props.props.onClick(props.props.folderName);
    }
    return (
        <div className="w-[12vw] h-[13vh] bg-transparent  border border-border_primary rounded-lg p-2 flex justify-center flex-col">
            <div className="h-[70%] text-center flex justify-center items-center">
                <p className="text-xl font-bold text-text_primary">{props.props.folderName}</p>
            </div>
            <div className="h-[30%] text-center flex justify-evenly items-center">
                <button className="text-l font-semibold text-highlight_green ">Open</button>
                <button className="text-l font-semibold text-highlight_red " onClick={deletehandler}>Delete</button>
            </div>
        </div>
    )
}

export default FolderButton;