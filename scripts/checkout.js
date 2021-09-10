const resetFields = () => {
  document.getElementById("address_line_1").value = "";
  document.getElementById("address_line_2").value = "";
  document.getElementById("city").value = "";
  document.getElementById("region").value = "";
  document.getElementById("postal_code").value = "";
  document.getElementById("country").value = "";
  document.getElementById("card_number").value = "";
  document.getElementById("card_holder").value = "";
  document.getElementById("cvv").value = "";
  document.getElementById("expiry_date").value = "";
};

document
  .getElementById("checkout-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const jwtToken = localStorage.getItem("jwt-token");

    // first check if user is logged in
    fetch("http://127.0.0.1:5000/protected/", {
      headers: {
        Authorization: "JWT " + jwtToken,
      },
    }).then((response) => {
      // if not logged in (status code is >= 400) redirect them to the login screen
      if (response.status >= 200 && response.status < 400) {
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
              resetFields();
              Toastify({
                text: "Payment has been processed!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                // backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true, // Prevents dismissing of toast on hover
              }).showToast();
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }
    });
  });

window.onload = function () {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]"),
    productsElement = document.getElementById("products-container"),
    checkoutShippingTextElement = document.getElementById(
      "checkout-shipping-text"
    ),
    checkoutSubtotalTextElement = document.getElementById(
      "checkout-subtotal-text"
    ),
    checkoutTotalTextElement = document.getElementById("checkout-total-text");

  const shippingTotal = cart.length * 100;

  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];

    // creating main element for product
    const container = document.createElement("div");

    // adding products-item class
    container.classList.add("products-item");

    // creating text elements
    const title = document.createElement("h3");
    const price = document.createElement("p");
    const category = document.createElement("p");
    const image = document.createElement("img");
    const button = document.createElement("button");

    button.onclick = function () {
      removeFromCart(i);
    };

    // changing text of products

    title.innerText = product.title;
    category.innerText = product.category;
    image.src = "http://127.0.0.1:5000/view_image/" + product.filename;
    price.innerText = product.price;

    total = total + Number(product.price.replace("R", ""));

    button.innerText = "X";

    // appending the text to the product
    container.append(image);
    container.append(title);
    container.append(category);
    container.append(price);
    container.append(button);

    // appending the product to the main container
    productsElement.append(container);
  }

  checkoutTotalTextElement.innerText = "TOTAL: R " + (total + shippingTotal);
  checkoutSubtotalTextElement.innerText = "R " + total;
  checkoutShippingTextElement.innerText = "R " + shippingTotal;
};
