import api from "./api";

export async function getTodos(limit = 10, skip = 0) {
  const res = await api.get(`/todos?limit=${limit}&skip=${skip}`);
  return res.data;
}

export async function updateTodo(id, completed) {
  const res = await api.put(`/todos/${id}`, { completed });
  return res.data;
}
