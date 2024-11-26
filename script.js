// Initialize cart array at the top
let cart = [];

function handleProductAction(e) {
    const productItem = e.target.closest('.product-item');
    if (productItem) {
        // Check which button was clicked
        if (e.target.classList.contains('shop-now')) {
            const productName = productItem.querySelector('h3').textContent;
            // Make sure price element has the 'price' class
            const price = productItem.querySelector('.price').textContent;
            console.log('Adding to cart:', productName, price); // Debug log
            addToCart({ name: productName, price: price });
        } else if (e.target.classList.contains('view-details')) {
            showProductDetails(productItem);
        }
    }
}

function addToCart(product) {
    cart.push(product);
    updateCartIndicator();
    showNotification(`Added ${product.name} to cart!`);
}

function updateCartIndicator() {
    let cartCount = document.querySelector('.cart-count');
    if (!cartCount) {
        // Create cart icon and counter
        const cartContainer = document.createElement('div');
        cartContainer.className = 'cart-container';
        cartContainer.innerHTML = `
            <span class="cart-icon">🛒</span>
            <div class="cart-count">0</div>
        `;
        document.querySelector('header').appendChild(cartContainer);
        cartCount = cartContainer.querySelector('.cart-count');
    }
    cartCount.textContent = cart.length;
    
    // Add animation class
    cartCount.classList.add('cart-update');
    setTimeout(() => cartCount.classList.remove('cart-update'), 300);
}

function showProductDetails(productItem) {
    try {
        const name = productItem.querySelector('h3').textContent;
        const price = productItem.querySelector('.price').textContent;
        const description = productItem.querySelector('.description')?.textContent || 'No description available';
        const image = productItem.querySelector('img')?.src;
        
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                ${image ? `<img src="${image}" alt="${name}" class="modal-image">` : ''}
                <h2>${name}</h2>
                <p class="modal-price">${price}</p>
                <p class="modal-description">${description}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Add event listeners for modal
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCart({ name, price });
            modal.remove();
        });
    } catch (error) {
        console.error('Error showing product details:', error);
        showNotification('Error displaying product details');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add animation
    notification.classList.add('notification-show');
    
    setTimeout(() => {
        notification.classList.add('notification-hide');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

