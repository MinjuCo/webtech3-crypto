let base_url = "https://imdcoin.herokuapp.com";
let userName;
let userCoins;
let userUserName;
let currentUserId;

primus = Primus.connect(base_url, {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

primus.on('data', (json) => {
  if(json.action === "updateTransfer"){
    appendTransfer(json.data);
  }

  if(json.action == "updatePage"){
    fetchUser();
  }

});

let appendTransfer = (json) => {
  
  let newTransfer =`<div class="transaction">`
    if(json.data.transfer.receiver === "Mina"){
      newTransfer += `<h5 class="green">Received from</h5>
      <div class="transaction__header"><h4>${json.data.transfer.sender}</h4><h5 class="green">${json.data.transfer.coins.$numberDecimal} IMDC</h5></div>`;
    }else{
      newTransfer += `<h5 class="red">Sended to</h5>
      <div class="transaction__header"><h4>${json.data.transfer.receiver}</h4><h5 class="red">- ${json.data.transfer.coins.$numberDecimal} IMDC</h5></div>`;
    }

    newTransfer += `<div class="transaction__body">
      <h6 class="transaction__subject">${json.data.transfer.reason}</h6>
      <p class="transaction__description">${json.data.transfer.message}</p>
    </div>
    </div>`;
    document.querySelector("#transactionHistory__title").insertAdjacentHTML('afterend', newTransfer);
}

let fetchUser = () =>{
  fetch(base_url + "/users", {
    //Authorization
    'headers': {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  }).then(result => {
    return result.json();
  }).then(json => {
    if(json.status === "success"){
      userName = json.user.name;
      userUserName = json.user.username;
      userCoins = json.user.coins.$numberDecimal;
      currentUserId = json.user.id;
  
      document.querySelector("h1").innerHTML = "Welcome, " + userName;
      document.querySelector(".coinValue").innerHTML = userCoins;
    }
  }).catch(err => {
    console.log(err);
  });
}

if(!localStorage.getItem("token")){
  window.location.href = "/login";
}

fetchUser();

//Get transfers
fetch(base_url + "/api/v1/transfers", {
  //Authorization
  'headers': {
    'Authorization': 'Bearer ' + localStorage.getItem("token")
  }
}).then(result => {
  return result.json();
}).then(json => {
  console.log(json);
  json.data.transfers.forEach(transfer => {
    let newTransfer =`<div class="transaction">`
    if(transfer.receiver === userUserName){
      newTransfer += `<h5 class="green">Received from</h5>
      <div class="transaction__header"><h4>${transfer.sender}</h4><h5 class="green">${transfer.coins.$numberDecimal} IMDC</h5></div>`;
    }else{
      newTransfer += `<h5 class="red">Sended to</h5>
      <div class="transaction__header"><h4>${transfer.receiver}</h4><h5 class="red">- ${transfer.coins.$numberDecimal} IMDC</h5></div>`;
    }

    newTransfer += `<div class="transaction__body">
      <h6 class="transaction__subject">${transfer.reason}</h6>
      <p class="transaction__description">${transfer.message}</p>
    </div>
    </div>`;
    document.querySelector("#transactionHistory__title").insertAdjacentHTML('afterend', newTransfer);
  });
}).catch(err => {
  console.log(err);
  window.location.href = "/login";
})