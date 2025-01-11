function Button(props) {
    return (
        <div className="v-[100vw] flex justify-center items-center">
            <button className="m-2 py-2 px-4 border rounded border-border_primary text-text_primary hover:border-dotted hover:border-highlight_error transition-all duration-300" onClick={props.props.onClick}>
                {props.props.content}
            </button>
        </div>
    )
}
export default Button;