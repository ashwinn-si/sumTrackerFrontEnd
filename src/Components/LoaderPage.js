import TextHeader from "./TextHeader";
import Loader2 from "./Loader2";

function LoaderPage({loadermessage}) {
    return (
        <div className="absolute h-[100%] w-[100vw] bg-netural opacity-90 flex justify-center items-center z-[9999]">
            <div
                className="flex flex-col justify-evenly items-center  w-[40vw] h-[20vw] bg-primary p-[1.5%] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800">
                <TextHeader props={{header : loadermessage}}/>
                <Loader2 />
            </div>
        </div>
    )
}
export default LoaderPage;