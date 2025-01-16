function FolderAddButton(props) {
    return (
        <div className="w-[12vw] h-[13vh] bg-transparent   p-2 flex justify-center flex-col cursor-none shadow-[rgba(50,_50,_105,_0.4)_0px_8px_20px_0px,_rgba(0,_0,_0,_0.2)_0px_4px_4px_0px] false rounded-md border border-zinc-800">
            <div className="h-[100%] text-center flex justify-center items-center cursor-none">
                <button className="text-xl font-bold text-text_primary cursor-none" onClick={props.props.onClick}>Add Folder <br /> <span className="text-highlight_green ">+</span> </button>
            </div>

        </div>
    )
}

export default FolderAddButton;