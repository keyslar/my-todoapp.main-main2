<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="todo p-6 bg-gray-50 rounded-lg shadow-lg w-full max-w-lg">
      <div
        class="flex justify-end mb-2 text-gray-600 font-semibold items-center gap-4"
      >
        <span v-if="userStore.user">
          {{ userStore.user.firstName }} {{ userStore.user.lastName }}
        </span>
        <button
          v-if="userStore.user"
          @click="handleLogout"
          class="text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </div>

      <h1 class="text-3xl font-semibold text-center mb-4 text-gray-800">
        Görevlerim
      </h1>

      <div class="flex mb-4">
        <input
          v-model="newTodo"
          placeholder="Bir şey yaz..."
          @keyup.enter="addTodo"
          class="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="addTodo"
          class="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Ekle
        </button>
      </div>

      <ul class="list-none space-y-4 mt-6">
        <li
          v-for="(todo, index) in taskStore.tasks"
          :key="index"
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100"
        >
          <div class="flex items-center gap-4">
            <input
              type="checkbox"
              @change="completeTodo(index)"
              class="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-400"
            />
            <span class="text-gray-700">{{ todo }}</span>
          </div>
          <button
            @click="deleteTodo(index)"
            class="text-red-500 hover:text-red-700 font-semibold"
          >
            Sil
          </button>
        </li>
      </ul>

      <router-link
        to="/completed"
        class="inline-block mt-6 text-lg text-purple-500 hover:text-purple-600 underline"
      >
        Tamamlanan Görevler
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const taskStore = useTaskStore();
const userStore = useUserStore();
const router = useRouter();
const newTodo = ref("");

function addTodo() {
  if (newTodo.value.trim() !== "") {
    taskStore.addTask(newTodo.value.trim());
    newTodo.value = "";
  }
}

function completeTodo(index) {
  taskStore.completeTask(index);
}

function deleteTodo(index) {
  taskStore.deleteTask(index);
}

function handleLogout() {
  userStore.logout();
  router.push("/welcome");
}
</script>
