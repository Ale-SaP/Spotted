import axios from 'axios';

const callArtist = async (id) => {
    const dataFromApi = await axios.get(`http://127.0.0.1:8000/api/artist/${id}`);
    return dataFromApi.data
}

const callPlaylist = async (id) => {
    const dataFromApi = await axios.get(`http://127.0.0.1:8000/api/playlist/${id}`);
    return dataFromApi.data
}

export {callArtist, callPlaylist}