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
                className = "w-[75%] m-[2.5%] p-[2%] bg-transparent  text-left  text-text_secondary  hover:border-dotted transition-all duration-300 shadow-[rgba(50,_50,_105,_0.4)_0px_8px_20px_0px,_rgba(0,_0,_0,_0.2)_0px_4px_4px_0px] false rounded-md border border-zinc-800"
            />
        </div>
    );
})

export default FolderInputBox;
