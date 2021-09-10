function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  const productsElement = document.getElementById("products-container");
  const product = productsElement.children[index];
  productsElement.removeChild(product);
}

window.onload = function () {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const productsElement = document.getElementById("products-container");
  const checkoutTotalTextElement = document.getElementById(
    "checkout-total-text"
  );
  console.log(cart);

  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];

    // creating main element for product
    const container = document.createElement("div");

    // adding products-item class
    container.classList.add("products-item");

    // creating text elements
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const price = document.createElement("p");
    const category = document.createElement("p");
    const image = document.createElement("img");
    const button = document.createElement("button");

    button.onclick = function () {
      removeFromCart(i);
    };

    // changing text of products
    
    title.innerText = product.title;
    description.innerText = product.description.substring(0, 100) + "...";
    category.innerText = product.category;
    image.src = "http://127.0.0.1:5000/view_image/" + product.filename;
    price.innerText = product.price;

    total = total + Number(product.price.replace("R", ""));

    button.innerText = "Remove From Cart";

    // appending the text to the product
    container.append(image);
    container.append(title);
    container.append(description);
    container.append(category);
    container.append(price);
    container.append(button);

    // appending the product to the main container
    productsElement.append(container);
  }

  checkoutTotalTextElement.innerText = "R " + total;
};
