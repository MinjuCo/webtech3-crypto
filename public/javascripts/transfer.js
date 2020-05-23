document.querySelector("#btnSend").addEventListener("click", () => {
  let receiver = document.querySelector("#receiver").value;
  let coins = document.querySelector("#coins").value;
  let reason = document.querySelector("#reason").value;
  let message = document.querySelector("#message").value;
  let date = new Date()

  if(receiver != "" && (coins && !isNaN(coins)) && reason != "" && (userCoins-coins >= 0)){
    fetch(base_url + '/api/v1/transfers/', {
      method: "post",
      'headers':{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({
        "transfer": {
          "sender": userUserName,
          "receiver": receiver,
          "coins": parseFloat(coins),
          "reason": reason,
          "message": message,
          "date": date
        }
      })
    }).then(result => {
      return result.json();
    }).then(json => {
      if(json.status === "success"){
        let transferJson = json;

        fetch(base_url + '/users/coinsTransfered/' + userUserName, {
          method: "put",
          'headers':{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          body: JSON.stringify({
            "coins": -coins
          })
        }).then(result => {
            return result.json();
        }).then(json => {
            if(json.status === "success"){
              fetch(base_url + '/users/coinsTransfered/' + transferJson.data.transfer.receiver, {
                method: "put",
                'headers':{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                body: JSON.stringify({
                  "coins": transferJson.data.transfer.coins.$numberDecimal
                })
              }).then(result => {
                  return result.json();
              }).then(json => {
                  if(json.status === "success"){
                    primus.write({
                      "action": "updatePage"
                    });
                  }
                  console.log(json);
              }).catch(err => {
                  console.log(err);
              });

              primus.write({
                "action": "updateTransfer",
                "data": transferJson
              });

              //Success message
              document.querySelector(".info").classList.add("green");
              document.querySelector(".info").classList.remove("red");
              document.querySelector(".info--text").innerHTML = "The coins has been transfered successfully.";
            }
            console.log(json);
        }).catch(err => {
            console.log(err);
        });

      }else{
        document.querySelector(".info").classList.remove("green");
        document.querySelector(".info").classList.add("red");
        document.querySelector(".info--text").innerHTML = json.message.message;
      }
      
      document.querySelector("#receiver").value = "";
      document.querySelector("#coins").value = "";
      document.querySelector("#reason").value = "";
      document.querySelector("#message").value = "";
    }).catch(err => {
      console.log(err);
    });
  }else{

    if(!coins || isNaN(coins)){
      document.querySelector(".info").classList.remove("green");
      document.querySelector(".info").classList.add("red");
      document.querySelector(".info--text").innerHTML = "You must write a number";
    }

    if(userCoins - coins < 0 ){
      document.querySelector(".info").classList.remove("green");
      document.querySelector(".info").classList.add("red");
      document.querySelector(".info--text").innerHTML = "Your balance is to low";
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