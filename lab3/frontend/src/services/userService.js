import axios from "axios";

export const UserService = {
    async login(user) {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    login: user.username,
                    password: user.password,
                }
            );
            return response.data;
    },

    async register(user) {
            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                {
                    login: user.username,
                    password: user.password,
                }
            );
            return response.data;
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
            return false;
        }
    }
};