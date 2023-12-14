const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
let cartData = JSON.parse(localStorage.getItem('cart')) || {}; // Declare cartData

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
  $('#yourModalId').modal('hide');
  alert('Product added successfully!');
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
                        <div class="d-flex flex-column align-items-center">
                        <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#quantityModal" onclick="setSelectedProduct(${index})">Buy</button>
                        </div>
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
    alert('Deleted successfully!');
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
            alert('Updated successfully!');
        } else {
            alert('Invalid product index.');
        }
    }
    
function setSelectedProduct(index) {
    selectedProduct = storedProducts[index];

    document.getElementById('modalProductName').textContent = selectedProduct.name;
    document.getElementById('modalProductPrice').textContent = selectedProduct.price.toFixed(2);

    document.getElementById('modalTotalPrice').textContent = '0.00';

    // Add an event listener to the quantity input
    const quantityInput = document.getElementById('quantityInput');
    quantityInput.value = 1;  // Set a default value
    quantityInput.addEventListener('input', updateTotalPrice);
}

function updateTotalPrice() {
    const quantityInput = document.getElementById('quantityInput');
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
        // Handle invalid input (optional)
        document.getElementById('modalTotalPrice').textContent = '0.00';
        return;
    }

    // Update the total price based on the quantity
    const totalPrice = (quantity * selectedProduct.price).toFixed(2);
    document.getElementById('modalTotalPrice').textContent = totalPrice;
}
function buyProductWithQuantity() {
    const quantityInput = document.getElementById('quantityInput');
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
        alert('Please enter a valid quantity.');
        return;
    }

    // Store the purchased product information in cartData
    const purchasedItem = {
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: quantity,
    };

    // Use a unique key for each purchase, you can customize this based on your needs
    const purchaseKey = `purchase_${new Date().getTime()}`;

    // Save the purchased item to cartData
    cartData[purchaseKey] = purchasedItem;

    // Optionally, you can display a confirmation message to the user
    alert(`Item "${selectedProduct.name}" (Quantity: ${quantity}) added to cart successfully!`);

    // Reset the quantity input field
    quantityInput.value = '';

    // Close the modal
    $('#quantityModal').modal('hide');
}

function resetModalContent() {
    document.getElementById('modalProductName').textContent = '';
    document.getElementById('modalProductPrice').textContent = '';
    document.getElementById('quantityInput').value = '';
}

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

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    

    let totalCartPrice = 0;

    for (const cartItemId in cartData) {
        const cartItem = cartData[cartItemId];
        const total = (cartItem.quantity * cartItem.price).toFixed(2);

        totalCartPrice += parseFloat(total);

        const productElement = document.createElement('div');
        productElement.className = 'row3 card mb-3';

       
        
    }
}