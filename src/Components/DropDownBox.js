import React, {forwardRef, useImperativeHandle} from "react";

const DropDownBox = forwardRef((props,ref) =>{
    const [value, setValue] = React.useState(props.props.value);

    useImperativeHandle(ref, () => ({
        getData(){
            return value;
        }
    }))

    const changeHandler = (e) => {
        setValue(e.target.value);
    }
    return (
        <select className="bg-primary  p-[2%]  text-left text-text_secondary shadow-[rgba(50,_50,_105,_0.4)_0px_8px_20px_0px,_rgba(0,_0,_0,_0.2)_0px_4px_4px_0px] false rounded-md border border-zinc-800" value={value} onChange={changeHandler}
        >
            <option value="easy" className="text-text_primary">Easy</option>
            <option value="medium" className="text-text_primary">Medium</option>
            <option value="hard" className="text-text_primary">Hard</option>
        </select>
    )
});
export default DropDownBox;