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
    const tabs = document.querySelectorAll('.tab');
    const tableBody = document.querySelector('.notification-table tbody'); 
    let rows = document.querySelectorAll('.notification-table tbody tr');

    const btnMarkRead = document.querySelector('.btn-mark-read');
    const btnClear = document.querySelector('.btn-clear');

    const clearModal = document.getElementById('clear-modal');
    const btnConfirmClear = document.getElementById('btn-confirm-clear');

    // TAB FILTERING
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterType = tab.innerText.trim();
            rows = document.querySelectorAll('.notification-table tbody tr');

            rows.forEach(row => {
                const statusCell = row.querySelector('td:first-child');
                const statusText = statusCell ? statusCell.innerText.trim() : "";

                if (filterType === 'All Notification') {
                    row.style.display = ''; 
                } else if (filterType === 'Unread') {
                    if (statusText.includes('Unread')) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        });
    });

    // MARK ALL AS READ
    if (btnMarkRead) {
        btnMarkRead.addEventListener('click', function() {
            const currentRows = document.querySelectorAll('.notification-table tbody tr');
            let changesMade = false;

            currentRows.forEach(row => {
                const statusCell = row.querySelector('td:first-child');
                const statusDot = statusCell ? statusCell.querySelector('.status-dot') : null;

                if (statusCell && (statusCell.innerText.includes('Unread') || (statusDot && statusDot.classList.contains('unread')))) {
                    if (statusDot) {
                        statusDot.classList.remove('unread');
                        statusDot.classList.add('read'); 
                    }
                    if (statusCell.lastChild.nodeType === Node.TEXT_NODE) {
                        statusCell.lastChild.textContent = ' Read'; 
                    } else {
                        statusCell.innerHTML = statusCell.innerHTML.replace('Unread', 'Read');
                    }
                    changesMade = true;
                }
            });

            if (changesMade) {
                const activeTab = document.querySelector('.tab.active');
                if (activeTab && activeTab.innerText.trim() === 'Unread') {
                    activeTab.click();
                }
            }
        });
    }

    // CLEAR NOTIFICATIONS
    if (btnClear) {
        btnClear.addEventListener('click', function() {
            // Open the custom modal instead of window.confirm
            openClearModal();
        });
    }

    // CONFIRM CLEAR
    if (btnConfirmClear) {
        btnConfirmClear.addEventListener('click', function() {
            if (tableBody) {
                tableBody.innerHTML = '';
                
                const emptyRow = `
                    <tr>
                        <td colspan="4" style="text-align:center; padding: 30px; color: #999;">
                            <i class="fa-regular fa-bell-slash" style="font-size: 24px; margin-bottom: 10px; display:block;"></i>
                            No notifications available.
                        </td>
                    </tr>
                `;
                tableBody.innerHTML = emptyRow;
            }
            closeClearModal();
        });
    }

    // MODAL HELPER FUNCTIONS
    window.openClearModal = function() {
        if(clearModal) clearModal.classList.add('show');
    }

    window.closeClearModal = function() {
        if(clearModal) clearModal.classList.remove('show');
    }

    // Close modal
    window.addEventListener("click", function (e) {
        if (e.target == clearModal) {
            closeClearModal();
        }
    });
});