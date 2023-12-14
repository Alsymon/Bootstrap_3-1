const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

// Display existing products on page load
displayProducts();


function addProduct() {
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const fileInput = document.getElementById('fileInput');
  const productImage = fileInput.files[0];

  if (!productName || !productPrice || !productImage) {
    alert('Please fill in all fields.');
    return;
  }

  // Assuming productPrice is a number, you may want to validate it further

  // Add the new product to the array
  storedProducts.push({
    name: productName,
    price: parseFloat(productPrice),
    imageUrl: URL.createObjectURL(productImage) // Create a URL for the selected image
  });

  // Save the updated products array to local storage
  localStorage.setItem('products', JSON.stringify(storedProducts));

  // Clear form fields
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
     fileInput.value = '';

  // Display the updated list of products
  displayProducts();
}

function displayProducts() {
    const productRow3Container = document.querySelector('.productRow3');
    
    // Check if there are no products
    if (storedProducts.length === 0) {
        productRow3Container.style.display = 'none';
    } else {
        productRow3Container.style.display = 'flex';
        productRow3Container.innerHTML = ''; // Clear existing content

        // Loop through the products and create a new row3 for each product
        storedProducts.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.className = 'row3';
            productElement.innerHTML = `
            <div class="img-box">
            <img src="${product.imageUrl}" width="30%" height="100%" alt="${product.name}">
            <div class="card-body">
                        <h4>${product.name}</h4>		
                        <div class="card-footer d-flex justify-content-between">
                        <p>Price: <button type="button" class="btn btn-dark">₱${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}</button></p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <div class="d-flex flex-column align-items-center mb-3">
                                <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete Product</button>
                                <button type="button" class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#updateProductModal" onclick="populateUpdateModal(${index})">Update Product</button>                                   
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <button type="button" class="btn btn-outline-success">Add to Cart</button>
                                <button type="button" class="btn btn-outline-success mt-2" data-bs-toggle="modal" data-bs-target="#productInfoModal${index + 1}">See Info</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append the new row3 to the productRow3 container
            productRow3Container.appendChild(productElement);
        });
    
    }
}
  // Call the function to display products
  displayProducts();

// The rest of your code for deleting and updating products remains unchanged

function deleteProduct(index) {
    // Remove the product at the specified index
    storedProducts.splice(index, 1);
  
    // Save the updated products array to local storage
    localStorage.setItem('products', JSON.stringify(storedProducts));
  
    // Display the updated products
    displayProducts();
  }
let deleteButtons = document.querySelectorAll(".btn-danger");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            let productCard = button.closest(".row1, .row2, .row3");

            if (productCard) {
                productCard.remove();

            }
        });
    });
    document.addEventListener("DOMContentLoaded", function () {
        // Retrieve the logged-in user from local storage
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        console.log(loggedInUser); // Log the user object
    
        // Check if a user is logged in
        if (loggedInUser) {
            // Populate the profile page with the user information
            document.querySelector("#fullName").value = `${loggedInUser.firstname} ${loggedInUser.lastname}`;

        } else {
            // Redirect to the login page if no user is logged in
            window.location.href = "login/login.html";
        }
    });

    function logoutUser() {
        // Remove the logged-in user information from local storage
        localStorage.removeItem('loggedInUser');
        alert('Logout Successful.');
        // Redirect to the login page
        window.location.href = 'login/login.html';
    }
    
    // Example of using the logoutUser function with a logout link
    let logoutLink = document.querySelector('.login');
    
    if (logoutLink) {
        logoutLink.addEventListener('click', logoutUser);
    }

    function populateUpdateModal(index) {
        const product = storedProducts[index];
    
        // Populate the modal fields based on the product details
        document.getElementById('updatedProductIndex').value = index;
        document.getElementById('updatedProductName').value = product.name;
        document.getElementById('updatedProductPrice').value = product.price;
        document.getElementById('updatedFileInput').value = ''; // Clear file input
    }
    
    function updateProduct() {
        const updatedProductIndex = document.getElementById('updatedProductIndex').value;
        const updatedProductName = document.getElementById('updatedProductName').value;
        const updatedProductPrice = document.getElementById('updatedProductPrice').value;
        const updatedProductImage = document.getElementById('updatedFileInput').files[0];
    
        if (updatedProductIndex !== '' && !isNaN(updatedProductIndex)) {
            const index = parseInt(updatedProductIndex);
    
            // Update the product details
            storedProducts[index].name = updatedProductName;
            storedProducts[index].price = parseFloat(updatedProductPrice);
    
            // Update the image only if a new image is selected
            if (updatedProductImage) {
                storedProducts[index].imageUrl = URL.createObjectURL(updatedProductImage);
            }
    
            // Save the updated products array to local storage
            localStorage.setItem('products', JSON.stringify(storedProducts));
    
            // Display the updated list of products
            displayProducts();
    
            // Close the update product modal
            $('#updateProductModal').modal('hide');
        } else {
            alert('Invalid product index.');
        }
    }