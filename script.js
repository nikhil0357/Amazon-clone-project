const productContainer =
document.getElementById("productContainer");

const loader =
document.getElementById("loader");

const searchInput =
document.getElementById("searchInput");

const cartCount =
document.getElementById("cartCount");

const cartModal =
document.getElementById("cartModal");

const cartItems =
document.getElementById("cartItems");

const totalPrice =
document.getElementById("totalPrice");

const closeModal =
document.getElementById("closeModal");

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Load Products */

async function loadProducts() {

loader.style.display = "block";

try{

const res =
await fetch("https://fakestoreapi.com/products");

products = await res.json();

displayProducts(products);

}catch(error){

productContainer.innerHTML =
"<h2>Failed to load products.</h2>";

console.log(error);

}

loader.style.display = "none";
}

/* Display Products */

function displayProducts(items){

productContainer.innerHTML = "";

items.forEach(product => {

const card =
document.createElement("div");

card.classList.add("card");

card.innerHTML = `
<img src="${product.image}">
<h3>${product.title}</h3>
<p class="price">₹${Math.round(product.price*83)}</p>
<button class="btn"
onclick="addToCart(${product.id})">
Add To Cart
</button>
`;

productContainer.appendChild(card);

});

}

/* Add Cart */

function addToCart(id){

const product =
products.find(item => item.id === id);

cart.push(product);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCart();
}

/* Update Cart */

function updateCart(){

cartCount.textContent = cart.length;

let total = 0;

cartItems.innerHTML = "";

cart.forEach((item,index)=>{

total += item.price * 83;

cartItems.innerHTML += `
<div class="cart-item">
<p>${item.title}</p>

<button onclick="removeItem(${index})">
Remove
</button>
</div>
`;

});

totalPrice.textContent =
Math.round(total);

}

window.removeItem = function(index){

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCart();
}

/* Search */

searchInput.addEventListener("input",()=>{

const keyword =
searchInput.value.toLowerCase();

const filtered =
products.filter(product =>
product.title.toLowerCase()
.includes(keyword)
);

displayProducts(filtered);

});

/* Open Cart */

document.querySelector(".cart")
.addEventListener("click",()=>{

cartModal.style.display="block";

});

/* Close Cart */

closeModal.addEventListener("click",()=>{

cartModal.style.display="none";

});

window.onclick = function(e){

if(e.target === cartModal){

cartModal.style.display="none";

}

}

/* Init */

updateCart();
loadProducts();