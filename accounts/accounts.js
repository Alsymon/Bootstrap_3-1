document.addEventListener("DOMContentLoaded", function () {
    renderTable();

    // Attach the event listener to the "Save Changes" button
    const saveChangesButton = document.getElementById('saveChangesButton');
    saveChangesButton.addEventListener('click', saveAllChanges);


    const editEmailInput = document.getElementById("editEmail");
    editEmailInput.addEventListener('input', validateEmail);
});
function renderTable() {
    const tableBody = document.getElementById('accountTableBody');
    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    tableBody.innerHTML = ''; // Clear existing rows

    existingUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.firstname} ${user.lastname}</td>
            <td>${user.email}</td>
            <td class="password-cell">
            ${user.password ? `<span class="hidden-password">${user.password}</span>` : ''}
            ${user.password ? `<button class="btn btn-link toggle-password" onclick="togglePassword(this)">Show</button>` : ''}
        </td>
            <td>${user.address}</td>
            <td>${user.age}</td>
            <td>${user.userGender}</td>

            <td>
                <button button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                <button class="btn btn-danger" onclick="deleteAccount(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function togglePassword(button) {
    const passwordCell = button.parentElement;
    const hiddenPassword = passwordCell.querySelector('.hidden-password');

    if (hiddenPassword.style.display === 'none') {
        hiddenPassword.style.display = 'inline';
        button.textContent = 'Hide';
    } else {
        hiddenPassword.style.display = 'none';
        button.textContent = 'Show';
    }
}
  
function editAccount(index) {
    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Assuming you have a form with id "editForm" and input fields with appropriate IDs
    document.getElementById("editFirstname").value = existingUsers[index].firstname;
    document.getElementById("editLastname").value = existingUsers[index].lastname;
    document.getElementById("editPassword").value = existingUsers[index].password;
    document.getElementById("editAge").value = existingUsers[index].age;
    document.getElementById("editAddress").value = existingUsers[index].address;
    document.getElementById("editEmail").value = existingUsers[index].email;


    // Assuming you have radio buttons for gender with ids "editMaleGender", "editFemaleGender", etc.
    let gender = existingUsers[index].userGender;
    document.getElementById(`edit${gender}Gender`).checked = true;

    // Show the edit form
    document.getElementById("editForm").style.display = "block";
}
function saveAllChanges() {
    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < existingUsers.length; i++) {
        let editFirstname = document.getElementById("editFirstname");
        let editLastname = document.getElementById("editLastname");
        let editAge = document.getElementById("editAge");
        let editAddress = document.getElementById("editAddress");
        let editEmail = document.getElementById("editEmail");
        let editPassword = document.getElementById("editPassword");

        // Check if the elements exist before accessing their values
        if (editFirstname && editLastname && editAge && editAddress && editEmail && editPassword) {
            existingUsers[i].firstname = editFirstname.value;
            existingUsers[i].lastname = editLastname.value;
            existingUsers[i].age = editAge.value;
            existingUsers[i].address = editAddress.value;
            existingUsers[i].email = editEmail.value;
            existingUsers[i].password = editPassword.value;

            // Assuming you have radio buttons for gender with ids "editMaleGender", "editFemaleGender", etc.
            existingUsers[i].userGender = document.querySelector('input[name="editGender"]:checked').value;
        }
    }

    // Save the updated array back to local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));
    document.getElementById("editFirstname").value = '';
    document.getElementById("editLastname").value = '';
    document.getElementById("editAge").value = '';
    document.getElementById("editAddress").value = '';
    document.getElementById("editEmail").value = '';
    document.getElementById("editPassword").value = '';
    
    // Clear the selected radio button for gender
    const genderRadios = document.querySelectorAll('input[name="editGender"]');
    genderRadios.forEach(radio => radio.checked = false);

    // Hide the modal using Bootstrap's modal method
    $('#editModal').modal('hide');


    // Refresh the table or perform other actions as needed
    renderTable();
}
  
  function deleteAccount(index) {
    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
    // Implement your logic to delete the user from the array
    existingUsers.splice(index, 1);
  
    // Save the updated array back to local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));
  
    // Check if there are no more users
    if (existingUsers.length === 0) {
      // Log out the user by removing the loggedInUser key from local storage
      localStorage.removeItem("loggedInUser");
  
      // Redirect to the login page or perform other actions as needed
      window.location.href = "../login/login.html";
    }
  
    // Refresh the table after deletion
    renderTable();
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

function validateEmail() {
    const emailInput = document.getElementById("editEmail");
    const emailValidationError = document.getElementById("emailValidationError");
    const saveChangesButton = document.getElementById('saveChangesButton');

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailInput.value)) {
        emailValidationError.style.display = "block";
        saveChangesButton.disabled = true; // Disable the button if the email is not valid
    } else {
        emailValidationError.style.display = "none";
        saveChangesButton.disabled = false; // Enable the button if the email is valid
    }
}
