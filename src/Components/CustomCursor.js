// src/components/CustomCursor.js
import React, { useEffect, useState } from "react";
import "../Assests/Style/CustomCursor.css"; // Import the CSS for styling

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleHover = (e) => {
            const target = e.target;
            if (target.tagName === "BUTTON" || target.tagName === "link" || target.tagName === "InputBox" || target.tagName === "input") {
                setHovered(true);
            } else {
                setHovered(false);
            }
        };

        document.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleHover);

        return () => {
            document.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleHover);
        };
    }, []);

    return (
        <div
            className={`custom-cursor ${hovered ? "hovered" : ""}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        />
    );
};

export default CustomCursor;
