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


let iconCart2 = document.querySelector(".icon-cart");
let closeBtn2 = document.querySelector(".cartTab .btn button.close");
let body2 = document.querySelector("body");

iconCart2.addEventListener("click", () => {
  body2.classList.toggle("activeTabCart");
});
closeBtn2.addEventListener("click", () => {
  body2.classList.toggle("activeTabCart");
});
