function addToCart(product){
    const cart = JSON.parse(localStorage.getItem("cart")||"[]");
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart))
}
// PRODUCTS FUNCTION
// load products when page loads
window.onload = function () {
    // get authorization token from local storage
    const jwtToken = localStorage.getItem("jwt-token");
  
    console.log("jwtToken", jwtToken);
  
    // first check if user is logged in
    fetch("https://flask-eomp.herokuapp.com/protected/", {
      headers: {
        Authorization: "jwt " + jwtToken,
      },
    })
      .then(function (response) {
        console.log("response", response);
  
        if (response.status >= 200 && response.status < 400) {
          // user is logged in and can show the products
  
          fetch("https://flask-eomp.herokuapp.com/view_products/").then(function (
            productsResponse
          ) {
            if (productsResponse.status >= 200 && productsResponse.status < 400) {
              // get all products
              productsResponse.json().then(function (products) {
                const productsElement = document.getElementById("products-container");
  
                for (let i = 0; i < products.data.length; i++) {
                  const product = products.data[i];
  
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
                    addToCart(product);
                  }
  
                  // changing text of products
                  title.innerText = product[1];
                  description.innerText = product[2];
                  category.innerText = product[3];
                  price.innerText = product[4];
                  button.innerText = "Add To Cart";
  
                  // appending the text to the product
                  container.append(title);
                  container.append(description);
                  container.append(category);
                  container.append(price);
                  container.append(button);
  
                  // appending the product to the main container
                  productsElement.append(container);
                }
              });
  
            }
          });
        } else {
          // user not logged in
          // show not logged in message
          const productsElement = document.getElementById("products-container");
          const message = document.createElement("p");
  
          message.innerText = "You need to be logged in to see the products.";
  
          productsElement.append(message);
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };