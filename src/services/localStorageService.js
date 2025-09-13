const KEYS = {
  TASKS: "tasks",
  COMPLETED: "completedTasks",
  CUSTOM: "customTasks",
  FETCH_FLIP: "fetchFlip",
  USER: "user",
  TOKEN: "token",
};

//Görevler
function saveTasks(tasks) {
  localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
}
function getTasks() {
  return JSON.parse(localStorage.getItem(KEYS.TASKS) || "[]");
}

//Tamamlananlar
function addCompletedTask(task) {
  const tasks = getCompletedTasks();
  tasks.push(task);
  localStorage.setItem(KEYS.COMPLETED, JSON.stringify(tasks));
}
function saveCompletedTasks(tasks) {
  localStorage.setItem(KEYS.COMPLETED, JSON.stringify(tasks));
}
function getCompletedTasks() {
  return JSON.parse(localStorage.getItem(KEYS.COMPLETED) || "[]");
}

//Kullanıcı
function saveUser(user) {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}
function getUser() {
  return JSON.parse(localStorage.getItem(KEYS.USER) || "null");
}
function clearUser() {
  localStorage.removeItem(KEYS.USER);
}

//Fetch Flip
function getFetchFlip() {
  return JSON.parse(localStorage.getItem(KEYS.FETCH_FLIP) || "false");
}
function setFetchFlip(value) {
  localStorage.setItem(KEYS.FETCH_FLIP, JSON.stringify(value));
}

//Tüm verileri temizle
function clearAll() {
  localStorage.removeItem(KEYS.TASKS);
  localStorage.removeItem(KEYS.COMPLETED);
  localStorage.removeItem(KEYS.CUSTOM);
  localStorage.removeItem(KEYS.FETCH_FLIP);
  localStorage.removeItem(KEYS.USER);
  localStorage.removeItem(KEYS.TOKEN);
}

export default {
  saveTasks,
  getTasks,
  addCompletedTask,
  saveCompletedTasks, //eklendi
  getCompletedTasks,
  saveUser,
  getUser,
  clearUser,
  getFetchFlip,
  setFetchFlip,
  clearAll,
};
