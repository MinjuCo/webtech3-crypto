const receiverInput = document.querySelector("#receiver");
const usersList = [];
fetch(base_url + "/api/v1/leaderboard", {}).then(result => {
  return result.json();
}).then(json => {
  console.log(json);
  json.data.users.forEach(user => {
    usersList.push(user.username);
  });

  console.log(usersList);
}).catch(err => {
  console.log(err);
})

/* FROM W3SCHOOLS */

let autocomplete = (input, array) => {
  var currentFocus;
  input.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      item = document.createElement("DIV");
      item.setAttribute("id", this.id + "autocomplete__list");
      item.setAttribute("class", "autocomplete__items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(item);
      /*for each item in the array...*/
      for (i = 0; i < array.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (array[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          matchingItem = document.createElement("DIV");
          /*make the matching letters bold:*/
          matchingItem.innerHTML = "<strong>" + array[i].substr(0, val.length) + "</strong>";
          matchingItem.innerHTML += array[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          matchingItem.innerHTML += "<input type='hidden' value='" + array[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          matchingItem.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              input.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          item.appendChild(matchingItem);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  input.addEventListener("keydown", function(e) {
      var list = document.getElementById(this.id + "autocomplete__list");
      if (list) list = list.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(list);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(list);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (list) list[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete__items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != input) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

autocomplete(receiverInput, usersList);