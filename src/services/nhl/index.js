import axios from 'axios';

const NHL_API_URL = 'https://statsapi.web.nhl.com/api/v1';

export const fetchNHLData = async (endpoint) => {
  try {
    const response = await axios.get(`${NHL_API_URL}/${endpoint}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data from NHL API:', error.message);
    return null;
  }
}
