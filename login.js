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
        let user = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            userGender: maleGender.checked ? "Male" : femaleGender.checked ? "Female" : "",
            address: address.value,
            age: age.value
        };

        if (!user.email) {
            return alert("Email is required");
        } else if (!user.firstname) {
            return alert("Firstname is required");
        } else if (!user.lastname) {
            return alert("Lastname is required");
        } else if (!user.password) {
            return alert("Password is required");
        }

        localStorage.setItem("user", JSON.stringify(user));

        console.log("User registered", user);
    }

    btnRegister.addEventListener("click", () => {
        registerUser();
    });
}

