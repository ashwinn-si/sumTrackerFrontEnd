import img from "../Assests/Images/bin.png";
import img2 from "../Assests/Images/folderopen.png";
function FolderButton(props) {
    function deletehandler(){
        props.props.onDelete(props.props.folderName);
    }
    function openHandler(){
        props.props.onOpen(props.props.folderName);
    }
    return (
        <div className="w-[12vw] h-[13vh] bg-transparent   p-2 flex justify-center flex-col shadow-[rgba(50,_50,_105,_0.4)_0px_8px_20px_0px,_rgba(0,_0,_0,_0.2)_0px_4px_4px_0px] false rounded-md border border-zinc-800">
            <div className="h-[70%] text-center flex justify-center items-center">
                <p className="text-xl font-bold text-text_primary">{props.props.folderName}</p>
            </div>
            <div className="h-[30%] text-center flex justify-evenly items-center">
                <button className="text-l font-semibold text-highlight_green hover:translate-y-[-5px] transition-all duration-[3000]" onClick={openHandler}><img src={img2}/></button>
                <button className="text-l font-semibold text-highlight_red hover:translate-y-[-5px] transition-all duration-[3000]" onClick={deletehandler}><img src={img}/></button>
            </div>
        </div>
    )
}

export default FolderButton;