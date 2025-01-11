function Header({props}) {
    return (
        <div className="text-text_primary font-bold text-center text-2xl">
            {props.header}
        </div>
    )
}
export default Header;