<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-4 text-center">Hoş geldin!</h2>

      <form @submit.prevent="handleStart" class="space-y-3">
        <input
          v-model="firstName"
          placeholder="Ad"
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="lastName"
          placeholder="Soyad"
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Başla
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const userStore = useUserStore();
const router = useRouter();

function handleStart() {
  if (firstName.value.trim() && lastName.value.trim()) {
    userStore.login({ firstName: firstName.value, lastName: lastName.value });

    router.push("/todos");
  } else {
    alert("Lütfen ad ve soyad giriniz.");
  }
}
</script>
