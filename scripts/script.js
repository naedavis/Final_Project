// LOGIN FUNCTION 
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username);
    console.log(password);
    fetch("https://flask-eomp.herokuapp.com/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["access_token"]) {
          console.log(data);
          myStorage = window.localStorage;
          myStorage.setItem("jwt-token", data["access_token"]);
          myStorage.setItem("username", username);
          myStorage.setItem("password", password);
          window.location.href = "shop.html";
        }
      });
  }
  
  
  // REGISTER FUNCTION
  document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
  
    fetch("https://flask-eomp.herokuapp.com/registration/", {
      method: "POST",
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.status < 400 && response.status >= 200) {
          // register was successfull
          console.log("response", response);
          // do redirect to login screen
          window.location.href = "./login.html"
        }
      })
      .catch(function (error) {
        console.log("there was error with registering");
        console.log("error", error);
      });
  });