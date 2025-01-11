
function TosterMessage({ content}) {
    return (
        <div className="fixed top-5 right-5 p-4 bg-transparent border border-border_primary  rounded-md shadow-lg text-text_primary font-semibold transform animate-slideIn">
            {content}
        </div>
    );
}

export default TosterMessage;
