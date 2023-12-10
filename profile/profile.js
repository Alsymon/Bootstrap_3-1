document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the logged-in user from local storage
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

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
