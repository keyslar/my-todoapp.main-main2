<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div
      class="todo p-6 bg-gray-50 rounded-lg shadow-lg w-full max-w-lg relative"
    >
      <div class="absolute top-4 right-4 text-gray-600 font-medium">
        {{ userStore.user.firstName }} {{ userStore.user.lastName }}
      </div>

      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">
        Tamamlanan Görevler
      </h2>

      <ul class="list-none space-y-4">
        <li
          v-for="(task, index) in taskStore.completedTasks"
          :key="index"
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100"
        >
          <span class="text-gray-700">{{ task }}</span>
          <input
            type="checkbox"
            checked
            @change="taskStore.undoTask(index)"
            class="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-400"
          />
        </li>
      </ul>

      <router-link
        to="/todos"
        class="inline-block mt-6 text-lg text-purple-500 hover:text-purple-600 underline"
      >
        Görevlerime Dön
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/userStore";

const taskStore = useTaskStore();
const userStore = useUserStore();
</script>
