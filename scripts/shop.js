let allbooks = [];

const addToCart = (book) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const showBooks = (category = "All") => {
  const booksElement = $("#pagination-container");

  const filtered = [];
  for (let i = 0; i < allbooks.length; i++) {
    const aBook = allbooks[i];

    if (category == "All") {
      filtered.push(aBook);
    } else if (
      category != "All" &&
      category.toLowerCase() == aBook.category.toLowerCase()
    ) {
      filtered.push(aBook);
    }
  }

  booksElement.pagination({
    dataSource: filtered,
    pageSize: 12,
    locator: "items",
    callback: (data, pagination) => {
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

        button.onclick = () => {
          addToCart(book);
        };

        // changing text of books
        title.innerText = book.title;
        description.innerText = book.description.substring(0, 100) + "...";
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
};

// PRODUCTS FUNCTION
// load products when page loads
window.onload = () => {
  fetch("http://127.0.0.1:5000/view_books/").then(function (booksResponse) {
    if (booksResponse.status >= 200 && booksResponse.status < 400) {
      // get all products
      booksResponse.json().then((books) => {
        allbooks = books.data;
        showBooks();
      });
    }
  });
};
