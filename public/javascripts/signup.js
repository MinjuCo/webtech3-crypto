let base_url = "http://localhost:3000";

let btnSignup = document.querySelector('#btnSignup').addEventListener("click", () => {
  let firstname = document.querySelector('#firstname').value.trim();
  let lastname = document.querySelector('#lastname').value.trim();
  let email = document.querySelector('#email').value.trim();
  let password = document.querySelector('#password').value.trim();
  let repeatPassword = document.querySelector('#repeatPassword').value.trim();

  if(firstname != "" && lastname != "" && email.includes('@student.thomasmore.be') && (password == repeatPassword && password != "")){
    fetch(base_url + '/users/signup', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "firstname": firstname,
        "lastname": lastname,
        "username": email,
        "password": password
      })
    }).then(response => {
      return response.json();
    }).then(json => {
      if(json.status === "success"){
        document.querySelector(".info").classList.add("green");
        document.querySelector(".info").classList.remove("red");
        document.querySelector(".info--text").innerHTML = "Sign up completed!";

        let token = json.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/";
      }
    });
  }else{
    if(password == "" || password != repeatPassword){
      document.querySelector(".info").classList.remove("green");
      document.querySelector(".info").classList.add("red");
      document.querySelector(".info--text").innerHTML = "Your passwords does not match";
    }

    if(email == "" || !email.includes('@student.thomasmore.be')){
      document.querySelector(".info").classList.remove("green");
      document.querySelector(".info").classList.add("red");
      document.querySelector(".info--text").innerHTML = "The email should end with @student.thomasmore.be";
    }

    if(lastname == ""){
      document.querySelector(".info").classList.remove("green");
      document.querySelector(".info").classList.add("red");
      document.querySelector(".info--text").innerHTML = "You must write your last name";
    }

    if(firstname == ""){
      document.querySelector(".info").classList.remove("green");
      document.querySelector(".info").classList.add("red");
      document.querySelector(".info--text").innerHTML = "You must write your first name";
    }
  }
});