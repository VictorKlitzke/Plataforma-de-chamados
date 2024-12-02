import { ref } from 'vue';
import { login } from "../services/authServices.js";

const user = ref(null);

export const useAuth = () => {
    const loginUser = async (username, password) => {
        try {
            const userData = await login(username, password);
            user.value = userData;
            localStorage.setItem('UserId', userData.UserId);
        } catch (error) {
            throw new Error('Erro ao realizar login');
        }
    };

    return {
        user,
        login: loginUser,
    };
};
