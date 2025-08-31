// Avatar upload functionality
const avatarUploadArea = document.getElementById('avatarUploadArea');
const uploadPlaceholder = document.getElementById('uploadPlaceholder');
const avatarPreview = document.getElementById('avatarPreview');
const previewImage = document.getElementById('previewImage');
const removeBtn = document.getElementById('removeBtn');
const changeBtn = document.getElementById('changeBtn');
const fileInput = document.createElement('input');

fileInput.type = 'file';
fileInput.accept = 'image/jpeg,image/jpg,image/png';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

// Click to upload
avatarUploadArea.addEventListener('click', () => {
  if (uploadPlaceholder.style.display !== 'none') {
    fileInput.click();
  }
});

// Drag and drop functionality
avatarUploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  avatarUploadArea.style.borderColor = '#f57463';
  avatarUploadArea.style.background = 'rgba(245, 116, 99, 0.2)';
});

avatarUploadArea.addEventListener('dragleave', (e) => {
  e.preventDefault();
  avatarUploadArea.style.borderColor = '#d1d0d5';
  avatarUploadArea.style.background = 'rgba(255, 255, 255, 0.05)';
});

avatarUploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  avatarUploadArea.style.borderColor = '#d1d0d5';
  avatarUploadArea.style.background = 'rgba(255, 255, 255, 0.05)';
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
});

// File input change
fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleFile(e.target.files[0]);
  }
});

// Handle uploaded file
function handleFile(file) {
  // Check file type
  if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
    alert('Please upload a JPG or PNG image.');
    return;
  }

  // Check file size (500KB = 512000 bytes)
  if (file.size > 512000) {
    alert('File size must be less than 500KB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    previewImage.src = e.target.result;
    uploadPlaceholder.style.display = 'none';
    avatarPreview.style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

// Remove image
removeBtn.addEventListener('click', () => {
  previewImage.src = '';
  avatarPreview.style.display = 'none';
  uploadPlaceholder.style.display = 'flex';
  fileInput.value = '';
});

// Change image
changeBtn.addEventListener('click', () => {
  fileInput.click();
});

// Form validation functionality
const form = document.querySelector('.registration-form');
const fullNameInput = document.getElementById('fullNameInput');
const emailInput = document.getElementById('emailInput');
const githubInput = document.getElementById('githubInput');
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const githubError = document.getElementById('githubError');

// Validation functions
function validateFullName(name) {
  const trimmedName = name.trim();
  const nameParts = trimmedName.split(' ').filter(part => part.length > 0);
  
  if (trimmedName.length === 0) {
    return { isValid: false, message: 'Full name is required' };
  }
  
  if (nameParts.length < 2) {
    return { isValid: false, message: 'Please enter both first name and last name' };
  }
  
  if (nameParts.some(part => part.length < 2)) {
    return { isValid: false, message: 'Each name part must be at least 2 characters' };
  }
  
  return { isValid: true, message: '' };
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email.length === 0) {
    return { isValid: false, message: 'Email address is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
}

function validateGitHubUsername(username) {
  const trimmedUsername = username.trim();
  
  if (trimmedUsername.length === 0) {
    return { isValid: false, message: 'GitHub username is required' };
  }
  
  if (!trimmedUsername.startsWith('@')) {
    return { isValid: false, message: 'GitHub username must start with @' };
  }
  
  if (trimmedUsername.length < 2) {
    return { isValid: false, message: 'GitHub username must be at least 2 characters' };
  }
  
  return { isValid: true, message: '' };
}

// Show/hide error messages
function showError(inputElement, errorElement, message) {
  inputElement.classList.remove('valid');
  inputElement.classList.add('error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function hideError(inputElement, errorElement) {
  inputElement.classList.remove('error');
  errorElement.style.display = 'none';
}

function showValid(inputElement) {
  inputElement.classList.remove('error');
  inputElement.classList.add('valid');
}

// Clear all error messages
function clearAllErrors() {
  hideError(fullNameInput, fullNameError);
  hideError(emailInput, emailError);
  hideError(githubInput, githubError);
}

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Clear any previous error messages
  clearAllErrors();
  
  // Validate all fields
  const fullNameValidation = validateFullName(fullNameInput.value);
  const emailValidation = validateEmail(emailInput.value);
  const githubValidation = validateGitHubUsername(githubInput.value);
  
  let hasErrors = false;
  
  if (!fullNameValidation.isValid) {
    showError(fullNameInput, fullNameError, fullNameValidation.message);
    hasErrors = true;
  }
  
  if (!emailValidation.isValid) {
    showError(emailInput, emailError, emailValidation.message);
    hasErrors = true;
  }
  
  if (!githubValidation.isValid) {
    showError(githubInput, githubError, githubValidation.message);
    hasErrors = true;
  }
  
  if (hasErrors) {
    return;
  }
  
  // Check if avatar is uploaded
  if (avatarPreview.style.display === 'none') {
    alert('Please upload an avatar image');
    return;
  }
  
  // All validation passed - proceed with form submission
  generateTicket();
});

// Generate ticket function
function generateTicket() {
  // Hide the form
  const formContainer = document.querySelector('.form-container');
  formContainer.style.display = 'none';
  
  // Hide the hero section
  const heroSection = document.querySelector('.hero-section');
  heroSection.style.display = 'none';
  
  // Show the ticket
  const ticketContainer = document.getElementById('ticketContainer');
  ticketContainer.style.display = 'block';
  
  // Populate ticket with user data
  document.getElementById('ticketUserName').textContent = fullNameInput.value;
  document.getElementById('congratsName').textContent = fullNameInput.value;
  document.getElementById('ticketEmail').textContent = emailInput.value;
  document.getElementById('ticketGitHub').textContent = githubInput.value;
  document.getElementById('ticketAvatar').src = previewImage.src;
  
  // Generate random ticket number
  const ticketNumber = generateTicketNumber();
  document.getElementById('ticketNumber').textContent = ticketNumber;
  
  // Log success
  console.log('Ticket generated successfully:', {
    fullName: fullNameInput.value,
    email: emailInput.value,
    githubUsername: githubInput.value,
    avatarUploaded: true,
    ticketNumber: ticketNumber
  });
}

// Generate random ticket number
function generateTicketNumber() {
  const randomNum = Math.floor(Math.random() * 100000);
  return `#${randomNum.toString().padStart(5, '0')}`;
}
