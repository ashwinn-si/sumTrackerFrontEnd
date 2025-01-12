function FolderAddButton(props) {
    return (
        <div className="w-[12vw] h-[13vh] bg-transparent  border border-border_primary rounded-lg p-2 flex justify-center flex-col">
            <div className="h-[100%] text-center flex justify-center items-center">
                <button className="text-xl font-bold text-text_primary" onClick={props.props.onClick}>Add Folder <br /> <span className="text-highlight_green">+</span> </button>
            </div>

        </div>
    )
}

export default FolderAddButton;