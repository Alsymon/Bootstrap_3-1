const cartData = JSON.parse(localStorage.getItem('cart')) || {};
let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
let selectedProduct;

function openModal(index) {
    console.log("Opening modal for index:", index);
    selectedProduct = storedProducts[index];
    $('#myModal').modal('show');
    document.getElementById('productName').textContent = `Product: ${selectedProduct.name}`;
    updateTotal();
}

function closeModal() {
    $('#myModal').modal('hide');
}

function updateTotal() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const totalPrice = (quantity * selectedProduct.price).toFixed(2);
    document.getElementById('totalPrice').textContent = totalPrice;
}

function addToCartFromModal() {
    console.log("Adding to cart from modal:", selectedProduct);

    if (!selectedProduct) {
        console.error("Invalid selectedProduct");
        return;
    }
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(document.getElementById('quantity').value);

    if (isNaN(quantity) || quantity < 1) {
        alert('Please enter a valid quantity.');
        return;
    }

    const cartItemId = `${selectedProduct.name}_${new Date().getTime()}`;

    if (cartData[cartItemId]) {
        cartData[cartItemId].quantity += quantity;
    } else {
        cartData[cartItemId] = {
            id: cartItemId, // Use the generated cartItemId as the id
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: quantity,
            imageUrl: selectedProduct.imageUrl
        };
    }

    localStorage.setItem('cart', JSON.stringify(cartData));
    updateCartDisplay();
    closeModal();
    alert('Item added to the cart successfully!');

    // Reset the quantity input field to 1
    quantityInput.value = 1;
}




function increaseQuantity(cartItemId) {
    if (cartData[cartItemId]) {
        cartData[cartItemId].quantity += 1;
        updateCartItem(cartItemId);
    }
}

function decreaseQuantity(cartItemId) {
    if (cartData[cartItemId] && cartData[cartItemId].quantity > 1) {
        cartData[cartItemId].quantity -= 1;
        updateCartItem(cartItemId);
    }
}

function updateCartItem(cartItemId) {
    localStorage.setItem('cart', JSON.stringify(cartData));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalCartPrice = 0;

    for (const cartItemId in cartData) {
        const cartItem = cartData[cartItemId];
        const total = (cartItem.quantity * cartItem.price).toFixed(2);

        totalCartPrice += parseFloat(total);

        const productElement = document.createElement('div');
        productElement.className = 'row3 card mb-3';

        productElement.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4 img-box">
                    <img src="${cartItem.imageUrl}" alt="${cartItem.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${cartItem.name}</h5>
                        <p class="card-text">Price: ₱${cartItem.price.toFixed(2)}</p>
                    </div>
                    <div>
                        <div class="d-flex flex-column align-items-center">
                            <button class="btn btn-danger mb-2" onclick="deleteFromCart('${cartItemId}')">Remove</button>
                        </div>
                        <div class="d-flex flex-column align-items-center">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-outline-danger" onclick="decreaseQuantity('${cartItemId}')">-</button>
                                <span class="mx-2">${cartItem.quantity}</span>
                                <button type="button" class="btn btn-outline-success" onclick="increaseQuantity('${cartItemId}')">+</button>
                            </div>
                        </div>
                        <p class="card-text">Total: ₱${total}</p> <!-- Added line to display total price -->
                    </div>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(productElement);
    }

    // Update the total cart price
    document.getElementById('totalCartPrice').textContent = `Total Cart Price: ₱${totalCartPrice.toFixed(2)}`;
}

// Initial cart display
updateCartDisplay();

function deleteFromCart(productId) {
    // Remove the product from the cart
    if (cartData[productId]) {
        delete cartData[productId];
        localStorage.setItem('cart', JSON.stringify(cartData));
        updateCartDisplay();
    }
}

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
                            <p>Price:<button type="button" class="btn btn-dark">₱${product.price.toFixed(2)}</button></p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <div class="d-flex flex-column align-items-center mb-3">
                                <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete Product</button>
                                <button type="button" class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#updateProductModal" onclick="populateUpdateModal(${index})">Update Product</button>
                            </div>
                            <div class="d-flex flex-column align-items-center">
                            <button type="button" class="btn btn-outline-success" onclick="openModal(${index})">Add to Cart</button>
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
        window.location.href = '../login/login.html';
    }
    
    // Example of using the logoutUser function with a logout link
    let logoutLink = document.querySelector('.login');
    
    if (logoutLink) {
        logoutLink.addEventListener('click', logoutUser);
    }
