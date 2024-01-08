import axios from 'axios';

export const PointsService = {
    async getPoints(token) {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/points",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    },

    async addPoint(token, point) {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/points/add",
                {
                    x: point.x,
                    y: point.y,
                    r: point.r,
                    result: point.result,
                    time: point.time,
                    executionTime: point.executionTime,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    },

    async deletePoints(token) {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/points/delete`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    },
};