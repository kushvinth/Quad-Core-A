const uploadBtn = document.getElementById("uploadBtn");
const reportFile = document.getElementById("reportFile");
const reportName = document.getElementById("reportName");
const reportsContainer = document.getElementById("reportsContainer");
const reportsSection = document.getElementById("reportsSection");

/* Load saved reports */
window.addEventListener("DOMContentLoaded", () => {
  const savedReports = JSON.parse(localStorage.getItem("reports")) || [];

  if (savedReports.length > 0) {
    reportsSection.style.display = "block";
    savedReports.forEach(addReportToUI);
  }

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});

/* Upload report */
uploadBtn.addEventListener("click", () => {
  if (!reportFile.files[0] || !reportName.value.trim()) {
    alert("Please select a file and enter report name.");
    return;
  }

  const report = {
    name: reportName.value,
    date: new Date().toLocaleDateString(),
  };

  const reports = JSON.parse(localStorage.getItem("reports")) || [];
  reports.push(report);
  localStorage.setItem("reports", JSON.stringify(reports));

  reportsSection.style.display = "block";
  addReportToUI(report);

  reportFile.value = "";
  reportName.value = "";
});

/* Add report to UI */
function addReportToUI(report) {
  const div = document.createElement("div");
  div.className = "report-item";

  div.innerHTML = `
    <div class="report-info">
      <strong>${report.name}</strong>
      <span>Uploaded on ${report.date}</span>
    </div>

    <div class="report-actions">
      <button onclick="alert('Preview coming soon')">View</button>
      <button class="delete" onclick="deleteReport(this)">Delete</button>
    </div>
  `;

  reportsContainer.appendChild(div);
}

/* Delete report */
function deleteReport(btn) {
  const reportItem = btn.closest(".report-item");
  const name = reportItem.querySelector("strong").innerText;

  let reports = JSON.parse(localStorage.getItem("reports")) || [];
  reports = reports.filter(r => r.name !== name);
  localStorage.setItem("reports", JSON.stringify(reports));

  reportItem.remove();

  if (reports.length === 0) {
    reportsSection.style.display = "none";
  }
}

document.getElementById("reportFile").addEventListener("change", function () {
  const fileName = this.files[0]?.name || "No file selected";
  document.getElementById("fileName").innerText = fileName;
});
