function AnyArtist({artist}) {

    return (
    <div className="card-normal w-96 bg-base-100 distance">
            <div style={{background:"whitesmoke"}}>
            <h2 className="card-title any-artist-text justify-start" href={artist["url"]}> 
                {artist["artistName"]} 
            </h2>
            </div>
        <figure className="any-artist-img">
            <img src={artist["profilePic"]} alt="Whoops, an error ocurred!" className=""/>
        </figure>
    </div>
    )
}

export default AnyArtist 