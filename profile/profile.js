// Function to save user information to Local Storage
function saveUserInformation() {
    // Get input values
    var fullName = document.getElementById('edit-fullName').value;
    var email = document.getElementById('edit-email').value;
    var currentAddress = document.getElementById('edit-currentAddress').value;
    var gender = document.querySelector('input[name="edit-gender"]:checked').value;
    var dob = document.getElementById('edit-dob').value;

    // Save user information to Local Storage
    localStorage.setItem('userFullName', fullName);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userCurrentAddress', currentAddress);
    localStorage.setItem('userGender', gender);
    localStorage.setItem('userDob', dob);

    // Update the displayed user information
    updateUserInfo();

    // Close the edit modal
    $('#edit-modal').modal('hide');
}

// Function to update user information on the page
function updateUserInfo() {
    // Get elements
    var fullNameElement = document.getElementById('fullName');
    var emailElement = document.getElementById('email');
    var currentAddressElement = document.getElementById('currentAddress');
    var genderElement = document.getElementById('gender');
    var dobElement = document.getElementById('dob');

    // Get user information from Local Storage
    var storedFullName = localStorage.getItem('userFullName');
    var storedEmail = localStorage.getItem('userEmail');
    var storedCurrentAddress = localStorage.getItem('userAddress');
    var storedGender = localStorage.getItem('userGender');
    var storedDob = localStorage.getItem('userBirthday');

        // Update elements with user information
        fullNameElement.textContent = storedFullName;
        emailElement.textContent = storedEmail;
        currentAddressElement.textContent = storedCurrentAddress;
        genderElement.textContent = storedGender;
        dobElement.textContent = storedDob;
    }
  
    // Function to handle editing user information
    function editUserInformation() {
        // Get input values
        var fullName = document.getElementById('edit-fullName').value;
        var email = document.getElementById('edit-email').value;
        var currentAddress = document.getElementById('edit-currentAddress').value;

       // Update user information in Local Storage if values are not empty
       if (fullName.trim() !== '') {
        localStorage.setItem('userFullName', fullName.trim());
    }
    if (email.trim() !== '') {
        localStorage.setItem('userEmail', email.trim());
    }
    if (currentAddress.trim() !== '') {
        localStorage.setItem('userCurrentAddress', currentAddress.trim());
    }

    // Update the displayed user information
    updateUserInfo();

    // Close the edit modal
    $('#edit-modal').modal('hide');
}

// Function to initialize the edit modal with current user information
function initializeEditModal() {
    // Get user information from Local Storage
    var storedFullName = localStorage.getItem('userFullName');
    var storedEmail = localStorage.getItem('userEmail');
    var storedCurrentAddress = localStorage.getItem('userCurrentAddress');


    // Set input values in the edit modal
    document.getElementById('edit-fullName').value = storedFullName;
    document.getElementById('edit-email').value = storedEmail;
    document.getElementById('edit-currentAddress').value = storedCurrentAddress;
}

// Function to handle deleting user information
function deleteUserInformation() {
    // Get the entered password
    var enteredPassword = prompt('Enter your password to confirm account deletion:');

    // Check if entered password matches the stored password
    var storedPassword = localStorage.getItem('userPassword');
    if (enteredPassword === storedPassword) {
        // Passwords match, delete the account
        localStorage.clear();

        window.location.href = '../Login/Login.html'; 

        // Update the displayed user information (which will now be empty)
        updateUserInfo();

        // Close the delete modal
        $('#delete-modal').modal('hide');

        alert('Account deleted successfully.');
    } else {
        // Passwords do not match, show an alert
        alert('Incorrect password. Account deletion canceled.');
    }
}

// Function to initialize user information on page load
function initializeUserInfo() {
    // Check if user information is already stored in Local Storage
    if (localStorage.getItem('userFullName')) {
        // If yes, update the displayed user information
        updateUserInfo();
    }
}

// Call the initialize function when the page loads
window.onload = initializeUserInfo;