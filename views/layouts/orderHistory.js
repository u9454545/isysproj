document.addEventListener('DOMContentLoaded', () => {
    loadCartToOrderHistory();
});

function loadCartToOrderHistory() {
    let listCart = [];
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }

    let orderListHTML = document.querySelector('.orderHistory .orderList');
    orderListHTML.innerHTML = '';

    if(listCart && listCart.length > 0){
        listCart.forEach(product => {
            if(product){
                let orderItem = document.createElement('div');
                orderItem.classList.add('orderItem');
                orderItem.innerHTML = 
                    `<div class="productName">${product.name}</div>
                    <div class="productQuantity">Quantity: ${product.quantity}</div>
                    <div class="productPrice">Price: $${product.price}</div>
                    <div class="totalPrice">Total: $${product.price * product.quantity}</div>`;
                orderListHTML.appendChild(orderItem);
            }
        })
    } else {
        orderListHTML.innerHTML = '<p>No orders found.</p>';
    }
}

function redirectTo(page) {
    window.location.href = page;
}
