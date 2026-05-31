const products = [
    {
        id: "mouse",
        name: "Беспроводная мышь Logitech",
        category: "periphery",
        price: 2490
    },
    {
        id: "keyboard",
        name: "Клавиатура ExeGate",
        category: "periphery",
        price: 1790
    },
    {
        id: "headphones",
        name: "Беспроводные наушники Air Max",
        category: "audio",
        price: 49990
    },
    {
        id: "monitor",
        name: "Игровой монитор Predator",
        category: "display",
        price: 74990
    }
];

let cart = [];



const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
}


const productCards = document.querySelectorAll(".product-card");
const addButtons = document.querySelectorAll(".add-to-cart");
const cartList = document.querySelector("#cart-list");
const cartEmpty = document.querySelector("#cart-empty");
const cartTotal = document.querySelector("#cart-total");
const payButton = document.querySelector("#pay-button");
const clearCartButton = document.querySelector("#clear-cart");
const categoryFilter = document.querySelector("#category-filter");

const formatPrice = price => `${price.toLocaleString("ru-RU")} руб.`;

const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    return total;
};

const findProduct = id => products.find(product => product.id === id);
const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};



const removeFromCart = index => {
    cart.splice(index, 1);
    renderCart();
    saveCartToLocalStorage();
};

const renderCart = () => {
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");

        const itemInfo = document.createElement("div");
        const itemName = document.createElement("strong");
        const itemPrice = document.createElement("span");
        const removeButton = document.createElement("button");

        itemName.textContent = item.name;
        itemPrice.textContent = formatPrice(item.price);
        removeButton.textContent = "Удалить";
        removeButton.classList.add("remove-item");
        removeButton.addEventListener("click", () => removeFromCart(index));

        itemInfo.append(itemName, itemPrice);
        cartItem.append(itemInfo, removeButton);
        cartList.append(cartItem);
    });

    cartEmpty.style.display = cart.length === 0 ? "block" : "none";
    cartTotal.textContent = `Итого: ${formatPrice(calculateTotal())}`;
};

const addToCart = product => {
    cart.push(product);
    renderCart();
    saveCartToLocalStorage();
};

const clearCart = () => {
    cart = [];
    renderCart();
    saveCartToLocalStorage();
};

const filterProducts = () => {
    const selectedCategory = categoryFilter.value;

    productCards.forEach(card => {
        const isVisible = selectedCategory === "all" || card.dataset.category === selectedCategory;
        card.style.display = isVisible ? "flex" : "none";
    });
};

addButtons.forEach(button => {
    button.addEventListener("click", () => {
        const product = findProduct(button.dataset.id);
        if (product) {
            addToCart(product);
        }
    });
});

categoryFilter.addEventListener("change", filterProducts);

clearCartButton.addEventListener("click", clearCart);

payButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
        return;
    }

    alert("Покупка прошла успешно!");
    clearCart();
});

renderCart();
