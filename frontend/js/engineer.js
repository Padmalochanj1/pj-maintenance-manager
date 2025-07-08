const token = localStorage.getItem("token");
const API = "https://pj-mm-backend.onrender.com";

async function loadMyTasks() {
  const res = await fetch(`${API}/api/tasks/my`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const tasks = await res.json();
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = tasks.map(t => `
    <li>
      ${t.title} - ${t.status}
      <select onchange="updateStatus('${t._id}', this.value)">
        <option value="">Update Status</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </li>
  `).join("");
}

async function updateStatus(id, status) {
  const res = await fetch(`${API}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (res.ok) {
    alert("Status updated");
    loadMyTasks();
  } else {
    alert("Failed to update");
  }
}

loadMyTasks();
