// MENU TOGGLE 
function toggleMenu() {
    document.getElementById("profileMenu").classList.toggle("show");
}

window.addEventListener("click", function (e) {
    const profile = document.querySelector(".profile-container");
    const menu = document.getElementById("profileMenu");

    if (profile && menu && !profile.contains(e.target)) {
        menu.classList.remove("show");
    }
});

// SEARCH AND FILTER LOGIC
document.addEventListener("DOMContentLoaded", function() {
    
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const tableBody = document.getElementById('requestTableBody');
    const tableRows = tableBody.getElementsByTagName('tr');

    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const statusFilter = filterSelect.value.toLowerCase();

        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];
            
            const reqId = row.cells[0].textContent.toLowerCase();
            const name = row.cells[1].textContent.toLowerCase();
            const statusText = row.cells[4].textContent.toLowerCase().trim();

            const matchesSearch = reqId.includes(searchTerm) || name.includes(searchTerm);

            const matchesStatus = statusFilter === 'all' || statusText.includes(statusFilter);

            if (matchesSearch && matchesStatus) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', filterTable);
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', filterTable);
    }
});