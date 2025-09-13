import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async login(username, password) {
      try {
        const res = await axios.post("https://dummyjson.com/auth/login", {
          username,
          password,
          expiresInMins: 30,
        });

        this.user = res.data;
        this.token = res.data.token;

        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("token", this.token);

        return true;
      } catch (err) {
        console.error("Login failed:", err.response?.data || err.message);
        this.user = null;
        this.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
