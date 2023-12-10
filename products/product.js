let productList = [
    { id: 'product1', name: 'Product 1', description: 'Description 1', price: '100', image: 'product1.jpg' },
    { id: 'product2', name: 'Product 2', description: 'Description 2', price: '200', image: 'product2.jpg' },
    { id: 'product3', name: 'Product 3', description: 'Description 3', price: '300', image: 'product3.jpg' }
];

btnAddProduct = document.getElementById('btnAddProduct');

if (btnAddProduct) {
    btnAddProduct.addEventListener("click", function () {
        let productName = document.querySelector("#productName");
        let productDescription = document.querySelector("#productDescription");
        let productPrice = document.querySelector("#productPrice");
        let productImage = document.querySelector("#fileInput"); // Use file input with id "fileInput"

        let productImageValue = productImage.files.length > 0 ? productImage.files[0].name : "";

        let product = {
            id: 'product' + (productList.length + 1), // Assuming a simple way to generate IDs
            name: productName.value,
            description: productDescription.value,
            price: productPrice.value,
            image: productImageValue,
        };

        if (!product.name || !product.description || !product.price || !product.image) {
            return alert("All fields are required");
        }

        console.log("Product added", product);

        let modalElement = new bootstrap.Modal(document.getElementById("exampleModal"));
        modalElement.hide();

        productName.value = "";
        productDescription.value = "";
        productPrice.value = "";
        productImage.value = "";
        productList.push(product);

        localStorage.setItem("productList", JSON.stringify(productList));
    });
}

// The rest of your code for deleting and updating products remains unchanged

let deleteButtons = document.querySelectorAll(".btn-danger");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            let productCard = button.closest(".row1, .row2, .row3");

            if (productCard) {
                productCard.remove();

            }
        });
    });

function updateProduct(productId) {
    // Assuming you have input fields in your modal with IDs like "updatedProductName", "updatedProductDescription", etc.
    let updatedName = document.getElementById('updatedProductName').value;
    let updatedDescription = document.getElementById('updatedProductDescription').value;
    let updatedPrice = document.getElementById('updatedProductPrice').value;

    // Update the content of the product card directly
    let productCard = document.getElementById(productId);
    if (productCard) {
        productCard.querySelector('.card-body h4').innerText = updatedName;
        productCard.querySelector('.card-body p').innerText = updatedDescription;

        // If you have a price element in your card, update it
        let priceElement = productCard.querySelector('.price');
        if (priceElement) {
            priceElement.innerText = updatedPrice;
        }
    }

    // Close the update modal
    const updateProductModal = new bootstrap.Modal(document.getElementById('updateProductModal'));
    updateProductModal.hide();
}
