function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

const token = localStorage.getItem("token");
const API = "https://pj-mm-backend.onrender.com";

async function loadUsers() {
  const res = await fetch(`${API}/api/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const users = await res.json();
  document.getElementById("user-list").innerHTML = users.map(u => `<li>${u.name} - ${u.role}</li>`).join("");
}

async function loadTasks() {
  const res = await fetch(`${API}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const tasks = await res.json();
  document.getElementById("task-list").innerHTML = tasks.map(t => `<li>${t.title} - ${t.status}</li>`).join("");
}

loadUsers();
loadTasks();
