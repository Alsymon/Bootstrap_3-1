let productList = [];

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

deleteButtons = document.querySelectorAll(".btn-danger");

deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        let productCard = button.closest(".row1, .row2, .row3");

        if (productCard) {
            productCard.remove();

            productId = productCard.querySelector('.btn-outline-success').getAttribute('data-product-id');
            updatedProductList = productList.filter(product => product.id !== productId);
            productList = updatedProductList;

            localStorage.setItem("productList", JSON.stringify(productList));
        }
    });
});

function populateProductDropdown() {
     updateProductDropdown = document.getElementById('updateProductDropdown');

    productList.forEach(product => {
        option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.productName;
        updateProductDropdown.appendChild(option);
    });
}

function handleUpdateProduct() {
      selectedProductId = document.getElementById('updateProductDropdown').value;
      updatedProductName = document.getElementById('updatedProductName').value;
      updatedProductDescription = document.getElementById('updatedProductDescription').value;
      updatedProductPrice = document.getElementById('updatedProductPrice').value;

      updatedProductIndex = productList.findIndex(product => product.id === selectedProductId);

    if (updatedProductIndex !== -1) {
        productList[updatedProductIndex].productName = updatedProductName;
        productList[updatedProductIndex].description = updatedProductDescription;
        productList[updatedProductIndex].price = updatedProductPrice;

        localStorage.setItem("productList", JSON.stringify(productList));
    }
}

populateProductDropdown();

document.getElementById('btnUpdateProduct').addEventListener('click', handleUpdateProduct);
