document.addEventListener('DOMContentLoaded', function () {
    // Retrieve sales data from local storage
    const salesData = [];
    for (let i = 1; i <= localStorage.length; i++) {
        const key = localStorage.key(i - 1);
        if (key && key.startsWith('purchase_')) {
            const purchaseData = JSON.parse(localStorage.getItem(key));

            // Check if purchaseData has nested structure
            if (purchaseData && typeof purchaseData === 'object') {
                const nestedObject = Object.values(purchaseData)[0];
                const finalPurchaseData = nestedObject || purchaseData;

                // Check if the purchase data has the expected structure
                if (finalPurchaseData && finalPurchaseData.name && finalPurchaseData.price && finalPurchaseData.quantity) {
                    salesData.push(finalPurchaseData);
                }
            } else {
                console.error('Invalid purchase data:', purchaseData);
            }
        }
    }

    // Display sales data on the sales page
    const salesContainer = document.getElementById('salesContainer');

    if (salesContainer) {
        if (salesData.length > 0) {
            salesData.forEach((purchase, index) => {
                console.log('Purchase Data:', purchase); // Debugging log

                const saleElement = document.createElement('div');
                saleElement.innerHTML = `
                    <p><strong>Product:</strong> ${purchase.name}</p>
                    <p><strong>Price:</strong> ₱${purchase.price.toFixed(2)}</p>
                    <p><strong>Quantity:</strong> ${purchase.quantity}</p>
                    <p><strong>Total:</strong> ₱${(purchase.price * purchase.quantity).toFixed(2)}</p>
                    <hr>
                `;
                salesContainer.appendChild(saleElement);
            });
        } else {
            salesContainer.innerHTML = '<p>No sales data available.</p>';
        }
    } else {
        console.error('salesContainer not found.');
    }
});


function displayPurchasedProducts() {
    // Get all keys from local storage
    const keys = Object.keys(localStorage);

    // Check if there are any purchases
    if (keys.length === 0) {
        document.getElementById('purchasedProducts').innerHTML = '<p>No purchases found.</p>';
        return;
    }

    // Prepare HTML to display purchased products
    let html = '<h2>Purchased Products</h2>';

    // Iterate through local storage keys
    keys.forEach(key => {
        // Check if the key represents a purchase
        if (key.startsWith('purchase_')) {
            const purchaseData = JSON.parse(localStorage.getItem(key));
            if (purchaseData) {

                
                // Loop through purchased items in the purchaseData
                for (const itemId in purchaseData.items) {
                    if (purchaseData.items.hasOwnProperty(itemId)) {
                        const item = purchaseData.items[itemId];
                        html += `<p><strong>Product Name:</strong> ${item.name}</p>
                                 <p><strong>Price:</strong> ${item.price}</p>
                                 <p><strong>Quantity:</strong> ${item.quantity}</p>
                                 <p><strong>Total:</strong> ₱${(item.price * item.quantity).toFixed(2)}</p>
                                 <hr>`;
                    }
                }

                html += `</div>`;
            } else {
                console.log(`Error: Could not find details for purchase ID ${key}`);
            }
        }
    });

    // Update the HTML content of the purchasedProducts div
    document.getElementById('purchasedProducts').innerHTML = html;
}

// Call this function to display purchased products
displayPurchasedProducts();