import axios from "axios";

export async function login(username, password) {
  try {
    const res = await axios.post("https://dummyjson.com/auth/login", {
      username,
      password,
      expiresInMins: 30,
    });
    return res.data;
  } catch (err) {
    console.error("Axios login error:", err.response?.data || err.message);
    throw err;
  }
}

export function logout() {
  return true;
}
