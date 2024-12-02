import { ref } from "vue"
import { getCalled, registerCalled, updatePassword } from "../services/authServices.js";
import { defineStore } from "pinia";

export const useCalledStore = defineStore('calledStore', {
    state: () => ({
        called: [],
        isLoading: false,
        error: null,
    }),
    actions: {
        async createCalled(payload) {
            this.isLoading = true;
            this.error = null;

            try {

                const newCalled = await registerCalled(payload);
                this.called.push(newCalled);
                return newCalled;

            } catch (error) {
                this.error = err.response?.data?.message || 'Erro ao registrar chamado';
            } finally {
                this.isLoading = false;
            }
        }
    }
})

export const useGetCalled = defineStore('listCalled', {
    state: () => ({
        isLoading: false,
        list: [],
    }),
    actions: {
        async getList() {
            if (!this.isLoading) {
                try {
                    const data = await getCalled();
                    this.list = data;
                    this.isLoading = true;
                } catch (error) {
                    console.log(error);
                    this.isLoading = false;
                }
            }
        },
        async realoadList() {
            try {
                const { data, status } = await getCalled();
                if (status === 200) {
                    this.list = data;
                    this.isLoading = true;
                }
            } catch (error) {
                console.log(error);
                this.isLoading = false;
            }
        }
    }
})

export const useUpdatePassword = defineStore('updateStore', {
    state: () => ({
        isLoading: false,
        updatePassword: [],
        error: null
    }),
    actions: {
        async updatePassword(update) {
            this.isLoading = true;
            this.error = null;

            try {

                const newpassword = await updatePassword(update);
                this.updatePassword.push(newpassword);
                return newpassword;

            } catch (error) {
                console.log(error);
            }
        } 
    }
})