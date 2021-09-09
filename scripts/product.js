function addToCart(book) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
}
// PRODUCTS FUNCTION
// load products when page loads
window.onload = function () {
  fetch("http://127.0.0.1:5000/view_books/").then(function (booksResponse) {
    if (booksResponse.status >= 200 && booksResponse.status < 400) {
      // get all products
      booksResponse.json().then(function (books) {
        const booksElement = $("#pagination-container");

        booksElement.pagination({
          dataSource: books.data,
          pageSize: 12,
          locator: "items",
          callback: function (data, pagination) {
            const element = document.createElement("div");
            element.classList.add("books-container");

            for (let i = 0; i < data.length; i++) {
              const book = data[i];

              // creating main element for book
              const container = document.createElement("div");

              // adding books-item class
              container.classList.add("books-item");

              // creating text elements
              const title = document.createElement("h2");
              const description = document.createElement("q");
              const price = document.createElement("p");
              const category = document.createElement("p");
              const image = document.createElement("img");
              const button = document.createElement("button");

              button.onclick = function () {
                addToCart(book);
              };

              // changing text of books
              title.innerText = book.title;
              description.innerText =
                book.description.substring(0, 100) + "...";
              category.innerText = book.category;
              price.innerText = book.price;
              image.src = "http://127.0.0.1:5000/view_image/" + book.filename;
              button.innerText = "Add To Cart";

              // appending the text to the book
              container.append(image);
              container.append(title);
              container.append(description);
              container.append(category);
              container.append(price);
              container.append(button);

              // appending the product to the main container
              element.append(container);
            }

            booksElement.prev().html(element);
          },
        });
      });
    }
  });
};
