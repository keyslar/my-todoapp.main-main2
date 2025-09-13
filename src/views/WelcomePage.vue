<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-4 text-center">Giriş Yap</h2>

      <form @submit.prevent="handleLogin" class="space-y-3">
        <input
          v-model="username"
          placeholder="Kullanıcı adı"
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Şifre"
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

async function handleLogin() {
  console.log("Login button clicked"); //ekle

  const success = await authStore.login(username.value, password.value);
  console.log("Login result:", success, "Token:", authStore.token);
  if (success) {
    console.log("Redirecting to /todos ...");
    router.push("/todos");
  } else {
    alert("Giriş başarısız ");
  }
}
</script>
