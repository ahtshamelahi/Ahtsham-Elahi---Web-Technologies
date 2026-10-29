/**
 * Midterm Exam - Task 3: JavaScript Shopping Cart & Mini-Cart
 * Student: Ahtsham Elahi
 * Roll Number: FA24-BCS-011
 * N = 11
 * Max allowed per product = (N mod 4) + 2 = (11 mod 4) + 2 = 5
 */

document.addEventListener('DOMContentLoaded', () => {
    // Personal exam parameter
    const N = 11;
    const MAX_PRODUCT_LIMIT = (N % 4) + 2; // 5

    // In-memory cart array
    let cart = [];

    // DOM Elements
    const cartIconBtn = document.getElementById('cart-icon-btn');
    const cartCountBadge = document.getElementById('cart-count');
    const miniCartDropdown = document.getElementById('mini-cart-dropdown');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const miniCartBody = document.getElementById('mini-cart-body');
    const miniCartTotal = document.getElementById('mini-cart-total');
    const cartItemsCount = document.getElementById('cart-items-count');

    // All "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    /**
     * Parses numeric price from price string (e.g. "Rs.4,999" -> 4999)
     */
    function parsePrice(text) {
        if (!text) return 0;
        const cleaned = text.replace(/[^0-9]/g, '');
        return parseInt(cleaned, 10) || 0;
    }

    /**
     * Formats number as Pakistani Rupee string (e.g. 4999 -> "Rs. 4,999")
     */
    function formatPrice(num) {
        return 'Rs. ' + num.toLocaleString('en-PK');
    }

    /**
     * Counts how many units of a given product name are in the cart
     */
    function getProductCountInCart(productName) {
        return cart.filter(item => item.name === productName).length;
    }

    /**
     * Updates button states according to MAX_PRODUCT_LIMIT
     */
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

    /**
     * Renders the mini-cart dropdown items, updates badge and total using reduce()
     */
    function renderMiniCart() {
        // 1. Update cart badge in navbar
        const totalItems = cart.length;
        if (cartCountBadge) {
            cartCountBadge.textContent = totalItems;
        }
        if (cartItemsCount) {
            cartItemsCount.textContent = totalItems;
        }

        // 2. Calculate total price using Array.prototype.reduce()
        const totalPrice = cart.reduce((accumulator, item) => accumulator + item.price, 0);

        if (miniCartTotal) {
            miniCartTotal.textContent = formatPrice(totalPrice);
        }

        // 3. Render items list
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

            // Remove button event listener
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

    /**
     * Adds a product to the cart
     */
    function addItemToCart(name, price) {
        const count = getProductCountInCart(name);
        if (count >= MAX_PRODUCT_LIMIT) {
            alert(`You can only add up to ${MAX_PRODUCT_LIMIT} units of "${name}".`);
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

    /**
     * Removes an item at a specific index from the cart
     */
    function removeItemFromCart(index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            renderMiniCart();
            updateProductButtons();
        }
    }

    /**
     * Toggle mini-cart panel visibility
     */
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

    // Attach click listener to cart icon in navbar
    if (cartIconBtn) {
        cartIconBtn.addEventListener('click', toggleMiniCart);
    }

    // Close button inside mini-cart
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMiniCart();
        });
    }

    // Close when clicking outside mini-cart
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.cart-wrapper')) {
            closeMiniCart();
        }
    });

    // Attach click events to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.product-card');
            if (!card) return;

            // Read product name from card
            const nameEl = card.querySelector('.product-name');
            const name = nameEl ? nameEl.textContent.trim() : 'Zero Product';

            // Read product price from card
            const priceEl = card.querySelector('.current-price');
            const price = priceEl ? parsePrice(priceEl.textContent) : 0;

            addItemToCart(name, price);
        });
    });

    // Initial render
    renderMiniCart();
    updateProductButtons();
});
