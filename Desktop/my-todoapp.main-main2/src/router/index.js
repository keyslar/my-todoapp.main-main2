import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "../views/WelcomePage.vue";
import TodoList from "../views/TodoList.vue";
import CompletedTasks from "../views/CompletedTasks.vue";
import { useUserStore } from "../stores/userStore";

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
  const userStore = useUserStore();
  const publicPages = ["/welcome"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !userStore.token) {
    return "/welcome";
  }
});

export default router;
