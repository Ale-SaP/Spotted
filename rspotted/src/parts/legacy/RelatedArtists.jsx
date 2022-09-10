function RelatedArtist({artist}) {
    
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
                <div className="card">
                    <div className="card-body any-artist">
                            <h2 className="card-title artist-name"> 
                                {artist["artistName"]} 
                            </h2>
                            <figure>
                                <img src={artist["profilePic"]} alt="Whoops, an error ocurred!" />
                            </figure>
                    </div>    
                </div>
) }


export default RelatedArtist 