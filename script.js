document.addEventListener("DOMContentLoaded", function () {
    
    const basketButton = document.querySelector(".basket-button");
    const basketPopup = document.querySelector(".basket-popup");
    const contentBoxes = document.querySelectorAll(".content-box");
    basketButton.addEventListener("click", function () {
        
        if (basketPopup.style.display === "none" || basketPopup.style.display === "") {
            basketPopup.style.display = "block";
            contentBoxes.forEach(function(contentBox) {
                contentBox.style.width = "60%";
            });

            basketPopup.style.right = "0";
            basketPopup.style.left = "auto";
        } else {
            
            basketPopup.style.display = "none";
            contentBoxes.forEach(function(contentBox) {
                contentBox.style.width = "95%";
            });

            basketPopup.style.right = "auto";
            basketPopup.style.left = "-100%";
        }
    });
});

let cart = {};

function addToCart(productId) {
    let quantityElement = document.getElementById('quantity-' + productId);

    if (quantityElement) {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
            quantity--;
            cart[productId] = cart[productId] ? cart[productId] + 1 : 1;
            quantityElement.textContent = quantity;
            updateCartDisplay();
            updateTotalPrice();
        }
    }
}

function updateCartDisplay() {
    let basketBox = document.querySelector('.basket-box');
    basketBox.innerHTML = '';

    for (let productId in cart) {
        let productQuantity = cart[productId];
        let productName = document.getElementById(productId).querySelector('h5').innerText;
        let productDiv = document.createElement('div');
        productDiv.classList.add('basket-item'); 
        productDiv.innerHTML = `
            <div class="basket-item-name">
                <span>${productName}</span>
                <span class="basket-item-quantity">${productQuantity}</span>
            </div>
            <button class="remove-button" onclick="removeFromCart(${productId})">Remove</button>
        `;
        basketBox.appendChild(productDiv);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });
    });

    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            removeFromCart(productId);
        });
    });

    for (let productId = 10; productId <= 50; productId += 10) {
        updateItemQuantityDisplay(productId);
    }
});

addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        let productQuantity = button.getAttribute('data-product-quantity');

        if (cart[productQuantity]) {
            cart[productQuantity]++;
            updateCartDisplay();
            let storeQuantityElement = document.getElementById('store-quantity-' + productQuantity);
            if (storeQuantityElement) {
                storeQuantityElement.textContent = parseInt(storeQuantityElement.textContent) - 1;
            }
        }
    });
});

function removeFromCart(productId) {
    if (cart[productId] && cart[productId] > 0) {
        cart[productId]--;
        let quantityElement = document.getElementById('quantity-' + productId);
        if (quantityElement) {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateCartDisplay();
            if (cart[productId] === 0) {
                delete cart[productId];
            }
            
            updateCartDisplay();
            updateTotalPrice();
        }
    }
}

// Функція для оновлення загальної вартості
function updateTotalPrice() {
    let totalPrice = 0;
    for (let productId in cart) {
        if (cart.hasOwnProperty(productId)) {
            let quantity = cart[productId];
            let priceElement = document.getElementById('price-' + productId);
            if (priceElement) {
                let price = parseInt(priceElement.textContent.replace(/[^\d]/g, '')); 
                totalPrice += price * quantity;
            }
        }
    }

    let totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = 'Total: $' + totalPrice;
    }
}