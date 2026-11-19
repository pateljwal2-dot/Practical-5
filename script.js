const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const dobInput = document.getElementById("dob");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const emergencyInput = document.getElementById("emergencyContact");
const addressInput = document.getElementById("address");

const successMessage = document.getElementById("successMessage");

// Regular expressions
const nameRegex = /^[A-Za-z\s]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,30}$/;

// Error message function
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Clear all error messages
function clearErrors() {
    document.querySelectorAll("small").forEach(error => {
        error.textContent = "";
    });

    successMessage.textContent = "";
}

// Name validation
function validateName() {
    const name = nameInput.value.trim();

    if (name === "") {
        showError("nameError", "Name is required.");
        return false;
    }

    if (!nameRegex.test(name)) {
        showError("nameError", "Enter a valid name using letters only.");
        return false;
    }

    nameInput.value = name;
    return true;
}

// Email validation
function validateEmail() {
    const email = emailInput.value.trim();

    if (email === "") {
        showError("emailError", "Email is required.");
        return false;
    }

    if (!emailRegex.test(email)) {
        showError("emailError", "Enter a valid email address.");
        return false;
    }

    emailInput.value = email;
    return true;
}

// Mobile validation
function validateMobile() {
    const mobile = mobileInput.value.trim();

    if (mobile === "") {
        showError("mobileError", "Mobile number is required.");
        return false;
    }

    if (!mobileRegex.test(mobile)) {
        showError("mobileError", "Enter a valid 10-digit Indian mobile number.");
        return false;
    }

    return true;
}

// Date of birth validation
function validateDOB() {
    const dob = dobInput.value;

    if (dob === "") {
        showError("dobError", "Date of birth is required.");
        return false;
    }

    const selectedDate = new Date(dob);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
        showError("dobError", "Date of birth must be in the past.");
        return false;
    }

    return true;
}

// Gender validation
function validateGender() {
    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    if (!gender) {
        showError("genderError", "Please select your gender.");
        return false;
    }

    return true;
}

// Blood group validation
function validateBloodGroup() {
    const bloodGroup = document.getElementById("bloodGroup").value;

    if (bloodGroup === "") {
        showError("bloodError", "Please select your blood group.");
        return false;
    }

    return true;
}

// Address validation
function validateAddress() {
    const address = addressInput.value.trim();

    if (address === "") {
        showError("addressError", "Address is required.");
        return false;
    }

    if (address.length < 10) {
        showError("addressError", "Address must contain at least 10 characters.");
        return false;
    }

    addressInput.value = address;
    return true;
}

// Password validation
function validatePassword() {
    const password = passwordInput.value;

    if (password === "") {
        showError("passwordError", "Password is required.");
        return false;
    }

    if (!passwordRegex.test(password)) {
        showError(
            "passwordError",
            "Password must contain uppercase, lowercase, number and special character."
        );

        return false;
    }

    return true;
}

// Confirm password validation
function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === "") {
        showError("confirmError", "Please confirm your password.");
        return false;
    }

    if (password !== confirmPassword) {
        showError("confirmError", "Passwords do not match.");
        return false;
    }

    return true;
}

// Emergency contact validation
function validateEmergencyContact() {
    const contact = emergencyInput.value.trim();

    if (contact === "") {
        showError("emergencyError", "Emergency contact is required.");
        return false;
    }

    if (!mobileRegex.test(contact)) {
        showError("emergencyError", "Enter a valid 10-digit number.");
        return false;
    }

    return true;
}

// Department validation
function validateDepartment() {
    const department = document.getElementById("department").value;

    if (department === "") {
        showError("departmentError", "Please select a department.");
        return false;
    }

    return true;
}

// File validation
function validateDocument() {
    const fileInput = document.getElementById("document");

    if (fileInput.files.length === 0) {
        return true;
    }

    const file = fileInput.files[0];
    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {
        showError("documentError", "Only PDF, JPG and PNG files are allowed.");
        return false;
    }

    if (file.size > 2 * 1024 * 1024) {
        showError("documentError", "File size must be below 2 MB.");
        return false;
    }

    return true;
}

// Terms validation
function validateTerms() {
    const terms = document.getElementById("terms");

    if (!terms.checked) {
        showError("termsError", "Please accept the terms and conditions.");
        return false;
    }

    return true;
}

// Form submission
form.addEventListener("submit", function(event) {

    event.preventDefault();

    clearErrors();

    const isValid =
        validateName() &&
        validateEmail() &&
        validateMobile() &&
        validateDOB() &&
        validateGender() &&
        validateBloodGroup() &&
        validateAddress() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateEmergencyContact() &&
        validateDepartment() &&
        validateDocument() &&
        validateTerms();

    if (isValid) {

        successMessage.textContent =
            "Patient registration completed successfully!";

        alert("Registration Successful!");

        form.reset();
    }
});

// Reset form
form.addEventListener("reset", function() {

    setTimeout(() => {
        clearErrors();
    }, 0);
});