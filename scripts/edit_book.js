const showToast = () => {
  Toastify({
    text: "Book updated successfully!",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    // backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();
};

const getBookData = () => {
  const book = JSON.parse(localStorage.getItem("edit-book") || "");

  if (book.id) {
    fetch(`https://books-online-final.herokuapp.com/view_book_by_id/${book.id}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 399) {
          return response.json();
        }
      })
      .then(({ data }) => {
        // const files = document.getElementById("book_image").files;
        document.getElementById("book_title").value = data.title;
        document.getElementById("author").value = data.author;
        document.getElementById("description").value = data.description;
        document.getElementById("category").value = data.category;
        document.getElementById("price").value = data.price;

        document.getElementById("book-image").src =
          "https://books-online-final.herokuapp.com/view_image/" + data.filename;
      });
  }
};

document
  .getElementById("edit-book-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const book = JSON.parse(localStorage.getItem("edit-book") || "");

    // const files = document.getElementById("book_image").files;
    const book_title = document.getElementById("book_title").value;
    const author = document.getElementById("author").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;

    // console.log("files", files);

    const formData = new FormData();
    // formData.append("file", files[0]);
    formData.append("book_title", book_title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);

    fetch(`https://books-online-final.herokuapp.com/edit/${book.id}`, {
      method: "PUT",
      body: formData,
    })
      .then(function (response) {
        if (response.status >= 200 && response.status < 400) {
          showToast();
          getBookData();
        }
      })
      .catch(function (error) {
        console.log("there was error with registering");
        console.log("error", error);
      });
  });

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
        "You need to be logged in to edit a book."
      );
      window.location.href = "login.html";
    } else {
      getBookData();
    }
  });
};
