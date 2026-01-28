function toggleMenu() {
    document.getElementById("profileMenu").classList.toggle("show");
}

window.addEventListener("click", function (e) {
    const profile = document.querySelector(".profile-container");
    const menu = document.getElementById("profileMenu");

    if (!profile.contains(e.target)) {
        menu.classList.remove("show");
    }
});

// Select the tabs and the table rows
const tabs = document.querySelectorAll('.tab');
const rows = document.querySelectorAll('.notification-table tbody tr');

// Add a click event to each tab
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        
        // Remove 'active' class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add 'active' class to the clicked tab
        tab.classList.add('active');

        // Unread or All Notification
        const filterType = tab.innerText.trim();

        // Filter the rows
        rows.forEach(row => {
            // Unread" or Read
            const statusText = row.querySelector('td:first-child').innerText.trim();

            if (filterType === 'All Notification') {
                row.style.display = ''; 
            } else if (filterType === 'Unread') {
                // Show only if the status matches "Unread"
                if (statusText.includes('Unread')) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });
});