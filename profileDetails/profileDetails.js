// Toggle Profile Menu
function toggleMenu() {
    const menu = document.getElementById("profileMenu");
    menu.classList.toggle("show");
}

// Close menu when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.user')) {
        var dropdowns = document.getElementsByClassName("profile-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.querySelectorAll('.btn-save-small').forEach(btn => {
    btn.addEventListener('click', () => {
        alert("Section Saved Locally!");
    });
});

document.querySelector('.btn-confirm-page').addEventListener('click', () => {
    alert("Profile Successfully Updated!");
});

document.querySelector('.btn-cancel-page').addEventListener('click', () => {
    if(confirm("Discard changes?")) {
        location.reload();
    }
});