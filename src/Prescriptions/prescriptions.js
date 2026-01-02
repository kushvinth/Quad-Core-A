const fileInput = document.getElementById("prescriptionFile");
const fileNameText = document.getElementById("fileName");
const nameInput = document.getElementById("prescriptionName");
const doctorInput = document.getElementById("doctorName");
const dateInput = document.getElementById("prescribedDate");
const uploadBtn = document.getElementById("uploadBtn");

const prescriptionSection = document.getElementById("prescriptionSection");
const prescriptionContainer = document.getElementById("prescriptionContainer");

let prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];

/* Load */
window.addEventListener("DOMContentLoaded", () => {
  renderPrescriptions();

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});

/* File name display */
fileInput.addEventListener("change", () => {
  fileNameText.textContent = fileInput.files[0]
    ? fileInput.files[0].name
    : "No file chosen";
});

/* Upload */
uploadBtn.addEventListener("click", () => {
  if (!fileInput.files[0] || !nameInput.value || !doctorInput.value || !dateInput.value) {
    alert("Please fill all fields.");
    return;
  }

  prescriptions.push({
    id: Date.now(),
    name: nameInput.value,
    doctor: doctorInput.value,
    date: dateInput.value,
    fileName: fileInput.files[0].name
  });

  localStorage.setItem("prescriptions", JSON.stringify(prescriptions));

  fileInput.value = "";
  fileNameText.textContent = "No file chosen";
  nameInput.value = "";
  doctorInput.value = "";
  dateInput.value = "";

  renderPrescriptions();
});

/* Render */
function renderPrescriptions() {
  prescriptionContainer.innerHTML = "";

  if (!prescriptions.length) {
    prescriptionSection.style.display = "none";
    return;
  }

  prescriptionSection.style.display = "block";

  prescriptions.forEach(p => {
    const card = document.createElement("div");
    card.className = "prescription-card";

    card.innerHTML = `
      <div class="prescription-info">
        <p><strong>${p.name}</strong></p>
        <p>Doctor: ${p.doctor}</p>
        <p>Date: ${p.date}</p>
      </div>
      <div class="prescription-actions">
        <button class="view-btn">View</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    card.querySelector(".delete-btn").onclick = () => {
      prescriptions = prescriptions.filter(item => item.id !== p.id);
      localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
      renderPrescriptions();
    };

    card.querySelector(".view-btn").onclick = () => {
      alert(`File: ${p.fileName}\n(Preview not implemented yet)`);
    };

    prescriptionContainer.appendChild(card);
  });
}
