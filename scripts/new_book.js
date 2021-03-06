const clearFields = () => {
  document.getElementById("book_image").value = "";
  document.getElementById("book_title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
  document.getElementById("price").value = "";
};

const showToast = () => {
  Toastify({
    text: "Book added successfully!",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    // backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();
};

document.getElementById("new-book-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const files = document.getElementById("book_image").files;
  const book_title = document.getElementById("book_title").value;
  const author = document.getElementById("author").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;

  const formData = new FormData();
  formData.append("file", files[0]);
  formData.append("book_title", book_title);
  formData.append("author", author);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("price", price);

  fetch("https://books-online-final.herokuapp.com/add_books/", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "JWT " + localStorage.getItem("jwt-token"),
    },
  })
    .then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        showToast();
        clearFields();
      }
    })
    .catch(function (error) {
      console.log("there was error with registering");
      console.log("error", error);
    });
});

window.onload = () => {

  // first check if user is logged in
  fetch("https://books-online-final.herokuapp.com/protected/", {
    headers: {
      Authorization: "JWT " + localStorage.getItem("jwt-token"),
    },
  }).then((response) => {
    // if not logged in (status code is >= 400) redirect them to the login screen
    if (response.status >= 400) {
      localStorage.setItem(
        "snack-message",
        "You need to be logged in to add a new book."
      );
      window.location.href = "login.html";
    }
  });
};
