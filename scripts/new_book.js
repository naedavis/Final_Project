document.getElementById("new-book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const jwtToken = localStorage.getItem("jwt-token");

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

  fetch("http://127.0.0.1:5000/add_books/", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "JWT " + jwtToken,
    },
  })
    .then(function (response) {
      if (response.status < 400 && response.status >= 200) {
        console.log("response", response);
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
  fetch("http://127.0.0.1:5000/protected/", {
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
    }
  });
};
