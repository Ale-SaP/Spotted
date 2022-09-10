function AnyArtist({artist}) {

    const tracks = () => {artist["tracks"].map(
        track => { return (
            <iframe style={{borderRadius:"12px", display:'inline'}} 
                        src={track['embed']} width="100%"
                        height="80" frameBorder="0" allowfullscreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        title={track["id"]} className="" key={track['id']}>
            </iframe>
                        ) } ) }

    return (
    <div className="container card distance">
        <div className="card-body">
            <div className="any-artist-text card-title" style={{background:"whitesmoke", color:"black"}}>
                    <h2 href={artist["url"]}> 
                        {artist["artistName"]}
                    </h2>
                </div>
        <figure className="any-artist-img">
            <img src={artist["profilePic"]} alt="Whoops, an error ocurred!" className=""/>
        </figure>
        </div>
    </div>
    )
}

export default AnyArtist 