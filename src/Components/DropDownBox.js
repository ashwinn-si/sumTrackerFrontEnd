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
        <select className="bg-black border border-border_primary p-2 rounded-md text-left text-text_secondary " value={value} onChange={changeHandler}
        >
            <option value="easy" className="text-text_primary">Easy</option>
            <option value="medium" className="text-text_primary">Medium</option>
            <option value="hard" className="text-text_primary">Hard</option>
        </select>
    )
});
export default DropDownBox;