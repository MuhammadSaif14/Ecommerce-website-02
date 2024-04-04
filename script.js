const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

/* carousel */

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let backButton = document.getElementById("back");
let seeMoreButtons = document.querySelectorAll(".seeMore"); // Updated selector
let carousel = document.querySelector(".carousel"); // Updated selector
let listHTML = document.querySelector(".carousel .list");

nextButton.addEventListener("click", function() {
  showSlider("next");
});

prevButton.addEventListener("click", function() {
  showSlider("prev");
});
  
  let unAcceptClick;
  const showSlider = (type) => {
    nextButton.style.pointerEvents = "none";
    prevButton.style.pointerEvents = "none";
    carousel.classList.remove("prev", "next");
    let items = document.querySelectorAll(".carousel .list .item");
    if (type === "next") {
      listHTML.appendChild(items[0]);
      carousel.classList.add("next");
    } else {
      let positionLast = items.length - 1;
      listHTML.prepend(items[positionLast]);
      carousel.classList.add("prev");
    }

    clearTimeout(unAcceptClick);
    unAcceptClick = setTimeout(() => {
      nextButton.style.pointerEvents = "auto";
      prevButton.style.pointerEvents = "auto";
    }, 2000);
  };

  seeMoreButtons.forEach((button) => {
    button.onclick = function () {
      carousel.classList.add("showDetail");
    };
  });
  backButton.onclick = function () {
    carousel.classList.remove("showDetail");
  };

  /* Cart */

  let iconCart = document.querySelector(".icon-cart");
  let closeBtn = document.querySelector(".cartTab .btn button.close");
  let body = document.querySelector("body");
  let listProductHTML = document.querySelector(".listProduct");
  let listCartHTML = document.querySelector(".listCart");
  let iconCartSpan = document.querySelector(".icon-cart span");

  let listProduct = [];
  let carts = [];
  let info = [];

  iconCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });
  closeBtn.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });

  // Assume listProduct is already defined elsewhere

  const addDataToHTML = () => {
    listProductHTML.innerHTML = "";

    // Check if listProduct array is already populated
    if (listProduct.length > 0) {
      // If yes, use the existing data
      displayProducts(listProduct);
    } else {
      // If not, fetch data from JSON file
      fetch('products.json')
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  };

  const displayProducts = (products) => {
    if (products.length > 0) {
      products.forEach((product) => {
        let newProduct = document.createElement("div");
        newProduct.classList.add("unit");
        newProduct.classList.add("pro");
        newProduct.classList.add("product");
        newProduct.dataset.id = product.id;
        newProduct.innerHTML = `
          <img src="${product.image}" alt="img not found" onclick="window.location.href='${product.location}'">
          <div class="description" onclick="window.location.href='${product.location}'">
            <span>${product.Cname}</span>
            <h5>${product.Pname}</h5>
            <div class="star">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </div>      
            <h4>${product.price}</h4>
          </div>
          <button class="addCart">
            Add To Cart
            <i class="fa fa-shopping-cart"></i>
          </button>
        `;
        listProductHTML.appendChild(newProduct);
      });
    }
  };


  listProductHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("addCart")) {
      let product_id = positionClick.parentElement.dataset.id;
      addToCart(product_id);
    }
  });

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

  const addCartToMemory = () => {
    localStorage.setItem("cart", JSON.stringify(carts));
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
                <img src="${info.image}" alt="">
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

  let listCart = [];
  function addCart($idProduct){
    let productCopy = JSON.parse(JSON.stringify(product));

    if(!listCart[$idProduct]){
      let dataProduct = productCopy.filter(
        product => product.id == $idProduct
      )[0];

      listCart[$idProduct] = dataProduct;
      listCart[$idProduct].quantity = 1;
    }else{

      listCart[$idProduct].quantity++;
    }
  }


  const initApp = () => {
    // get data from json
    fetch("products.json")
      .then((resposne) => resposne.json())
      .then((data) => {
        listProduct = data;
        addDataToHTML();

        // get cart from memory
        if (localStorage.getItem("cart")) {
          carts = JSON.parse(localStorage.getItem("cart"));
          addCartToHTML();
        }
      });
  };
  initApp();
;
