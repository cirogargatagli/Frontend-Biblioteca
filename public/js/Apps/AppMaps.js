import {crearMapa} from "../Services/MapsService.js";

//Geteo y creo etiquetas necesarias
let main = document.querySelector("main");
let boton = document.getElementById("ubicacion");
let popupMap = document.createElement("div");
let popup = document.createElement("div");
let maps = document.createElement("div");
let cerrar = document.createElement("button");
let titulo = document.createElement("h2");

//Agrego clases 
popup.classList.add("popupMap");
maps.setAttribute("id", "maps");
popupMap.classList.add("divPopup");
cerrar.setAttribute("id", "cerrar");

cerrar.innerText = "x";
titulo.innerText = "¡Acercate a la biblioteca para retirar tus alquileres o reservas!";

//Asigno hijos
popup.append(titulo,maps,cerrar);
popupMap.appendChild(popup);

boton.addEventListener("click", (e)=>{
  e.preventDefault();
  main.appendChild(popupMap);
  crearMapa();
  eventoCerrarPopup(cerrar);
})

const eventoCerrarPopup = (boton)=>{
  boton.addEventListener("click", () => {
    main.removeChild(popupMap);  
  });
}