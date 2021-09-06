function removeFromCart(index){
    const cart = JSON.parse(localStorage.getItem("cart")||"[]");
    cart.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(cart))
    const productsElement = document.getElementById("products-container");
    const product = productsElement.children[index];
    productsElement.removeChild(product);
}
window.onload = function(){
    const cart = JSON.parse(localStorage.getItem("cart")||"[]");
    const productsElement = document.getElementById("products-container");

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];

        // creating main element for product
        const container = document.createElement("div");

        // adding products-item class
        container.classList.add("products-item");

        // creating text elements
        const title = document.createElement("p");
        const description = document.createElement("p");
        const price = document.createElement("p");
        const category = document.createElement("p");
        const button = document.createElement("button");

        button.onclick = function(){
          removeFromCart(i);
        }

        // changing text of products
        title.innerText = product[1];
        description.innerText = product[2];
        category.innerText = product[3];
        price.innerText = product[4];
        button.innerText = "Remove From Cart";

        // appending the text to the product
        container.append(title);
        container.append(description);
        container.append(category);
        container.append(price);
        container.append(button);

        // appending the product to the main container
        productsElement.append(container);
      }
}