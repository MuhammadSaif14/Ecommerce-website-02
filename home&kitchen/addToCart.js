let productIdToAddToCart;

for (let i = 1; i <= 40; i++) {
  if (document.querySelector(`.addCart${i}`)) {
    productIdToAddToCart = i;
    break;
  }
}
console.log(productIdToAddToCart);

let listProduct = [];
const initApp = () => {
  fetch("../products.json")
    .then((resposne) => resposne.json())
    .then((data) => {
      listProduct = data;

      // get cart from memory
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();
//   console.log();
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".icon-cart span");
let carts = JSON.parse(localStorage.getItem("cart"));
const addToCart = (product_id) => {
  let cartProduct = carts.find((item) => item.product_id === product_id);
  if (!cartProduct) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cartProduct.quantity += 1;
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0; // Initialize total quantity variable
  let totalPrice = 0; // Initialize total price variable
  if (carts.length > 0) {
    carts.forEach((cart) => {
      let newCart = document.createElement("div");
      newCart.classList.add("unit");
      newCart.dataset.id = cart.product_id;
      let positionProduct = listProduct.findIndex(
        (value) => value.id == cart.product_id
      );
      let info = listProduct[positionProduct];
      // Check if the product information is available and has a price property
      if (info && typeof info.price === 'string') {
        // Convert the price string to a number by removing the dollar sign ('$') and parsing it
        let price = parseFloat(info.price.replace("$", ""));
        let totalProductPrice = price * cart.quantity; // Calculate total price for this product
        totalPrice += totalProductPrice; // Add total product price to overall total price
        totalQuantity += cart.quantity; // Add quantity of this product to overall total quantity
        newCart.innerHTML = `
          <div class="image">
              <img src="../${info.image}" alt="">
          </div>
          <div class="name">
              ${info.Pname}
          </div>
          <div class="totalPrice">
              $${totalProductPrice.toFixed(2)} <!-- Display total product price -->
          </div>
          <div class="quantity">
              <span class="minus">-</span>
              <span>${cart.quantity}</span>
              <span class="plus">+</span>
          </div>
        `;
    } else {
        // Handle case where price information is missing or undefined
        newCart.textContent = "Price information unavailable";
    }
    
      listCartHTML.appendChild(newCart);
    });
  }
  // Set the total quantity and total price in the icon cart span
  iconCartSpan.innerText = totalQuantity + "   | $" + totalPrice.toFixed(2); // Display total quantity and total price
};


listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  }
});

const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemInCart].quantity =
          carts[positionItemInCart].quantity + 1;
        break;
      default:
        let valueChange = carts[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

document.querySelector(".addCart").addEventListener("click", () => {
  addToCart(productIdToAddToCart);
});
