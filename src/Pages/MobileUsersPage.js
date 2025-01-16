import TextTitle from "../Components/TextTitle";
import SocialFooter from "../Components/SocialFooter";

function MobileUsersPage() {
    return (
        <div
            className="font-Montserrat bg-netural w-[100vw] h-[100vh] flex justify-center items-center absolute flex-col">
            <TextTitle/>
            <SocialFooter/>
            <div
                className="flex flex-col justify-evenly items-center w-[90vw]  min-h-[20vw] bg-primary p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] false rounded-md border border-zinc-800 ">
                <p className="font-semibold text-l text-text_secondary">This website is designed exclusively for big screens to provide the best experience. <br/><br/>Please view it on  large screen device for best results.</p>
            </div>
        </div>
    )
}

export default MobileUsersPage;