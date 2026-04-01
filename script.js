// script.js — handles Add to Cart logic and updates cart badge count live

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const name   = button.dataset.name;
    const price  = parseFloat(button.dataset.price);
    const imgUrl = button.dataset.imgurl;

    // Retrieve existing cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // If item already in cart, increase quantity; otherwise add it
    const existingIndex = cartItems.findIndex(item => item.name === name);

    if (existingIndex !== -1) {
      cartItems[existingIndex].quantity = (cartItems[existingIndex].quantity || 1) + 1;
    } else {
      cartItems.push({ name, price, quantity: 1, imgUrl });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update cart badge count on the page immediately
    updateCartBadge(cartItems);
  });
});

function updateCartBadge(cartItems) {
  if (!cartItems) {
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  }
  const total = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }
}

// Initialize badge on page load
updateCartBadge();
