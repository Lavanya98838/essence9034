document.addEventListener("DOMContentLoaded", function() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  let total = 0;

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    total = 0;

    if (cartItems.length === 0) {
      const emptyCartMessage = document.createElement('div');
      emptyCartMessage.innerHTML = `
        <div style="text-align:center; padding: 80px 20px;">
          <i class='bx bx-cart' style="font-size:5rem; color:#555; display:block; margin-bottom:20px;"></i>
          <p style="font-size:1.4rem; font-weight:600; color:#aaa; margin-bottom:12px;">Your cart is empty!</p>
          <p style="color:#666; margin-bottom:28px;">Looks like you haven't added anything yet.</p>
          <a href="menu.html" style="display:inline-block; padding:12px 28px; background:#e7a809; color:#111; font-weight:700; border-radius:10px; text-decoration:none; transition:all 0.3s ease;">Browse Menu</a>
        </div>
      `;
      cartItemsContainer.appendChild(emptyCartMessage);
      cartTotalElement.textContent = `₹0.00`;
    } else {
      cartItems.forEach(function(item, index) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
          <img src="${item.imgUrl}" width="100px" height="100px" class="img-cart" alt="${item.name}" style="border-radius:8px; object-fit:cover;">
          <div class="item-cart">
            <p class="cart-name"><strong>${item.name}</strong></p>
            <p class="cart-price">₹${item.price.toFixed(2)}</p>
            <div class="cart-quantity">
              Qty:&nbsp;
              <div class="quantity">
                <button class="quantity-button" data-index="${index}" data-action="decrease">−</button>
                <span>${item.quantity}</span>
                <button class="quantity-button" data-index="${index}" data-action="increase">+</button>
              </div>
            </div>
          </div>
          <div class="remove-from-cart" data-index="${index}" title="Remove item">
            <i class='bx bx-trash'></i>
          </div>
        `;

        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
      });

      cartTotalElement.textContent = `₹${total.toFixed(2)}`;
    }
  }

  renderCart();

  cartItemsContainer.addEventListener('click', function(event) {
    const btn = event.target.closest('.quantity-button');
    if (btn) {
      const index = parseInt(btn.dataset.index);
      const action = btn.dataset.action;

      if (action === 'decrease') {
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity -= 1;
        } else {
          cartItems.splice(index, 1);
        }
      } else if (action === 'increase') {
        cartItems[index].quantity += 1;
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      renderCart();
    }
  });

  cartItemsContainer.addEventListener('click', function(event) {
    const removeBtn = event.target.closest('.remove-from-cart');
    if (removeBtn) {
      const index = parseInt(removeBtn.dataset.index);
      cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      renderCart();
    }
  });
});
