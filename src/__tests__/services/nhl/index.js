import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchNHLData } from '../../../services/nhl/index.js';

const mockAxios = new MockAdapter(axios);

describe('fetchNHLData', () => {

  beforeEach(() => {
    mockAxios.reset();
  });

  test('should fetch data from the NHL API', async () => {
    // Mock the response from the API
    const endpoint = 'schedule?expand=schedule.linescore';
    const apiUrl = `https://statsapi.web.nhl.com/api/v1/${endpoint}`;
    
    mockAxios.onGet(apiUrl).reply(200, {
      dates: [{ games: [{ id: 1, status: 'Live' }] }],
    });

    const data = await fetchNHLData(endpoint);

    expect(data).toEqual({ dates: [{ games: [{ id: 1, status: 'Live' }] }] });
  });
  
  test('should return null if there is an error', async () => {
    // Mock the error response
    mockAxios.onGet('https://statsapi.web.nhl.com/api/v1/').reply(500, {
      error: 'API Error',
    });

    const endpoint = 'schedule?expand=schedule.linescore';
    const data = await fetchNHLData(endpoint);

    expect(data).toBeNull();
  });
});
