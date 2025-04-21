// Toggle Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '☰';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/*
// Cart System
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1,
    };

    // Check if the product already exists in the cart
    const existingProduct = cartItems.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
        cartItems.push(product); // Add new product to cart
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Update cart count in the navbar
    updateCartCount();

    // Show confirmation modal
    showConfirmationModal(productName);
}

// Function to update the cart count in the navbar
function updateCartCount() {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Function to show a confirmation modal
function showConfirmationModal(productName) {
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'confirmation-modal';
    confirmationModal.innerHTML = `
        <div class="confirmation-modal-content">
            <p>${productName} has been added to your cart!</p>
            <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;
    document.body.appendChild(confirmationModal);
}

// Initialize cart count on page load
updateCartCount();

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        addToCart(productName, productPrice);
    });
});
*/

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Cookie Consent
document.addEventListener('DOMContentLoaded', function () {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const rejectCookies = document.getElementById('rejectCookies');
    const customizeCookies = document.getElementById('customizeCookies');
    const cookieModal = document.getElementById('cookieModal');
    const savePreferences = document.getElementById('savePreferences');
    const closeModal = document.getElementById('closeModal');
    const revokeConsentLink = document.getElementById('revokeConsentLink');
    const cookiePreferencesForm = document.getElementById('cookiePreferencesForm');

    // Check if the user has already set preferences
    const cookieConsentData = localStorage.getItem('cookieConsent');
    if (!cookieConsentData || isConsentExpired(cookieConsentData)) {
        cookieConsent.style.display = 'flex'; // Show the banner
    } else {
        updateRevokeConsentVisibility();
    }

    // When the user clicks "Accept All"
    acceptCookies.addEventListener('click', function () {
        setCookieConsent({ essential: true, analytics: true, marketing: true });
        cookieConsent.style.display = 'none'; // Hide the banner
        updateRevokeConsentVisibility();
    });

    // When the user clicks "Reject All"
    rejectCookies.addEventListener('click', function () {
        setCookieConsent({ essential: true, analytics: false, marketing: false });
        cookieConsent.style.display = 'none'; // Hide the banner
        updateRevokeConsentVisibility();
    });

    // When the user clicks "Customize"
    customizeCookies.addEventListener('click', function () {
        cookieModal.style.display = 'flex'; // Show the modal
    });

    // When the user clicks "Save Preferences"
    savePreferences.addEventListener('click', function () {
        const preferences = {
            essential: true, // Essential cookies are always enabled
            analytics: cookiePreferencesForm.analytics.checked,
            marketing: cookiePreferencesForm.marketing.checked
        };
        setCookieConsent(preferences);
        cookieModal.style.display = 'none'; // Hide the modal
        cookieConsent.style.display = 'none'; // Hide the banner
        updateRevokeConsentVisibility();
    });

    // When the user clicks "Close"
    closeModal.addEventListener('click', function () {
        cookieModal.style.display = 'none'; // Hide the modal
    });

    // When the user clicks "Revoke Consent"
    revokeConsentLink.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('cookieConsent'); // Remove consent
        cookieConsent.style.display = 'flex'; // Show the banner
        updateRevokeConsentVisibility();
    });

    // Function to set cookie consent with preferences and expiration date
    function setCookieConsent(preferences) {
        const expirationDays = 30; // Consent expires after 30 days
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);

        // Store preferences and expiration date in localStorage
        localStorage.setItem('cookieConsent', JSON.stringify({
            preferences: preferences,
            expires: expirationDate.toISOString()
        }));
    }

    // Function to check if consent has expired
    function isConsentExpired(cookieConsentData) {
        try {
            const data = JSON.parse(cookieConsentData);
            if (data.expires) {
                return new Date() > new Date(data.expires);
            }
        } catch (e) {
            console.error('Error parsing cookie consent data:', e);
        }
        return true; // If data is invalid, treat as expired
    }

    // Function to update revoke consent link visibility
    function updateRevokeConsentVisibility() {
        if (localStorage.getItem('cookieConsent')) {
            revokeConsentLink.style.display = 'block'; // Show revoke link
        } else {
            revokeConsentLink.style.display = 'none'; // Hide revoke link
        }
    }
});

/*
// Cart Modal and Checkout Process
const cartModal = document.getElementById('cartModal');
const checkoutForm = document.getElementById('checkoutForm');
const closeCartModal = document.getElementById('closeCartModal');
const checkoutButton = document.getElementById('checkoutButton');
const closeCheckoutForm = document.getElementById('closeCheckoutForm');
const cartItemsContainer = document.getElementById('cartItems');

// Open Cart Modal
function openCartModal() {
    displayCart();
    cartModal.style.display = 'flex';
}

// Close Cart Modal
closeCartModal.addEventListener('click', function () {
    cartModal.style.display = 'none';
});

// Proceed to Checkout
checkoutButton.addEventListener('click', function () {
    cartModal.style.display = 'none'; // Hide cart modal
    checkoutForm.style.display = 'block'; // Show checkout form
});

// Close Checkout Form
closeCheckoutForm.addEventListener('click', function () {
    checkoutForm.style.display = 'none';
});

// Display Cart Items
function displayCart() {
    cartItemsContainer.innerHTML = ''; // Clear previous content

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p>${item.name} - KSh ${item.price} (Qty: ${item.quantity})</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Remove Item from Cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
    displayCart();
}

// Submit Checkout Form
document.getElementById('checkoutDetailsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Process the order (e.g., send data to backend)
    alert(`Thank you, ${name}! Your order has been placed.`);
    cartItems = []; // Clear the cart
    localStorage.removeItem('cart');
    updateCartCount();
    checkoutForm.style.display = 'none';
    displayCart();
});
*/

// Carousel Automation
const carousel = document.querySelector('.testimonials-carousel');
let scrollInterval;

// Function to scroll to the next testimonial
const scrollNext = () => {
    const cardWidth = carousel.querySelector('.testimonial-card').offsetWidth + 24; // Card width + gap
    carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });

    // Reset to start if at the end
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
    }
};

// Start auto-scrolling
const startAutoScroll = () => {
    scrollInterval = setInterval(scrollNext, 5000); // Scroll every 5 seconds
};

// Stop auto-scrolling
const stopAutoScroll = () => {
    clearInterval(scrollInterval);
};

// Start auto-scrolling on page load
startAutoScroll();

// Pause auto-scrolling on hover
carousel.addEventListener('mouseenter', stopAutoScroll);
carousel.addEventListener('mouseleave', startAutoScroll);

// Filter Products by Category
document.getElementById('category').addEventListener('change', function () {
    const selectedCategory = this.value;
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Form Submission
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
        // Display the success message
        document.getElementById('success-message').style.display = 'block';
    form.reset(); // Reset the form

                // Refresh the page after 3 seconds
                setTimeout(() => {
        window.location.reload();
                }, 3000);
            } else {
        alert('There was a problem submitting the form. Please try again.');
            }
        })
        .catch(error => {
        alert('There was a problem submitting the form. Please try again.');
        });
    });