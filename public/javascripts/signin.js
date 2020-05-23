let base_url = "http://localhost:3000";

let btnSignin = document.querySelector('#btnSignin').addEventListener("click", () => {
  let email = document.querySelector('#email').value.trim();
  let password = document.querySelector('#password').value.trim();

  
    fetch(base_url + '/users/login', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": email,
        "password": password
      })
    }).then(response => {
      return response.json();
    }).then(json => {
      if(json.status === "success"){

        let token = json.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/";
      }else{
        document.querySelector(".info").classList.add("red");
        document.querySelector(".info").classList.remove("green");
        document.querySelector(".info--text").innerHTML = "Login failed";
      }
    });
});