import { useState } from "react"

function AnyArtist({artist}) {
    
    const [ content, setContent] = useState(
        () => {
            return (
                <figure className="any-artist-img">
                        <img src={artist["profilePic"]} alt="Whoops, an error ocurred!" className=""/>
                </figure> ) 
    } )

    const buttons = () => {
        if (artist["tracks"]) {
            return (
                <div className="card-actions justify-end">
                    <button className="btn btn-md " onClick={() => onClick()}>Show</button>
                    <button className="btn btn-circle" onClick={() => onHide()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div> 
            )
        } }

    const onClick = () => {
        setContent(
            artist["tracks"]?.map(
            track => {
                    return (
                        <iframe style={{borderRadius:"12px", display:'inline'}} 
                                    src={track['embed']} width="100%"
                                    height="80" frameBorder="0" allowfullscreen="" 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    title={track["id"]} className="" key={track['id']}>
                        </iframe>
                            ) } ) )
    }

    const onHide = () => {
        setContent( () => {
            return (
                <figure className="any-artist-img">
                        <img src={artist["profilePic"]} alt="Whoops, an error ocurred!" className=""/>
                </figure> ) 
    } )
    }
    
    return (
    <div className="container card distance">
        <div className="card-body">
            <div className="any-artist-text" style={{background:"whitesmoke", color:"black"}}>
                    <h2 href={artist["url"]}> 
                        {artist["artistName"]}
                    </h2>
                </div>
            {content}
            {buttons()}
        </div>
    </div>
    )
}

export default AnyArtist 