<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="todo p-6 bg-gray-50 rounded-lg shadow-lg w-full max-w-lg">
      <!-- Kullanıcı bilgisi ve logout -->
      <div
        class="flex justify-end mb-2 text-gray-600 font-semibold items-center gap-4"
      >
        <span v-if="user"> {{ user.firstName }} {{ user.lastName }} </span>
        <button
          v-if="user"
          @click="handleLogout"
          class="text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </div>

      <!-- Başlık -->
      <h1 class="text-3xl font-semibold text-center mb-4 text-gray-800">
        Görevlerim
      </h1>

      <!-- Yeni görev ekleme -->
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

      <!-- Görev listesi -->
      <ul class="list-none space-y-4 mt-6">
        <li
          v-for="(todo, index) in tasks"
          :key="todo.id || index"
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100"
        >
          <div class="flex items-center gap-4">
            <input
              type="checkbox"
              @change="completeTodo(index)"
              class="form-checkbox text-blue-500 focus:ring-2 focus:ring-blue-400"
            />
            <span class="text-gray-700">{{ todo.todo || todo }}</span>
          </div>
          <button
            @click="deleteTodo(index)"
            class="text-red-500 hover:text-red-700 font-semibold"
          >
            Sil
          </button>
        </li>
      </ul>

      <!-- Tamamlananlar sayfasına link -->
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ls from "../services/localStorageService";

const router = useRouter();
const newTodo = ref("");
const tasks = ref([]);
const user = ref(ls.getUser()); //Kullanıcı localden geliyor

//Görevleri yükle
async function loadTasks() {
  const fetchFlip = ls.getFetchFlip();

  if (!fetchFlip) {
    try {
      const res = await fetch("https://dummyjson.com/todos?limit=20");
      const data = await res.json();
      tasks.value = data.todos;
      ls.saveTasks(tasks.value);
      ls.setFetchFlip(true);
    } catch (err) {
      console.error("API error:", err);
      tasks.value = ls.getTasks();
    }
  } else {
    tasks.value = ls.getTasks();
  }
}

//Görev ekle
function addTodo() {
  if (newTodo.value.trim() !== "") {
    const newTask = { id: Date.now(), todo: newTodo.value.trim() };
    tasks.value.push(newTask);
    ls.saveTasks(tasks.value);
    newTodo.value = "";
  }
}

//Görev tamamla
function completeTodo(index) {
  const task = tasks.value[index];
  if (task) {
    ls.addCompletedTask(task);
    tasks.value.splice(index, 1);
    ls.saveTasks(tasks.value);
  }
}

//Görev sil
function deleteTodo(index) {
  tasks.value.splice(index, 1);
  ls.saveTasks(tasks.value);
}

// ✅ Çıkış
function handleLogout() {
  ls.clearAll(); //bütün localStorage verilerini sil
  user.value = null;
  tasks.value = [];
  router.push("/welcome");
}

onMounted(() => {
  loadTasks();
});
</script>
