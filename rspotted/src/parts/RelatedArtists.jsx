function RelatedArtist({artist, keyProp}) {
    
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
                <div className="any-artist card w-96 bg-base-100 shadow-xl" key={keyProp}>
                    <div className="card-body">
                        <div className="card-title artist-name">
                            <h2> 
                                {artist["artistName"]} 
                            </h2>
                        </div>
                        <figure>
                            <button onClick={() => {console.log("flipped!")}}>
                                <img src={artist["profilePic"]} alt="Whoops, an error ocurred!" />
                            </button>
                        </figure>
                    </div>        
                </div>
) }


export default RelatedArtist 