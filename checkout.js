document.querySelector('.buttonCheckout').addEventListener('click', function() {
    // Get form input values
    let fullName = document.getElementById('fullname').value.trim();
    let phoneNumber = document.getElementById('phonenumber').value.trim();
    let address = document.getElementById('address').value.trim();
    let country = document.getElementById('country').value.trim();
    let city = document.getElementById('city').value.trim();

    // Check if any of the form fields are empty
    if (!fullName || !phoneNumber || !address || !country || !city) {
        // Show alert if any field is empty
        alert('Please fill out all the fields before proceeding.');
    } else {
        // Proceed with checkout if all fields are filled
        localStorage.removeItem('cart'); // Remove the cart items from localStorage
        window.location.href = 'index.html'; // Redirect to the index.html page
        alert('Congratulations! Your order has been placed. Thank you for shopping!');
    }
});

// let cart = JSON.parse(localStorage.getItem("cart"));
// console.log(cart);
// let listProductInCart = [];

// const initApp = () => {
//   fetch("products.json")
//     .then((resposne) => resposne.json())
//     .then((data) => {
//       console.log(data);
//       cart.forEach((element) => {
//         // console.log(element);
//         data.forEach((productData) => {
//           // console.log(productData);
//           if (productData["id"] == element["product_id"]) {
//             productData["quantity"] = element["quantity"];
//             listProductInCart.push(productData);
//           }
//         });
//       });

//       console.log(listProductInCart); // Saare products jo bhi cart me hein unki data bhi is array me hai or is array me jo bhi object hai, usme product ki quantity bhi hai jo cart me thi
//     });
// };
// initApp();