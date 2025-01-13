import img from "../Assests/Images/linkdin.png";

function SocialFooter(props) {
    return (
        <p className="text-text_primary font-[500] text-center text-xl fixed bottom-8 left-0 right-0 flex items-center justify-center gap-2 ">
            Follow on :
            <a className="inline-flex items-center gap-2 font-light" href={"https://www.linkedin.com/in/ashwinsi/"} target={"_blank"}>
                Ashwin S I
                <img src={img} className="w-[1.5rem] h-auto" alt="social icon"/>
            </a>
        </p>
    )
}

export default SocialFooter;