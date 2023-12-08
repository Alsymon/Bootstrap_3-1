console.log("hello world!!!");
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

document.addEventListener("DOMContentLoaded", function () {
    let btnAddProduct = document.querySelector("#btnAddProduct");

    if (btnAddProduct) {
        btnAddProduct.addEventListener("click", function () {
            let productName = document.querySelector("#productName");
            let productDescription = document.querySelector("#productDescription");
            let productPrice = document.querySelector("#productPrice");

            let product = {
                productName: productName.value,
                productDescription: productDescription.value,
                productPrice: productPrice.value,
            };

            if (!product.productName || !product.productDescription || !product.productPrice) {
                return alert("All fields are required");
            }

           
            console.log("Product added", product);


            productName.value = "";
            productDescription.value = "";
            productPrice.value = "";

            let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
            modal.hide();
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let deleteButtons = document.querySelectorAll(".btn-danger");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            let productCard = button.closest(".row1, .row2, .row3");

            if (productCard) {
                productCard.remove();

            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const productList = [
        { id: 'product1', name: 'Product 1', description: 'Description 1', price: '100', image: 'product1.jpg' },
        { id: 'product2', name: 'Product 2', description: 'Description 2', price: '200', image: 'product2.jpg' },
        { id: 'product3', name: 'Product 3', description: 'Description 3', price: '300', image: 'product3.jpg' }
    ];


    function populateProductDropdown() {
        const updateProductDropdown = document.getElementById('updateProductDropdown');

        productList.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            updateProductDropdown.appendChild(option);
        });
    }


    function handleAddProduct() {

        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        const fileInput = document.getElementById('fileInput');
        const productImage = fileInput.files.length > 0 ? fileInput.files[0].name : 'default.jpg';

        const newProduct = {
            id: `product${productList.length + 1}`,
            name: productName,
            description: productDescription,
            price: productPrice,
            image: productImage
        };

        productList.push(newProduct);

        console.log('Product added:', newProduct);
    }


    function handleUpdateProduct() {

        const selectedProductId = document.getElementById('updateProductDropdown').value;
        const updatedProductName = document.getElementById('updatedProductName').value;
        const updatedProductDescription = document.getElementById('updatedProductDescription').value;
        const updatedProductPrice = document.getElementById('updatedProductPrice').value;
        const updatedFileInput = document.getElementById('updatedFileInput');
        const updatedProductImage = updatedFileInput.files.length > 0 ? updatedFileInput.files[0].name : 'default.jpg';

        const updatedProductIndex = productList.findIndex(product => product.id === selectedProductId);

        if (updatedProductIndex !== -1) {
            productList[updatedProductIndex].name = updatedProductName;
            productList[updatedProductIndex].description = updatedProductDescription;
            productList[updatedProductIndex].price = updatedProductPrice;
            productList[updatedProductIndex].image = updatedProductImage;

            console.log('Product updated:', productList[updatedProductIndex]);
        }
    }

    populateProductDropdown();

    document.getElementById('btnAddProduct').addEventListener('click', handleAddProduct);
    document.getElementById('btnUpdateProduct').addEventListener('click', handleUpdateProduct);
});
