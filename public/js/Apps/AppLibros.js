import { Alquiler,Reserva } from "../Constant.js";
import {postAlquiler} from "../Services/AlquilerService.js";
import {GetLibrosFiltrados} from "../Services/LibrosService.js";

let main = document.querySelector("main");

export const iniciarCatalogo = () =>{
  var input_filtro = document.getElementById("filtro");   
  var filtro = input_filtro.value;   
  let libros = GetLibrosFiltrados(filtro);
  maquetarLibros(libros);

  //Evitar que al apretar enter en el input retorne a index.html
  input_filtro.addEventListener('keypress', e => {
    if(e.keyCode == 13)
      e.preventDefault();
  });

  //Se realiza una petición de libros con el filtro y se maquetan los libros cada vez que el input cambia
  input_filtro.addEventListener("input", () => {           
    main.removeChild(divLibros);
    filtro = input_filtro.value;
    maquetarLibros(GetLibrosFiltrados(filtro));
  });
}

const maquetarLibros = (libros) =>{
  let divLibros = document.createElement("div");
  divLibros.setAttribute("id", "divLibros")
  let section = document.createElement("section");
  section.setAttribute("id", "section-tarjetas");

  libros.then(libros => {
    if (libros != 0){
      libros.forEach(libro => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        let p = document.createElement("p");
        let tituloLibro = document.createElement("h5");       
        let buttonAlquiler = document.createElement("button");
        let buttonReserva = document.createElement("button");      
        let buttonImg = document.createElement("button"); 
        let infoLibro = "Autor: " + libro.autor + "\n Editorial: " + libro.editorial + "\n Edicion: " + libro.edicion;
        
        div.classList.add("tarjeta");
        img.classList.add("imagen-libro");
        buttonAlquiler.classList.add("buttonAlquiler");
        buttonReserva.classList.add("buttonReserva");
        buttonImg.classList.add("buttonImg");
        
        buttonAlquiler.innerText = "Alquilar";
        buttonReserva.innerText = "Reservar";
        img.src = libro.imagen;
        tituloLibro.innerText = libro.titulo;
        p.innerText = libro.titulo;
        p.innerText = infoLibro;
        
        buttonImg.appendChild(img);       
        div.append(buttonImg,tituloLibro,p,buttonAlquiler,buttonReserva);
        section.appendChild(div);
        divLibros.appendChild(section);
    
        maquetarPopup(img, libro);
        eventoAlquiler(buttonAlquiler, libro.isbn);
        eventoAlquiler(buttonReserva, libro.isbn);
      });
    }
  });
  main.appendChild(divLibros);
};

const maquetarPopup = (img, libro) =>{
  img.addEventListener("click", ()=>{
    let divPopup = document.createElement("div");
    let div = document.createElement("div");
    let titulo = document.createElement("h2");
    let cerrar = document.createElement("button");
    let resumen = document.createElement("p");
    let img = document.createElement("img");
    let subtitulo = document.createElement("h4");
    let info1 = document.createElement("p");
    let info2 = document.createElement("p");

    
    div.classList.add("popup");
    divPopup.classList.add("divPopup");
    resumen.classList.add("resumen");
    info1.setAttribute("id", "info");
    cerrar.setAttribute("id", "cerrar");
    subtitulo.innerText = "Sinópsis:";
    info1.innerHTML = `
    <b>ISBN</b>: ${libro.isbn} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Autor</b>: ${libro.autor} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Género</b>: ${libro.genero}
    <br>        
    `;
    info2.innerHTML = ` 
    <b>Editorial</b>: ${libro.editorial} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Edición</b>: ${libro.edicion}
    `;
    cerrar.innerText = "x";
    titulo.innerText = libro.titulo;
    resumen.innerText = libro.sinopsis;
    img.src = libro.imagen;
    div.append(titulo, img,subtitulo,resumen,info1,info2, cerrar);

    divPopup.appendChild(div);   

    main.appendChild(divPopup);
    cerrar.addEventListener("click", () => {
      let div = document.querySelector(".divPopup");
      main.removeChild(div);
    });
  });
}

const eventoAlquiler = (button, isbn) =>{
  button.addEventListener("click", ()=>{
    var fecha = new Date();    
    var fechaNormalizada = fecha.getDate() + "-" + (fecha.getMonth() +1) + "-" + fecha.getFullYear();

    if(button.className == "buttonAlquiler"){
      const alquiler = new Alquiler(isbn,fechaNormalizada);
      const responseAlquiler = postAlquiler(alquiler);
      maquetarPopupAlquiler(responseAlquiler, 1);
    }
    else{
      const reserva = new Reserva(isbn,fechaNormalizada);
      const responseReserva = postAlquiler(reserva);
      maquetarPopupAlquiler(responseReserva, 2);
    }
  });
}

const maquetarPopupAlquiler = (response, opcion) =>{
  let divPopup = document.createElement("div");
  let cerrar = document.createElement("button");
  let popup = document.createElement("div");
  let titulo = document.createElement("h2");
  let info = document.createElement("p");
  let buttonAceptar = document.createElement("button");

  buttonAceptar.classList.add("buttonAceptar");
  popup.classList.add("popup");
  divPopup.classList.add("divPopup");
  info.classList.add("pAlquiler");
  cerrar.setAttribute("id", "cerrar");

  cerrar.innerText = "x";
  buttonAceptar.innerText = "Aceptar";

  if(opcion==1){
    titulo.innerText = "¡Su alquiler se realizó correctamente!";
    response.then(res =>{
      info.innerText = "El número de su alquiler es: " + res.id + "\n"
      + "Recuerde que la devolución se debe efectuar dentro de los próximos 7 días.";
    });  
  }
  else{
    titulo.innerText = "¡Su reserva se realizó correctamente!";
    response.then(res =>{
      info.innerText = "El número de su reserva es: " + res.id + "\n Recuerde este número para poder alquilar su reserva.";
    });  
  }  

  popup.append(titulo, cerrar,info,buttonAceptar);
  divPopup.appendChild(popup);  
  main.appendChild(divPopup);
  cerrarPopup(cerrar);  
  cerrarPopup(buttonAceptar); 
}

const cerrarPopup = (boton)=>{
  boton.addEventListener("click", () => {
    let div = document.querySelector(".divPopup");
    main.removeChild(div);

    let divLibros = document.getElementById("divLibros");
    main.removeChild(divLibros);  

    let libros = GetLibrosFiltrados("");
    maquetarLibros(libros);
  });
}