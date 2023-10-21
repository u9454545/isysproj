let listCart = [];

async function fetchCart() {
    const response = await fetch('/cart/cart');
    const cartData = await response.json();
    return cartData;
}

function checkCart() {
    fetchCart().then(cartData => {
        listCart = cartData;
        addCartToHTML();
    });
}

function addCartToHTML(){
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        });
    }

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
    return totalPrice;
}

// Add a function for updating cart (this is just an example)
async function updateProductInCart(productId, updatedQuantity) {
    const response = await fetch(`/cart/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity: updatedQuantity
        })
    });
    if (response.ok) {
        checkCart();
    }
}

checkCart();
