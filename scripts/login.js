// LOGIN FUNCTION
document.getElementById("my-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("https://books-online-final.herokuapp.com/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status < 200 || response.status > 399) {
        throw response.statusText;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data["access_token"]) {
        myStorage = window.localStorage;
        myStorage.setItem("jwt-token", data["access_token"]);
        myStorage.setItem("username", username);
        window.location.href = "shop.html";
      }
    })
    .catch((error) => {
      console.log("catch error", error);
    });
});

// show snack message
window.onload = () => {
  const message = localStorage.getItem("snack-message") || "";

  if (message && message != "") {
    console.log("message", message);
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      // backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      stopOnFocus: true, // Prevents dismissing of toast on hover
      callback: function () {
        localStorage.setItem("snack-message", "");
      },
    }).showToast();
  }
};
