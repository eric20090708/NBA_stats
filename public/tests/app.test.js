import axios from 'axios';
import request from 'supertest';
import app from '../../app.js';

// Jest mock for all axios calls
jest.mock('axios');

describe('/players/search API endpoint', () => {
    beforeEach(() => {
        // Resets the mock before each test
        axios.request.mockClear();
    });

    test('responds with JSON containing NBA players data', async () => {
        axios.request.mockResolvedValueOnce({
            data: {
                data: [{ id: 19, first_name: 'Stephen', last_name: 'Curry' }] 
            }
        });

        const response = await request(app)
            .get('/players/search?search=Stephen');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ id: 19, first_name: 'Stephen', last_name: 'Curry' }]); 
    });

});

