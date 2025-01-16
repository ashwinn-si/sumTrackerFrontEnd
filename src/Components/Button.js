function Button(props) {
    return (
        <div className="v-[100vw] flex justify-center items-center">
            <button className="cursor-none m-2 py-2 px-4 shadow-[rgba(50,_50,_105,_0.25)_0px_4px_10px_0px,_rgba(0,_0,_0,_0.1)_0px_2px_2px_0px] false rounded-md border border-zinc-600 text-text_primary hover:shadow-[rgba(50,_50,_105,_0.4)_0px_8px_20px_0px,_rgba(0,_0,_0,_0.2)_0px_4px_4px_0px]  hover:border-zinc-400  transition-all duration-300" onClick={props.props.onClick}>
                {props.props.content}
            </button>
        </div>
    )
}
export default Button;