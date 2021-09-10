// LOGIN FUNCTION
document
  .getElementById("my-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("username", username);
    console.log("password", password);

    fetch("http://127.0.0.1:5000/auth", {
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
        console.log("response", response);
        if (response.status < 200 || response.status > 399) {
          throw response.statusText;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data["access_token"]) {
          console.log(data);
          myStorage = window.localStorage;
          myStorage.setItem("jwt-token", data["access_token"]);
          myStorage.setItem("username", username);
          myStorage.setItem("password", password);
          myStorage.setItem("user_id", 1);
          window.location.href = "shop.html";
        }
      })
      .catch((error) => {
        console.log("catch error", error);
      });
  });
