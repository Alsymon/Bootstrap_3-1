let productList = [
        { id: 'product1', name: 'Product 1', description: 'Description 1', price: '100', image: 'product1.jpg' },
        { id: 'product2', name: 'Product 2', description: 'Description 2', price: '200', image: 'product2.jpg' },
        { id: 'product3', name: 'Product 3', description: 'Description 3', price: '300', image: 'product3.jpg' }
    ];


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
        userGender: maleGender.checked ? "Male" : femaleGender.checked ? "Female" : otherGender.checked ? "OtherGender": "",
        address: address.value,
        age: age.value
    };

    if (!user.email || !user.firstname || !user.lastname || !user.password) {
        return alert("All fields are required");
    }

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("registeredUser", JSON.stringify(user));
}

let btnRegister = document.querySelector("#btnRegister");

if (btnRegister) {
    btnRegister.addEventListener("click", () => {
        registerUser();
    });
}

btnAddProduct = document.getElementById('btnAddProduct');

if (btnAddProduct) {
    btnAddProduct.addEventListener("click", function () {
        let productName = document.querySelector("#productName");
        let productDescription = document.querySelector("#productDescription");
        let productPrice = document.querySelector("#productPrice");
        let productImage = document.querySelector("#fileInput"); // Use file input with id "fileInput"

        let productImageValue = productImage.files.length > 0 ? productImage.files[0].name : "";

        let product = {
            productName: productName.value,
            productDescription: productDescription.value,
            productPrice: productPrice.value,
            productImage: productImageValue,
        };

        if (!product.productName || !product.productDescription || !product.productPrice || !product.productImage) {
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

let deleteButtons = document.querySelectorAll(".btn-danger");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            let productCard = button.closest(".row1, .row2, .row3");

            if (productCard) {
                productCard.remove();

            }
        });
    });


function populateProductDropdown() {
    let updateProductDropdown = document.getElementById('updateProductDropdown');

    productList.forEach(product => {
        let option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name; 
        updateProductDropdown.appendChild(option);
    });
}

function handleUpdateProduct() {
    let selectedProductId = document.getElementById('updateProductDropdown').value;
    let updatedProductName = document.getElementById('updatedProductName');
    let updatedProductDescription = document.getElementById('updatedProductDescription');
    let updatedProductPrice = document.getElementById('updatedProductPrice');
    let updatedFileInput = document.getElementById('updatedFileInput');
    let updatedProductImage = updatedFileInput.files.length > 0 ? updatedFileInput.files[0].name : 'default.jpg';

    let updatedProductIndex = productList.findIndex(product => product.id === selectedProductId);

    if (updatedProductIndex !== -1) {
        productList[updatedProductIndex].name = updatedProductName.value;
        productList[updatedProductIndex].description = updatedProductDescription.value;
        productList[updatedProductIndex].price = updatedProductPrice.value;
        productList[updatedProductIndex].image = updatedProductImage;

        updatedProductName.value = "";
        updatedProductDescription.value = "";
        updatedProductPrice.value = "";
        updatedFileInput.value = ""; // Clear the file input
        console.log('Product updated:', productList[updatedProductIndex]);
        localStorage.setItem("productList", JSON.stringify(productList));
    }
}

document.getElementById('btnAddProduct').addEventListener('click', btnAddProduct);
document.getElementById('btnUpdateProduct').addEventListener('click', handleUpdateProduct);

populateProductDropdown();
