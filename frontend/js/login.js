const API_URL = "https://pj-mm-backend.onrender.com"; // replace with your backend URL if different

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      // redirect to role-based dashboard
      if (data.role === "Admin") location.href = "admin.html";
      else if (data.role === "Manager") location.href = "manager.html";
      else location.href = "engineer.html";
    } else {
      document.getElementById("login-error").textContent = data.message || "Login failed";
    }
  } catch (err) {
    document.getElementById("login-error").textContent = "Server error";
  }
});
