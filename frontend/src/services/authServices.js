import axios from "axios";

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}login`, {
            username,
            password
        });
        localStorage.setItem('token', response.data.token)
        return response.data.token;
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

        if (Array.isArray(imagens.value)) {
            imagens.value.forEach((image) => {
                formData.append('imagens', image);
            });
        } else {
            console.error('imagens.value não é um array');
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/registerCalled`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.log(error || 'Erro ao realizar abertura de chamado');
    }
}

export const getCalled = async () => {
    try {

        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}listCalled`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response.data);

        return response.data;

    } catch (error) {
        console.error(error.message || 'Erro ao buscar lista de chamados');
        throw error;
    }
}