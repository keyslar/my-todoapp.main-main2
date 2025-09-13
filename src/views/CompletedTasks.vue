<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="p-6 bg-gray-50 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">
        Tamamlanan Görevler
      </h2>
      <ul v-if="completedTasks.length > 0" class="list-none space-y-4">
        <li
          v-for="(task, index) in completedTasks"
          :key="task.id || index"
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100"
        >
          <div class="flex items-center gap-4">
            <input
              type="checkbox"
              checked
              @change="undoTask(index)"
              class="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-400"
            />
            <span class="text-gray-700 line-through">
              {{ task.todo || task }}
            </span>
          </div>
          <button
            @click="deleteCompletedTask(index)"
            class="text-red-500 hover:text-red-700 font-semibold"
          >
            Sil
          </button>
        </li>
      </ul>

      <p v-else class="text-center text-gray-500 mt-4">
        Henüz tamamlanmış görev yok.
      </p>

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
import { ref, onMounted } from "vue";
import ls from "../services/localStorageService";

const completedTasks = ref([]);

//Sayfa açılınca localden görevleri yükle
onMounted(() => {
  completedTasks.value = ls.getCompletedTasks();
});

function undoTask(index) {
  const task = completedTasks.value[index];
  if (!task) return;

  //Tamamlananlardan çıkar
  completedTasks.value.splice(index, 1);
  ls.saveCompletedTasks(completedTasks.value);

  //Normal task listesine geri ekle
  const tasks = ls.getTasks();
  tasks.push(task);
  ls.saveTasks(tasks);
}

function deleteCompletedTask(index) {
  completedTasks.value.splice(index, 1);
  ls.saveCompletedTasks(completedTasks.value);
}
</script>
