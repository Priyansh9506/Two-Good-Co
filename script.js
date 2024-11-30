function validateRegistrationForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cPassword = document.getElementById('c_password').value;
    const contact = document.getElementById('contact').value;

    if (name === '' || email === '' || password === '' || address === '' || contact === ''|| cPassword === '') {
        alert('All fields are required!');
        return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }
    if (password !== cPassword) {       
        alert('Something went Wrong with Password');
        return false;
    }
    if (length.contact<10 || length.contact>10 ) {       
        alert('Please Enter A valid Contact Number');
        return false;
    }
    if(isNaN(contact)){
        alert('Please Enter A valid Contact Number');
        return false;
    }
    else{
    return true;
}
}

let products = [
    {name: "alamais cook", image:"product1.jpg", price: "$190"},
    {name: "rocky road", image:"product2.jpg", price: "$24"},
    {name: "crackers", image:"product3.jpg", price: "$16"},
    {name: "candel", image:"product4.jpg", price: "$59"},
    {name: "fregrence oil", image:"product5.jpg", price: "$39"},
    {name: "happy teddy", image:"product6.jpg", price: "$49"},
    {name: "Sleep Pack", image:"product7.jpg", price: "$129"},
    {name: "Donate Meal", image:"product8.jpg", price: "$10"}
];

const productSection = document.querySelector('.product-section');

products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-footer">
                <span class="price">${product.price}</span>
                <button class="add-btn">+</button>
            </div>
        </div>
    `;

    productSection.appendChild(card);
});

card.querySelector('.add-btn').addEventListener('click', () => {
    alert(`${product.name} added to the cart!`);
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-footer">
                <span class="price">$${product.price}</span>
                <button class="add-btn">+</button>
            </div>
        </div>
    `;
    productSection.appendChild(card);
});

 // Add product to cart on button click
 card.querySelector('.add-btn').addEventListener('click', () => {
    const productInCart = cart.find(item => item.name === product.name);
    if (productInCart) {
        productInCart.quantity += 1; // Increment quantity if the product is already in the cart
    } else {
        cart.push({...product, quantity: 1}); // Add new product with quantity
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    alert(`${product.name} added to the cart!`);
});

    document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountContainer = document.getElementById('total-amount');

    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // If cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let totalAmount = 0;

    cart.forEach(item => {
        totalAmount += item.price * item.quantity;

        // Create cart item
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <p><strong>${item.name}</strong> x ${item.quantity}</p>
            <p>Price: $${item.price} each</p>
            <p>Subtotal: $${item.price * item.quantity}</p>
            <button class="remove-btn">Remove</button>
        `;

        // Remove item from cart
        cartItem.querySelector('.remove-btn').addEventListener('click', () => {
            const index = cart.findIndex(cartItem => cartItem.name === item.name);
            if (index !== -1) {
                cart.splice(index, 1); // Remove item
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                location.reload(); // Reload page to reflect changes
            }
        });

        cartItemsContainer.appendChild(cartItem);
    });

    totalAmountContainer.textContent = totalAmount.toFixed(2); // Update total
});

