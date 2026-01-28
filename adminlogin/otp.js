const inputs = document.querySelectorAll('.otp-box');
const form = document.getElementById('otp-form');
const modal = document.getElementById('error-modal');

inputs.forEach((input, index) => {
    // Allow Numbers Only & Auto-Focus Next
    input.addEventListener('input', (e) => {
        // Remove non-numbers
        e.target.value = e.target.value.replace(/[^0-9]/g, '');

        if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    // Handle Backspace (Go back to previous box)
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// PREVENT SUBMIT IF INCOMPLETE
form.addEventListener('submit', (e) => {
    let otpCode = '';
    inputs.forEach(input => {
        otpCode += input.value;
    });

    // Check if length is less than 6
    if (otpCode.length < 6) {
        e.preventDefault();
        modal.classList.add('show');
    }
});

// Close Modal Logic
function closeModal() {
    modal.classList.remove('show');
}

// Close if clicking outside the white box
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}