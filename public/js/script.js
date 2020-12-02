import {iniciarCatalogo} from "./Apps/AppLibros.js";
import {iniciarMisAlquileres} from "./Apps/AppMisAlquileres.js"

let main = document.querySelector("main");
let links = document.querySelectorAll(".links");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    location.hash = e.target.innerText;
  });
});

if (location.hash) {
  let url = location.hash.split("#")[1] + ".html";
  ajax("get", url);
}

//Cuando la url de la página cambie, hacemos una petición ajax 
window.addEventListener("hashchange", () => {
  let pagina = location.hash.split("#")[1];
  let url = pagina + ".html";
  ajax("get", url, (response) => {
    main.innerHTML = response;
    switch (pagina){
      case "Cat%C3%A1logo":
        iniciarCatalogo();
        break;
      case "Mis%20Alquileres":
        iniciarMisAlquileres();           
        break;
    }
  });
});

//Header estático
window.onscroll = function () { fixed() };
let header = document.getElementById("navId");
let sticky = header.offsetTop;
function fixed() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//Función ajax - petición a una url
function ajax(metodo, url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(metodo, url);

  xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
      callback(xhr.response);
    }
  });
  xhr.send();
}