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

document.addEventListener("DOMContentLoaded", function() {
    
    const searchInput = document.getElementById('transSearchInput');
    const filterSelect = document.getElementById('transFilterSelect');
    const tableBody = document.getElementById('transactionTableBody');
    const tableRows = tableBody ? tableBody.getElementsByTagName('tr') : [];

    function filterTransactions() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const docTypeFilter = filterSelect.value.toLowerCase();

        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];
            
            const transId = row.cells[0].textContent.toLowerCase();
            const reqId = row.cells[1].textContent.toLowerCase();
            const name = row.cells[2].textContent.toLowerCase();
            const docType = row.cells[3].textContent.toLowerCase().trim();

            const matchesSearch = transId.includes(searchTerm) || 
                                  reqId.includes(searchTerm) || 
                                  name.includes(searchTerm);

            const matchesType = docTypeFilter === 'all' || docType.includes(docTypeFilter);

            if (matchesSearch && matchesType) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    }

    if (searchInput) searchInput.addEventListener('keyup', filterTransactions);
    if (filterSelect) filterSelect.addEventListener('change', filterTransactions);
});