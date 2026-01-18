function toggleMenu() {
    document.getElementById("profileMenu").classList.toggle("show");
}

// close dropdown
window.addEventListener("click", function (e) {
    const profile = document.querySelector(".profile-container");
    const menu = document.getElementById("profileMenu");

    if (!profile.contains(e.target)) {
        menu.classList.remove("show");
    }
});