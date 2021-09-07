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
    console.log(cart);
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
        // author: "Colleen Hoover"
        // category: "Romance"
        // description: "Lily hasn’t always had it easy, but that’s never stopped her from working hard for the life she wants. She’s come a long way from the small town in Maine where she grew up—she graduated from college, moved to Boston, and started her own business. So when she feels a spark with a gorgeous neurosurgeon named Ryle Kincaid, everything in Lily’s life suddenly seems almost too good to be true"
        // filename: "it-ends-with-us.jpg"
        // id: 1
        // price: "R154,54"
        // title: "It Ends With Us"
        // changing text of products
        title.innerText = product.title;
        description.innerText = product.description;
        category.innerText = product.category;
        price.innerText = product.price;
        
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