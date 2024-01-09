import axios from "axios";

export const UserService = {
    async login(user) {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    login: user.username,
                    password: user.password,
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    },

    async register(user) {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                {
                    login: user.username,
                    password: user.password,
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response.data;

        }
    },

    async validate(token) {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/validate",
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
};