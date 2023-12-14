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
                } else {
                    console.error('Invalid or missing purchase data:', finalPurchaseData);
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
