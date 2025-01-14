import {useEffect} from "react";

function TosterMessage({ content, isVisible, onHide }) {

    if (!isVisible) return null;

    return (
        <div
            className="fixed top-5 right-5 p-4 bg-primary border border-border_primary rounded-md shadow-lg text-text_primary font-semibold transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
            {content}
        </div>
    );
}

export default TosterMessage;
