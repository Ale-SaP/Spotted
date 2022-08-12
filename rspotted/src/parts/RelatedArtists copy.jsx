function RelatedArtist({relatedArtistList}) {
    return (
        relatedArtistList.map( artist => { return (
            <>
            <div className="any-artist card">
                    <h2 className="artist-name card-title" href={artist["url"]}> 
                        {artist["artistName"]} 
                    </h2>

                    <div className="card-body distance">
                        <img src={artist["profilePic"]} alt="Whoops, an error ocurred!" className=""/>
                        
                        <ol>
                        {artist["tracks"].map(tr => { return (
                            <iframe style={{borderRadius:"12px"}} 
                                src={tr["embed"]} width="100%"
                                height="80" frameBorder="0" allowfullscreen="" 
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                title={tr["id"]} className="">
                            </iframe>
                            )}
                        )}
                        </ol>
                    </div>
            </div>
            </> )} 
        )
    )
}

export default RelatedArtist 