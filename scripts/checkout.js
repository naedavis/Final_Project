document
  .getElementById("checkout-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const address_line_1 = document.getElementById("address_line_1").value;
    const address_line_2 = document.getElementById("address_line_2").value;
    const city = document.getElementById("city").value;
    const region = document.getElementById("region").value;
    const postal_code = document.getElementById("postal_code").value;
    const country = document.getElementById("country").value;
    const card_number = document.getElementById("card_number").value;
    const card_holder = document.getElementById("card_holder").value;
    const cvv = document.getElementById("cvv").value;
    const expiry_date = document.getElementById("expiry_date").value;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const jwtToken = localStorage.getItem("jwt-token");

    const bookIds = [];
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
      const book = cart[i];
      total = total + Number(book.price.replace("R", ""));
      bookIds.push({ id: book.id });
    }

    const clearCart = () => {localStorage.setItem("cart") || "[]"};
    const formData = new FormData();
    formData.append("address_line_1", address_line_1);
    formData.append("address_line_2", address_line_2);
    formData.append("city", city);
    formData.append("region", region);
    formData.append("postal_code", postal_code);
    formData.append("country", country);
    formData.append("card_number", card_number);
    formData.append("card_holder", card_holder);
    formData.append("cvv", cvv);
    formData.append("expiry_date", expiry_date);
    formData.append("books", JSON.stringify(bookIds));
    formData.append("total", total);

    fetch("http://127.0.0.1:5000/create_payment/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "JWT " + jwtToken,
      },
    })
    .then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        showToast();
        clearCart();
      }
    })
      .catch(function (error) {
        console.log("error", error);
      });
  });

window.onload = function () {
  fetch("http://127.0.0.1:5000/payments/").then(function (booksResponse) {
    console.log("booksResponse", booksResponse);
  });
};
