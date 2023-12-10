let btnRegister = document.querySelector("#btnRegister");

if (btnRegister) {

    function registerUser() {
        let firstname = document.querySelector("#firstname");
        let lastname = document.querySelector("#lastname");
        let email = document.querySelector("#email");
        let password = document.querySelector("#password");
        let maleGender = document.querySelector("#maleGender");
        let femaleGender = document.querySelector("#femaleGender");
        let otherGender = document.querySelector("#otherGender");
        let address = document.querySelector("#homeaddress");
        let age = document.querySelector("#age");
    
        // Load existing users from local storage
        let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
        let user = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            userGender: maleGender.checked ? "Male" : femaleGender.checked ? "Female" : "",
            address: address.value,
            age: age.value
        };
    
        if (!user.email || !user.firstname || !user.lastname || !user.password) {
            return alert("Please fill in all required fields.");
        }
    
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            return alert("Please enter a valid email address.");
        }
    
        // Check if the email is already registered
        if (existingUsers.some(u => u.email === user.email)) {
            return alert("Email already registered. Please choose a different email.");
        }
    
        // Add the new user to the existing users array
        existingUsers.push(user);
    
        // Save the updated users array back to local storage
        localStorage.setItem("users", JSON.stringify(existingUsers));
    
        console.log("User registered", user);
    
        // Clear the text fields
        firstname.value = "";
        lastname.value = "";
        email.value = "";
        password.value = "";
        maleGender.checked = false;
        femaleGender.checked = false;
        otherGender.checked = false;
        address.value = "";
        age.value = "";
    
        // Close the modal
        let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.hide();
    }
    

    btnRegister.addEventListener("click", () => {
        registerUser();
    });
}
let btnLogin = document.querySelector("#btnLogin");

if (btnLogin) {
    function authenticateUser(email, password) {
        // Load existing users from local storage
        let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Find the user with the provided email
        let user = existingUsers.find(u => u.email === email);

        // Check if the user was found and if the password matches
        return user && user.password === password;
    }

    function loginUser() {
        let loginEmail = document.querySelector("#form2Example18");
        let loginPassword = document.querySelector("#form2Example28");
    
        // Validate that email and password are not empty
        if (!loginEmail.value || !loginPassword.value) {
            return alert("Please enter both email and password.");
        }
    
        // Authenticate the user
        let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        let user = existingUsers.find(u => u.email === loginEmail.value && u.password === loginPassword.value);
    
        if (user) {
            alert("Login successful!");
    
            // Store the user information in local storage
            localStorage.setItem("loggedInUser", JSON.stringify(user));
    
            // Redirect to the profile page or perform other actions as needed
            window.location.href = "../profile/profile.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    }

    // Attach the loginUser function to the form submission event
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        loginUser();
    });
}
