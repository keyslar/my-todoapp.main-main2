import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
  }),
  actions: {
    async login(userData) {
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fakeToken = "fake-jwt-token-123456";

      this.user = userData;
      this.token = fakeToken;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", fakeToken);
      this.loading = false;
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
