let base_url = "http://localhost:3000";

primus = Primus.connect(base_url, {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

primus.on('data', (json) => {
  if(json.action === "addTransfer"){
    appendTransfer(json.data);
  }
});

fetch(base_url + "/api/v1/transfers", {
  //Authorization
}).then(result => {
  return result.json();
}).then(json => {
  json.data.transfers.forEach(transfer => {
    let newTransfer =`<div class="transaction">`
    
    if(transfer.receiver === "Mina"){
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
})