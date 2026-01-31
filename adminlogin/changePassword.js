// Toggle Password Visibility
const toggles = document.querySelectorAll('.toggle-password');
toggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Password Validation
const form = document.getElementById('reset-form');
const passwordInput = document.getElementById('new-password');
const confirmInput = document.getElementById('confirm-password');
const modal = document.getElementById('error-modal');
const modalMessage = document.getElementById('modal-message');

form.addEventListener('submit', (e) => {
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    // At least 1 Lowercase, 1 Uppercase, 1 Number, 1 Special Char
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if passwords match
    if (password !== confirm) {
        e.preventDefault();
        showError("Passwords do not match.");
        return;
    }

    // Check password complexity
    if (!strongPasswordRegex.test(password)) {
        e.preventDefault();
        showError("Password must contain at least:<br>• 1 Uppercase Letter<br>• 1 Lowercase Letter<br>• 1 Number<br>• 1 Special Character (@$!%*?&)<br>• Minimum 8 characters");
        return;
    }
});

function showError(message) {
    modalMessage.innerHTML = message;
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}