const toggles = document.querySelectorAll("input[type='checkbox']");
const darkModeToggle = document.getElementById("darkMode");

/* ================= LOAD SETTINGS ================= */

document.addEventListener("DOMContentLoaded", () => {

  toggles.forEach(toggle => {
    const saved = localStorage.getItem(toggle.id);
    if (saved !== null) {
      toggle.checked = saved === "true";
    }
  });

  // Apply dark mode immediately on load
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});

/* ================= SAVE SETTINGS ================= */

toggles.forEach(toggle => {
  toggle.addEventListener("change", () => {

    localStorage.setItem(toggle.id, toggle.checked);

    // LIVE dark mode toggle
    if (toggle.id === "darkMode") {
      document.body.classList.toggle("dark-mode", toggle.checked);
    }
  });
});

/* ================= CLEAR CACHE ================= */

document.getElementById("clearCache").addEventListener("click", () => {
  localStorage.clear();
  alert("Cache cleared successfully!");
  location.reload();
});

/* ================= RESET SETTINGS ================= */

document.getElementById("resetSettings").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
