import { defineStore } from "pinia";
import api from "../api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    error: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const res = await api.post("/auth/login", { username, password });
        this.token = res.data.token;
        localStorage.setItem("token", this.token);
        await this.getUser();
      } catch (err) {
        this.error = err.response?.data || err.message;
      }
    },
    async getUser() {
      try {
        const res = await api.get("/auth/users/me");
        this.user = res.data;
      } catch (err) {
        this.error = err.response?.data || err.message;
      }
    },
  },
});
