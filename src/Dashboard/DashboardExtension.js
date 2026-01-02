function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const sidebarSeparator = document.getElementById("sidebarSeparator1");
    sidebar.classList.toggle("collapsed");
    sidebar.classList.toggle("expanded");
    sidebarSeparator.classList.toggle("collapsed");
    sidebarSeparator.classList.toggle("expanded");
}

function toggleProfileMenu() {
    const menu = document.getElementById("profileMenu");
    menu.classList.toggle("active");
}

/* Close dropdown when clicking outside */
document.addEventListener("click", function (event) {
    const profile = document.querySelector(".profile-wrapper");
    if (!profile.contains(event.target)) {
        document.getElementById("profileMenu").classList.remove("active");
    }
});