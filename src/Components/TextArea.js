import React, { useState } from "react";

function CodeEditorWithLineNumbers() {
    const [code, setCode] = useState("");

    // Function to handle the code input
    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    // Function to generate line numbers
    const getLineNumbers = () => {
        const totalLines = code.split("\n").length;
        let lines = [];
        for (let i = 1; i <= totalLines; i++) {
            lines.push(i);
        }
        return lines;
    };

    return (
        <div className="flex">
            {/* Line Numbers */}
            <div className="flex flex-col items-center pr-2">
                {getLineNumbers().map((line, index) => (
                    <span
                        key={index}
                        className="text-gray-500 text-xs font-mono"
                    >
            {line}
          </span>
                ))}
            </div>

            {/* Textarea for Code */}
            <textarea
                value={code}
                onChange={handleCodeChange}
                className="w-full h-72 p-4 bg-gray-900 text-gray-200 font-mono text-sm border border-gray-700 rounded-md resize-y overflow-auto focus:outline-none focus:border-blue-500"
                placeholder="Write your code here..."
            />
        </div>
    );
}

export default CodeEditorWithLineNumbers;
