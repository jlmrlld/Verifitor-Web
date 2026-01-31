function toggleMenu() {
    document.getElementById("profileMenu").classList.toggle("show");
}

// VARIABLES & ELEMENTS
const btnContainer = document.getElementById('action-buttons-container'); 

// Modals
const uploadModal = document.getElementById('upload-modal');
const hashModal = document.getElementById('hash-modal');
const blockchainModal = document.getElementById('blockchain-modal');
const qrModal = document.getElementById('qr-modal');
const releaseModal = document.getElementById('release-modal');
const rejectModal = document.getElementById('reject-modal'); 

// Workflow Elements
const confirmCheck = document.getElementById('confirm-check');
const blockchainSubmitBtn = document.getElementById('btn-blockchain-submit');
const releaseCheck = document.getElementById('release-check');
const releaseConfirmBtn = document.getElementById('btn-release-confirm');

// Upload Modal Elements
const fileInput = document.getElementById('fileInput');
const uploadConfirmCheck = document.getElementById('upload-confirm-check');
const uploadConfirmBtn = document.getElementById('btn-upload-confirm');

// Reject/Refund Elements
const rejectRefundCheck = document.getElementById('reject-refund-check');
const rejectConfirmBtn = document.getElementById('btn-reject-confirm');
const rejectReasonDropdown = document.getElementById('reject-reason');
const rejectTextInput = document.getElementById('reject-text-input');

// MULTIPLE FILE UPLOAD
let selectedFiles = [];

function handleFiles(files) {
    const newFiles = Array.from(files);
    selectedFiles = [...selectedFiles, ...newFiles];
    renderFileList();
}

function renderFileList() {
    const container = document.getElementById('file-list-container');
    if (!container) return;
    
    container.innerHTML = ''; 
    selectedFiles.forEach((file, index) => {
        const itemHtml = `
            <div class="file-preview-item">
                <div class="file-info">
                    <i class="fa-solid fa-file-pdf file-icon" style="color: #e74c3c;"></i>
                    <span class="file-name">${file.name}</span>
                    <span style="font-size: 11px; color: #888;">(${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <i class="fa-solid fa-xmark remove-file" onclick="removeFile(${index})"></i>
            </div>
        `;
        container.innerHTML += itemHtml;
    });
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    renderFileList();
}


// APPROVE / REJECT 

function approveRequest() {
    const statusPill = document.getElementById('status-pill');
    statusPill.textContent = "PROCESSING";
    statusPill.className = "status-pill processing";
    statusPill.style.backgroundColor = ""; statusPill.style.color = "";

    const dateSpan = document.getElementById('processed-date');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateSpan.textContent = today.toLocaleDateString('en-US', options);

    btnContainer.innerHTML = '<button class="btn-upload" onclick="openUploadModal()">Upload TOR</button>';
}

