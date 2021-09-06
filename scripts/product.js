function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}
// PRODUCTS FUNCTION
// load products when page loads
window.onload = function () {
  fetch("http://127.0.0.1:5000/view_books/").then(function (booksResponse) {
    if (booksResponse.status >= 200 && booksResponse.status < 400) {
      // get all products
      booksResponse.json().then(function (books) {
        const booksElement = document.getElementById("books-container");

        for (let i = 0; i < books.data.length; i++) {
          const book = books.data[i];

          console.log("book", book);

          // creating main element for book
          const container = document.createElement("div");

          // adding books-item class
          container.classList.add("books-item");

          // creating text elements
          const title = document.createElement("p");
          const description = document.createElement("p");
          const price = document.createElement("p");
          const category = document.createElement("p");
          const image = document.createElement("img");
          const button = document.createElement("button");

          button.onclick = function () {
            addToCart(book);
          };

          // author: "test";
          // category: "test";
          // description: "test";
          // filename: "login-header-img.png";
          // price: "123";
          // title: "test";

          // changing text of books
          title.innerText = book.title;
          description.innerText = book.description;
          category.innerText = book.category;
          price.innerText = book.price;
          image.src = "http://127.0.0.1:5000/view_image/" + book.filename;
          button.innerText = "Add To Cart";

          // appending the text to the book
          container.append(title);
          container.append(description);
          container.append(category);
          container.append(price);
          container.append(image);
          container.append(button);

          // appending the product to the main container
          booksElement.append(container);
        }
      });
    }
  });
};
