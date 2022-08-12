import axios from 'axios';

export const callApiId = async (id) => {
    const dataFromApi = await axios.get(`http://127.0.0.1:8000/api/artist/${id}`);
    return dataFromApi.data
}