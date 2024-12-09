import axios from "axios";
import Cookies from 'js-cookie';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}login`, {
            username,
            password
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error || 'Erro ao realizar login');
    }
}

export const registerCalled = async () => {
    try {
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('priority', priority);
        formData.append('imagens', imagens);
        formData.append('category', category);

        if (Array.isArray(imagens.value)) {
            imagens.value.forEach((image) => {
                formData.append('imagens', image);
            });
        } else {
            console.error('imagens.value não é um array');
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}registerCalled`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })

        return response.data;

    } catch (error) {
        console.log(error || 'Erro ao realizar abertura de chamado');
    }
}

export const getCalled = async () => {
    try {

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}listCalled`, {
            withCredentials: true
        });

        return response.data;

    } catch (error) {
        console.error(error.message || 'Erro ao buscar lista de chamados');
        throw error;
    }
}

export const updatePassword = async (update) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BASE_URL}updatePassword`,
            update,
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        console.error("Erro na API de atualização:", error.response?.data || error);
        throw new Error(
            error.response?.data?.message || "Erro ao atualizar a senha."
        );
    }
}