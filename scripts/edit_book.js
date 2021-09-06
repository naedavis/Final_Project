// get book from localstorage and set the form
window.onload = () => {
  const book = JSON.parse(localStorage.getItem("edit-book") || "");
  console.log("book", book);

  if (book.id) {
    fetch(`http://127.0.0.1:5000/view_book_by_id/${book.id}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 399) {
          return response.json();
        }
      })
      .then(({ data }) => {
        console.log("data", data);
        // const files = document.getElementById("book_image").files;
        document.getElementById("book_title").value = data.title;
        document.getElementById("author").value = data.author;
        document.getElementById("description").value = data.description;
        document.getElementById("category").value = data.category;
        document.getElementById("price").value = data.price;

        document.getElementById("book-image").src =
          "http://127.0.0.1:5000/view_image/" + data.filename;
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

    fetch(`http://127.0.0.1:5000/edit/${book.id}`, {
      method: "PUT",
      body: formData,
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
