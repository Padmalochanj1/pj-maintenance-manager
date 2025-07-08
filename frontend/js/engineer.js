function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

const token = localStorage.getItem("token");
const API = "https://pj-mm-backend.onrender.com";

async function loadMyTasks() {
  const res = await fetch(`${API}/api/tasks/my`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const tasks = await res.json();
  document.getElementById("task-list").innerHTML = tasks.map(t => `<li>${t.title} - ${t.status}</li>`).join("");
}

loadMyTasks();
