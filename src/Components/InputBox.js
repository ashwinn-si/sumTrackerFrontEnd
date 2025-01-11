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
                className = "m-3 p-2 bg-transparent rounded-md text-left border-border_primary border text-text_secondary  hover:border-dotted transition-all duration-300"
            />
        </div>
    );
})

export default InputBox;