// REJECT 
function confirmReject() {
    let reason = rejectReasonDropdown.value;
    if (reason === 'other') {
        reason = rejectTextInput.value.trim();
    }
    if (!reason || reason === "Reason" || reason === "") {
        reason = "Incomplete Documents"; 
    }

    closeRejectModal();

    // Update Status
    const statusPill = document.getElementById('status-pill');
    statusPill.textContent = "REJECTED";
    statusPill.className = "status-pill rejected"; 
    statusPill.style.backgroundColor = ""; statusPill.style.color = "";

    // Update Payment Details to Refunded
    const paymentCard = document.getElementById('payment-card');
    if (paymentCard) {
        paymentCard.innerHTML = `
            <h3 class="card-heading">Payment Details</h3>
            <div class="payment-grid">
                <div class="payment-item">
                    <span class="sub-label">Payment Method</span>
                    <span class="sub-value">Gcash</span>
                </div>
                <div class="payment-item">
                    <span class="sub-label">Status</span>
                    <span class="sub-value" style="color: #7f8c8d; font-weight: 700;">
                        <i class="fa-solid fa-rotate-left" style="margin-right:5px;"></i> Refunded
                    </span>
                </div>
                <div class="payment-item">
                    <span class="sub-label">Amount Paid</span>
                    <span class="sub-value">₱150.00</span>
                </div>
                <div class="payment-item">
                    <span class="sub-label">Reference No.</span>
                    <span class="sub-value">1234578839</span>
                </div>
                <div class="payment-item">
                    <span class="sub-label">Date Paid</span>
                    <span class="sub-value">January 15, 2026</span>
                </div>
            </div>
        `;
        
        // Rejection Reason
        if (!document.getElementById('rejection-card-dynamic')) {
            const rejectionHtml = `
                <div class="detail-card" id="rejection-card-dynamic" style="margin-top: 20px;">
                    <h3 class="card-heading">Rejection Details</h3>
                    <div class="info-row">
                        <span class="label" style="color:#666; font-weight:500;">Reason:</span>
                        <div class="value" style="color: #333; margin-top:5px;">${reason}</div>
                    </div>
                </div>
            `;
            paymentCard.insertAdjacentHTML('afterend', rejectionHtml);
        }
    }

    // Update Validation
    const validationCard = document.getElementById('validation-card');
    if (validationCard) {
        validationCard.innerHTML = `
            <h3 class="card-heading">Validation</h3>
            <div class="validation-grid">
                <div class="validation-item">
                    <div class="sub-label">Hash Status:</div>
                    <div class="status-flex red">
                        <i class="fa-solid fa-circle-xmark status-icon"></i>
                        <span class="status-main">Not Generated</span>
                    </div>
                </div>
                <div class="validation-item">
                    <div class="sub-label">Blockchain Status:</div>
                    <div class="status-flex red">
                        <i class="fa-solid fa-circle-xmark status-icon"></i>
                        <span class="status-main">Not submitted</span>
                    </div>
                </div>
            </div>
        `;
    }

    btnContainer.innerHTML = ''; 
}

// Updated Confirm Upload
function confirmUpload() {
    if (selectedFiles.length === 0) {
        alert("Please select at least one file.");
        return;
    }
    
    closeUploadModal();
    btnContainer.innerHTML = '<button class="btn-generate" onclick="openHashModal()">Generate Hash</button>';
}

function confirmHash() {
    closeHashModal();
    const statusPill = document.getElementById('status-pill');
    statusPill.textContent = "APPROVED";
    statusPill.className = "status-pill approved";

    if (document.getElementById('validation-card')) {
        document.getElementById('validation-card').innerHTML = `
            <h3 class="card-heading">Validation</h3>
            <div class="validation-grid">
                <div class="validation-item">
                    <div class="sub-label">Hash Status:</div>
                    <div class="status-flex green">
                        <i class="fa-solid fa-circle-check status-icon"></i>
                        <div class="status-text-group">
                            <span class="status-main">Verified</span>
                            <span class="status-sub">0x12345......967</span>
                        </div>
                    </div>
                </div>
                <div class="validation-item">
                    <div class="sub-label">Blockchain Status:</div>
                    <div class="status-flex red">
                        <i class="fa-solid fa-circle-xmark status-icon"></i>
                        <span class="status-main">Not Submitted</span>
                    </div>
                </div>
            </div>`;
    }
    btnContainer.innerHTML = '<button class="btn-submit-blockchain" onclick="openBlockchainModal()">Submit to Blockchain</button>';
}

function confirmBlockchain() {
    if (!confirmCheck.checked) return;
    closeBlockchainModal();

    if (document.getElementById('validation-card')) {
        document.getElementById('validation-card').innerHTML = `
            <h3 class="card-heading">Validation</h3>
            <div class="validation-grid">
                <div class="validation-item">
                    <div class="sub-label">Hash Status:</div>
                    <div class="status-flex green">
                        <i class="fa-solid fa-circle-check status-icon"></i>
                        <div class="status-text-group">
                            <span class="status-main">Verified</span>
                            <span class="status-sub">0x12345......967</span>
                        </div>
                    </div>
                </div>
                <div class="validation-item">
                    <div class="sub-label">Blockchain Status:</div>
                    <div class="status-flex green">
                        <i class="fa-solid fa-circle-check status-icon"></i>
                        <span class="status-main">Submitted to Blockchain</span>
                    </div>
                </div>
            </div>`;
    }
    btnContainer.innerHTML = '<button class="btn-qr-code" onclick="openQrModal()">Generate QR Code</button>';
}

