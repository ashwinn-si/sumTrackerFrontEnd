import TextHeader from "./TextHeader";
import Loader2 from "./Loader2";

function LoaderPage({loadermessage}) {
    return (
        <div className="absolute h-[100vh] w-[100vw] bg-netural opacity-90 flex justify-center items-center">
            <div
                className="flex flex-col justify-evenly items-center  w-[40vw] h-[20vw] bg-primary p-[1.5%] border-border_primary border-solid border rounded ">
                <TextHeader props={{header : {loadermessage}}}/>
                <Loader2 />
            </div>
        </div>
    )
}
export default LoaderPage;