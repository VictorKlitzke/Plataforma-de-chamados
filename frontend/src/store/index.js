import { ref } from "vue"
import { getCalled, registerCalled } from "../services/authServices.js";
import { defineStore } from "pinia";

export const useCalledStore = defineStore('calledStore', {
    state: () => ({
        called: [],
        isLoading: false,
        error: null,
    }),
    actions:{
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

export const GetCalled = defineStore('listCalled', {
    state: () => ({
        isLoading: false,
        list: [],
    }),
    actions: {
        async getList () {
            if (!this.isLoading) {
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
        },
        async realoadList () {
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