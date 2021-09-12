window.onload = () => {
  const jwtToken = localStorage.getItem("jwt-token");

  // first check if user is logged in
  fetch("https://books-online-final.herokuapp.com/protected/", {
    headers: {
      Authorization: "JWT " + jwtToken,
    },
  }).then((response) => {
    // if not logged in (status code is >= 400) redirect them to the login screen
    if (response.status >= 400) {
      localStorage.setItem(
        "snack-message",
        "You need to be logged in to add a new book."
      );
      window.location.href = "login.html";
    } else {
      fetch(`https://books-online-final.herokuapp.com/view_all_books_by_user/`, {
        headers: {
          Authorization: "JWT " + jwtToken,
        },
      }).then(function (booksResponse) {
        if (booksResponse.status >= 200 && booksResponse.status < 400) {
          // get all products
          booksResponse.json().then(function (books) {
            const booksElement = document.getElementById("table-body");

            for (let i = 0; i < books.data.length; i++) {
              const book = books.data[i];

              // creating main element for book
              const row = document.createElement("tr");

              const title_col = document.createElement("td");
              const category_col = document.createElement("td");
              const price_col = document.createElement("td");
              const actions_col = document.createElement("td");
              actions_col.classList.add("actions-col");

              const edit_button = document.createElement("button");
              const delete_button = document.createElement("button");

              edit_button.innerText = "Edit";
              edit_button.classList.add("button");

              delete_button.innerText = "Delete";
              delete_button.classList.add("button");
              delete_button.classList.add("delete-button");

              edit_button.onclick = function () {
                editBookById(book);
              };

              delete_button.onclick = function () {
                deleteBookById(book.id);
              };

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
    }
  });
};
