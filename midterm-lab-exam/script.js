// Reg No: FA24-BCS-011 | N = 11 | BP = 611px | H = 77 | K = 5 | Max = 5

document.addEventListener('DOMContentLoaded', () => {
    const N = 11;
    const MAX_PRODUCT_LIMIT = (N % 4) + 2;

    let cart = [];

    const cartIconBtn = document.getElementById('cart-icon-btn');
    const cartCountBadge = document.getElementById('cart-count');
    const miniCartDropdown = document.getElementById('mini-cart-dropdown');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const miniCartBody = document.getElementById('mini-cart-body');
    const miniCartTotal = document.getElementById('mini-cart-total');
    const cartItemsCount = document.getElementById('cart-items-count');

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    function parsePrice(text) {
        if (!text) return 0;
        const cleaned = text.replace(/[^0-9]/g, '');
        return parseInt(cleaned, 10) || 0;
    }

    function formatPrice(num) {
        return 'Rs. ' + num.toLocaleString('en-PK');
    }

    function getProductCountInCart(productName) {
        return cart.filter(item => item.name === productName).length;
    }

    function updateProductButtons() {
        addToCartButtons.forEach(btn => {
            const card = btn.closest('.product-card');
            if (!card) return;
            const nameEl = card.querySelector('.product-name');
            const name = nameEl ? nameEl.textContent.trim() : '';

            const count = getProductCountInCart(name);
            if (count >= MAX_PRODUCT_LIMIT) {
                btn.disabled = true;
                btn.textContent = 'Limit reached';
            } else {
                btn.disabled = false;
                btn.textContent = 'Add to Cart';
            }
        });
    }

    function renderMiniCart() {
        const totalItems = cart.length;
        if (cartCountBadge) {
            cartCountBadge.textContent = totalItems;
        }
        if (cartItemsCount) {
            cartItemsCount.textContent = totalItems;
        }

        const totalPrice = cart.reduce((accumulator, item) => accumulator + item.price, 0);

        if (miniCartTotal) {
            miniCartTotal.textContent = formatPrice(totalPrice);
        }

        if (!miniCartBody) return;

        if (cart.length === 0) {
            miniCartBody.innerHTML = '<p class="empty-cart-text">Your cart is empty.</p>';
            return;
        }

        miniCartBody.innerHTML = '';
        cart.forEach((item, index) => {
            const itemRow = document.createElement('div');
            itemRow.className = 'cart-item-row';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'cart-item-name';
            nameSpan.textContent = item.name;

            const priceSpan = document.createElement('span');
            priceSpan.className = 'cart-item-price';
            priceSpan.textContent = formatPrice(item.price);

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'cart-item-remove-btn';
            removeBtn.textContent = 'Remove';
            removeBtn.setAttribute('aria-label', `Remove ${item.name} from cart`);

            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeItemFromCart(index);
            });

            itemRow.appendChild(nameSpan);
            itemRow.appendChild(priceSpan);
            itemRow.appendChild(removeBtn);
            miniCartBody.appendChild(itemRow);
        });
    }

    function addItemToCart(name, price) {
        const count = getProductCountInCart(name);
        if (count >= MAX_PRODUCT_LIMIT) {
            return;
        }

        cart.push({
            id: Date.now() + Math.random(),
            name: name,
            price: price
        });

        renderMiniCart();
        updateProductButtons();
    }

    function removeItemFromCart(index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            renderMiniCart();
            updateProductButtons();
        }
    }

    function toggleMiniCart(e) {
        if (e) {
            e.preventDefault();
        }
        if (miniCartDropdown) {
            miniCartDropdown.classList.toggle('open');
        }
    }

    function closeMiniCart() {
        if (miniCartDropdown) {
            miniCartDropdown.classList.remove('open');
        }
    }

    if (cartIconBtn) {
        cartIconBtn.addEventListener('click', toggleMiniCart);
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMiniCart();
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.cart-wrapper')) {
            closeMiniCart();
        }
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.product-card');
            if (!card) return;

            const nameEl = card.querySelector('.product-name');
            const name = nameEl ? nameEl.textContent.trim() : 'Zero Product';

            const priceEl = card.querySelector('.current-price');
            const price = priceEl ? parsePrice(priceEl.textContent) : 0;

            addItemToCart(name, price);
        });
    });

    renderMiniCart();
    updateProductButtons();
});
