import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    completedTasks: [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    completeTask(index) {
      const task = this.tasks.splice(index, 1)[0];
      this.completedTasks.push(task);
    },
    undoTask(index) {
      const task = this.completedTasks.splice(index, 1)[0];
      this.tasks.push(task);
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
  },
});
