import {forwardRef, useImperativeHandle, useState} from "react";

const  InputBox = forwardRef((props, ref) => {
    const [value, setValue] = useState(null);

    useImperativeHandle(ref, () => ({
        getData(){
            return(value) ;
        }
    }))

    function onChangeHandler(e) {
        setValue(e.target.value);
    }

    return (
        <div>
            <input
                placeholder={props.props.placeholder}
                onChange={onChangeHandler}
                type = {props.props.type}
                autoComplete={props.props.autocomplete || "on"}
                required={props.required || false}
                className = "m-3 p-2 bg-transparent text-left shadow-[rgba(50,_50,_105,_0.25)_0px_4px_10px_0px,_rgba(0,_0,_0,_0.1)_0px_2px_2px_0px] false rounded-md border border-zinc-600 text-text_secondary  hover:border-dotted transition-all duration-300 "
            />
        </div>
    );
})

export default InputBox;
