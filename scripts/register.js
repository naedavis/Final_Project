// REGISTER FUNCTION
document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    console.log("Registering");
    event.preventDefault();
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const city = document.getElementById("city").value;

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("city", city);

    fetch("http://127.0.0.1:5000/registration/", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        if (response.status < 400 && response.status >= 200) {
          // register was successfull
          console.log("response", response);
          // do redirect to login screen
          window.location.href = "./login.html";
        }
      })
      .catch(function (error) {
        console.log("there was error with registering");
        console.log("error", error);
      });
  });
