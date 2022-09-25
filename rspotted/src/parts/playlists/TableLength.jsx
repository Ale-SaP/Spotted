<div className="flex justify-center w-full py-2 gap-2">
            {listOfObjects.map( list => { return (
                <>
                    <a href={"#" + list[0]["index"]} className="btn btn-xs">{ `${list[0]["index"]} to ${list[list.length - 1]["index"]}`}</a>
                </> 
            )})}
        </div>