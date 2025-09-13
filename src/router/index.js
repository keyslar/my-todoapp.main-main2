import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "../views/WelcomePage.vue";
import TodoList from "../views/TodoList.vue";
import CompletedTasks from "../views/CompletedTasks.vue";
import { useAuthStore } from "../stores/authStore";

const routes = [
  { path: "/", redirect: "/welcome" },
  { path: "/welcome", component: WelcomePage },
  { path: "/todos", component: TodoList },
  { path: "/completed", component: CompletedTasks },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const publicPages = ["/welcome"];
  const authRequired = !publicPages.includes(to.path);

  console.log("Guard check:", {
    to: to.path,
    token: authStore.token,
    localToken: localStorage.getItem("token"),
  });

  if (authRequired && !(authStore.token || localStorage.getItem("token"))) {
    return "/welcome";
  }
});

export default router;
