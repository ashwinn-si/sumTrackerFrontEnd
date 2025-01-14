import {forwardRef, useImperativeHandle, useState} from "react";

const  FolderInputBox = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.props.value);

    useImperativeHandle(ref, () => ({
        getData(){
            if(props.props.type === "Number"){
                return parseInt(value);
            }
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
                value={value}
                className = "w-[75%] m-[2.5%] p-[2%] bg-transparent rounded-md text-left border-border_primary border text-text_secondary  hover:border-dotted transition-all duration-300 text-center"
            />
        </div>
    );
})

export default FolderInputBox;
