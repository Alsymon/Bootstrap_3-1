document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the logged-in user from local storage
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(loggedInUser); // Log the user object

    // Check if a user is logged in
    if (loggedInUser) {
        // Populate the profile page with the user information
        document.querySelector("#fullName").value = `${loggedInUser.firstname} ${loggedInUser.lastname}`;
        document.querySelector("#email").value = loggedInUser.email;
        document.querySelector("#currentAddress").value = loggedInUser.address;
        document.querySelector("#gender").value = loggedInUser.userGender;
    } else {
        // Redirect to the login page if no user is logged in
        window.location.href = "../login/login.html";
    }
});

function editUserInformation() {
    // Get the values from the input fields
    var fullName = document.getElementById('edit-fullName').value;
    var email = document.getElementById('edit-email').value;
    var currentAddress = document.getElementById('edit-currentAddress').value;

    // Update the profile information on the page
    document.getElementById('fullName').value = `${fullName.split(' ')[0]} ${fullName.split(' ')[1]}`;
    document.getElementById('email').value = email;
    document.getElementById('currentAddress').value = currentAddress;

    // Update local storage
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        // Update user information
        loggedInUser.firstname = fullName.split(' ')[0];
        loggedInUser.lastname = fullName.split(' ')[1];
        loggedInUser.email = email;
        loggedInUser.address = currentAddress;

        // Save the updated user information to local storage
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        // Clear the input fields
        document.getElementById('edit-fullName').value = "";
        document.getElementById('edit-email').value = "";
        document.getElementById('edit-currentAddress').value = "";

        // Close the modal (assuming you are using Bootstrap modal)
        $('#edit-modal').modal('hide');
    } else {
        // Handle the case where no user is logged in
        console.error("No user is logged in.");
    }
}
function logoutUser() {
    // Remove the logged-in user information from local storage
    localStorage.removeItem('loggedInUser');
    alert('Logout Successful.');
    // Redirect to the login page
    window.location.href = '../login/login.html';

}

// Example of using the logoutUser function with a logout link
let logoutLink = document.querySelector('.login');

if (logoutLink) {
    logoutLink.addEventListener('click', logoutUser);
}