function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

const token = localStorage.getItem("token");
const API = "https://pj-mm-backend.onrender.com";

async function loadTasks() {
  const res = await fetch(`${API}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const tasks = await res.json();
  document.getElementById("task-list").innerHTML = tasks.map(t => `<li>${t.title} - ${t.status}</li>`).join("");
}

loadTasks();

document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const assignedTo = document.getElementById("assignedTo").value;
  const res = await fetch(`${API}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, assignedTo })
  });
  if (res.ok) {
    alert("Task assigned");
    loadTasks();
  } else {
    alert("Error assigning task");
  }
});
