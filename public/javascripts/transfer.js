document.querySelector("#btnSend").addEventListener("click", () => {
  let receiver = document.querySelector("#receiver").value;
  let coins = document.querySelector("#coins").value;
  let reason = document.querySelector("#reason").value;
  let message = document.querySelector("#message").value;
  let date = new Date()

  console.log(receiver);
  console.log(reason);
  console.log(message);

  if(receiver != "" && (coins && !isNaN(coins)) && reason != ""){
    fetch(base_url + '/api/v1/transfers/', {
      method: "post",
      'headers':{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "transfer": {
          "sender": "Mina",
          "receiver": receiver,
          "coins": parseFloat(coins),
          "reason": reason,
          "message": message,
          "date": date
        }
      })
    }).then(result => {
      console.log(result);
      return result.json();
    }).then(json => {
      primus.write({
        "action": "updateTransfer",
        "data": json
      });

      if(json.status === "success"){
        document.querySelector(".info").classList.add("success");
        document.querySelector(".info").classList.remove("error");
        document.querySelector(".info--text").innerHTML = "The coins has been trasnfered successfully.";
      }else{
        document.querySelector(".info").classList.remove("success");
        document.querySelector(".info").classList.add("error");
        document.querySelector(".info--text").innerHTML = json.message.message;
      }
      console.log(json);
    }).catch(err => {
      console.log(err);
    });
  }else{

    if(!coins || isNaN(coins)){
      document.querySelector(".info").classList.remove("green");
      document.querySelector(".info").classList.add("red");
      document.querySelector(".info--text").innerHTML = "You must write a number";
    }

    if(reason == ""){
      document.querySelector(".info").classList.remove("green");
      document.querySelector(".info").classList.add("red");
      document.querySelector(".info--text").innerHTML = "You must fill a reason";
    }

    if(receiver == ""){
      document.querySelector(".info").classList.remove("green");
      document.querySelector(".info").classList.add("red");
      document.querySelector(".info--text").innerHTML = "You must give an email";
    }
  }
});