function finishQrSequence() {
    closeQrModal();
    const statusPill = document.getElementById('status-pill');
    if (statusPill.classList.contains('released')) {
        btnContainer.innerHTML = '<button class="btn-qr-view" onclick="openQrModal()">QR Code</button>';
    } else {
        btnContainer.innerHTML = `
            <button class="btn-qr-view" onclick="openQrModal()">QR Code</button>
            <button class="btn-release" onclick="openReleaseModal()">Release Document</button>
        `;
    }
}

function finalReleaseAction() {
    if (!releaseCheck.checked) return;
    closeReleaseModal();
    
    const statusPill = document.getElementById('status-pill');
    statusPill.textContent = "RELEASED";
    statusPill.className = "status-pill released"; 
    statusPill.style.backgroundColor = ""; statusPill.style.color = "";

    btnContainer.innerHTML = '<button class="btn-qr-view" onclick="openQrModal()">QR Code</button>';
}

// Updated Open Upload with Resets
function openUploadModal() { 
    uploadModal.classList.add('show'); 
    if(uploadConfirmCheck) uploadConfirmCheck.checked = false;
    if(uploadConfirmBtn) uploadConfirmBtn.disabled = true;
}
function closeUploadModal() { uploadModal.classList.remove('show'); }

function openHashModal() { hashModal.classList.add('show'); }
function closeHashModal() { hashModal.classList.remove('show'); }

function openBlockchainModal() { 
    blockchainModal.classList.add('show');
    if(confirmCheck) confirmCheck.checked = false;
    if(blockchainSubmitBtn) blockchainSubmitBtn.disabled = true;
}
function closeBlockchainModal() { blockchainModal.classList.remove('show'); }

function openQrModal() { qrModal.classList.add('show'); }
function closeQrModal() { qrModal.classList.remove('show'); }

function openReleaseModal() { 
    releaseModal.classList.add('show'); 
    if(releaseCheck) releaseCheck.checked = false;
    if(releaseConfirmBtn) releaseConfirmBtn.disabled = true;
}
function closeReleaseModal() { releaseModal.classList.remove('show'); }

function openRejectModal() { 
    rejectModal.classList.add('show');
    if(rejectRefundCheck) rejectRefundCheck.checked = false;
    if(rejectConfirmBtn) rejectConfirmBtn.disabled = true;
    if(rejectReasonDropdown) rejectReasonDropdown.selectedIndex = 0;
    if(rejectTextInput) {
        rejectTextInput.value = "";
        rejectTextInput.disabled = true;
    }
}
function closeRejectModal() { rejectModal.classList.remove('show'); }

// Listener for Upload Confirmation Checkbox
if (uploadConfirmCheck) {
    uploadConfirmCheck.addEventListener('change', function() {
        uploadConfirmBtn.disabled = !this.checked;
    });
}

// Listener for Blockchain Checkbox
if (confirmCheck) {
    confirmCheck.addEventListener('change', function() {
        blockchainSubmitBtn.disabled = !this.checked;
    });
}

// Listener for Release Checkbox
if (releaseCheck) {
    releaseCheck.addEventListener('change', function() {
        releaseConfirmBtn.disabled = !this.checked;
    });
}

// Listener for Refund/Reject Checkbox
if (rejectRefundCheck) {
    rejectRefundCheck.addEventListener('change', function() {
        rejectConfirmBtn.disabled = !this.checked;
    });
}

// Listener for Dropdown Others in Reject
if (rejectReasonDropdown) {
    rejectReasonDropdown.addEventListener('change', function() {
        if (this.value === 'other') {
            rejectTextInput.disabled = false;
            rejectTextInput.focus();
        } else {
            rejectTextInput.disabled = true;
            rejectTextInput.value = ""; 
        }
    });
}

// Close Modals
window.onclick = function(event) {
    const profile = document.querySelector(".profile-container");
    const menu = document.getElementById("profileMenu");
    if (menu && profile && !profile.contains(event.target)) menu.classList.remove("show");

    if (event.target == uploadModal) closeUploadModal();
    if (event.target == hashModal) closeHashModal();
    if (event.target == blockchainModal) closeBlockchainModal();
    if (event.target == qrModal) closeQrModal();
    if (event.target == releaseModal) closeReleaseModal();
    if (event.target == rejectModal) closeRejectModal();
}