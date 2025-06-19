// Sample menus
const menus = {
  "pizza-palace": {
    name: "Pizza Palace 🍕",
    items: [
      { id: "margherita", name: "Margherita Pizza", price: 250,img: "assets/margherita.jpeg" },
      { id: "farmhouse", name: "Farmhouse Pizza", price: 320,img: "assets/farmhouse.jpeg" },
      { id: "pepsi", name: "Pepsi", price: 40 ,img: "assets/pepsi.jpeg"}
    ]
  },
  "burger-barn": {
    name: "Burger Barn 🍔",
    items: [
      { id: "aloo", name: "Aloo Tikki Burger", price: 80,img: "assets/aloo.jpg" },
      { id: "maharaja", name: "Maharaja Burger", price: 120,img: "assets/maharaja.jpg" },
      { id: "cheese", name: "Cheese Burger", price: 90, img: "assets/cheese.jpg" }
    ]
  },
  "coffee-cafe": {
    name: "Coffee Cafe ☕",
    items: [
      { id: "cold-coffee", name: "Cold Coffee", price: 80,img: "assets/cold.jpeg" },
      { id: "hot-coffee", name: "Hot Coffee", price: 70 ,img: "assets/hot.jpg"},
      { id: "cappuccino", name: "Cappuccino", price: 120, img: "assets/capucinno.jpg" }
    ]
  }
};

const urlParams = new URLSearchParams(window.location.search);
const restaurantId = urlParams.get("id");

const cart = JSON.parse(localStorage.getItem("cart")) || {};
const savedRestaurant = localStorage.getItem("restaurant-source");

function loadMenu() {
  const restaurant = menus[restaurantId];

  if (!restaurant) {
    document.getElementById("restaurant-name").textContent = "Restaurant Not Found";
    return;
  }

  document.getElementById("restaurant-name").textContent = restaurant.name;

  const menuSection = document.getElementById("menu");

  // 🧽 Clear old items (fixes duplication)
  menuSection.innerHTML = "";

  restaurant.items.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.style.display = "flex";
    itemDiv.style.alignItems = "center";
    itemDiv.style.gap = "15px";
    itemDiv.style.marginBottom = "20px";
    itemDiv.style.border = "1px solid #ddd";
    itemDiv.style.padding = "10px";
    itemDiv.style.borderRadius = "10px";
    itemDiv.style.backgroundColor = "#f9f9f9";

    const image = document.createElement("img");
    image.src = item.img || "assets/default.jpg";
    image.alt = item.name;
    image.style.width = "80px";
    image.style.height = "80px";
    image.style.objectFit = "cover";
    image.style.borderRadius = "10px";

    const textContent = document.createElement("div");
    textContent.innerHTML = `
      <p style="margin: 4px 0;"><strong>${item.name}</strong></p>
      <p style="margin: 4px 0;">Price: ₹${item.price}</p>
    `;

    const cartArea = document.createElement("div");
    cartArea.id = `cart-${item.id}`;

    if (cart[item.id]) {
      cartArea.innerHTML = generateQtyButtons(item.id);
    } else {
      cartArea.innerHTML = `<button onclick="addToCart('${item.id}', '${item.name}', ${item.price})">Add to Cart</button>`;
    }

    textContent.appendChild(cartArea);

    itemDiv.appendChild(image);
    itemDiv.appendChild(textContent);

    menuSection.appendChild(itemDiv);
  });
}

function addToCart(id, name, price) {
  const currentRestaurant = restaurantId;
  const savedRestaurant = localStorage.getItem("restaurant-source");

  if (savedRestaurant && savedRestaurant !== currentRestaurant) {
    alert("You can only order from one restaurant at a time.\nPlease clear the cart to switch.");
    return;
  }

  if (!savedRestaurant) {
    localStorage.setItem("restaurant-source", currentRestaurant);
  }

  if (!cart[id]) {
    cart[id] = { name, price, qty: 1 };
  } else {
    cart[id].qty++;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById(`cart-${id}`).innerHTML = generateQtyButtons(id);
}

function generateQtyButtons(id) {
  return `
    <button onclick="decreaseQty('${id}')">-</button>
    <span>${cart[id].qty}</span>
    <button onclick="increaseQty('${id}')">+</button>
  `;
}

function increaseQty(id) {
  cart[id].qty++;
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById(`cart-${id}`).innerHTML = generateQtyButtons(id);
}

function decreaseQty(id) {
  if (cart[id].qty > 1) {
    cart[id].qty--;
  } else {
    delete cart[id];
    document.getElementById(`cart-${id}`).innerHTML = `<button onclick="addToCart('${id}', '${menus[restaurantId].items.find(i => i.id === id).name}', ${menus[restaurantId].items.find(i => i.id === id).price})">Add to Cart</button>`;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  if (cart[id]) {
    document.getElementById(`cart-${id}`).innerHTML = generateQtyButtons(id);
  }
}

// ✅ Only load menu once (important!)
if (document.getElementById("menu")) {
  loadMenu();
}
