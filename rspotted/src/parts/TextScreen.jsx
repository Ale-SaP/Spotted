export default function TextScreen( {title, text} ) {
    return(
        <div className="hero">
            <div className="hero-content text-center">
                <h3>{title}</h3>
                <h4>{text}</h4>
            </div>
        </div>
    )
}