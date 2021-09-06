function deleteBookById(book_id) {
  const confirmation = confirm("Are you sure you want to delete this book?");

  console.log("confirmation", confirmation);

  if (confirmation) {
    fetch(`http://127.0.0.1:5000/delete/${book_id}`).then((response) => {
      console.log("response", response);
      if (response.status < 399 && response.status >= 200) {
        location.reload();
      }
    });
  }
}

function editBookById(book) {
  localStorage.setItem("edit-book", JSON.stringify(book));
  window.location.href = "edit_book.html";
}

window.onload = () => {
  const user_id = localStorage.getItem("user_id");

  console.log("user_id", user_id);

  fetch(`http://127.0.0.1:5000/view_books/${user_id}`).then(function (
    booksResponse
  ) {
    if (booksResponse.status >= 200 && booksResponse.status < 400) {
      // get all products
      booksResponse.json().then(function (books) {
        const booksElement = document.getElementById("table-body");

        for (let i = 0; i < books.data.length; i++) {
          const book = books.data[i];

          console.log("book", book);

          // creating main element for book
          const row = document.createElement("tr");

          const title_col = document.createElement("td");
          const category_col = document.createElement("td");
          const price_col = document.createElement("td");
          const actions_col = document.createElement("td");

          const edit_button = document.createElement("button");
          const delete_button = document.createElement("button");

          edit_button.innerText = "Edit";
          delete_button.innerText = "Delete";

          edit_button.onclick = function () {
            editBookById(book);
          };

          delete_button.onclick = function () {
            deleteBookById(book.id);
          };

          // author: "test";
          // category: "test";
          // description: "test";
          // filename: "login-header-img.png";
          // price: "123";
          // title: "test";

          // changing text of books
          title_col.innerText = book.title;
          category_col.innerText = book.category;
          price_col.innerText = book.price;

          actions_col.append(edit_button);
          actions_col.append(delete_button);

          // appending the text to the book
          row.append(title_col);
          row.append(category_col);
          row.append(price_col);
          row.append(actions_col);

          // appending the product to the main container
          booksElement.append(row);
        }
      });
    }
  });
};
