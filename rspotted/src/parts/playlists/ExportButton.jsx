import * as XLSX from "xlsx";

const ExportButton = ({name, data}) => {
      
      const transformData = (data) => {

            let finalArray = data.map(
                o => {
                    return ({"Index": o.index, "Track Name": o.trackName, "Track Link": o.trackLink, 
                    "Artist Name": o.artistName, "Album Name": o.albumName, "Release Date": o.releaseDate, "Id": o.id})
                } )
            return finalArray

      }

      const generateExcelFile = () => {
        const objects = transformData(data)
        const ws = XLSX.utils.json_to_sheet(objects);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${name}.xlsx`);
    }

    return (
        <div className="distance btn btn-primary">
                <button onClick={() => {generateExcelFile()}}>Download as Excel!</button>
        </ div>
    )
}

export default ExportButton