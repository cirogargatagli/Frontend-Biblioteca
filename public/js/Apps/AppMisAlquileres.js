import {getAlquileres} from "../Services/AlquilerService.js";

let main = document.querySelector("main");

export const iniciarMisAlquileres = () =>{
    let misAlquileres = getAlquileres();
    maquetarMisAlquileres(misAlquileres); 
}

const maquetarMisAlquileres = (misAlquileres) =>{
    let divMisAlquileres = document.createElement('div');
    let divMisReservas = document.createElement('div');
    let sectionAlquileres = document.createElement("section");
    let sectionReservas = document.createElement("section");
    let subtituloAlquileres = document.createElement("h2");
    let subtituloReservas = document.createElement("h2");
    let divGeneral = document.createElement("div");    
  
    divMisAlquileres.classList.add("divMisAlquileres");
    divMisReservas.classList.add("divMisReservas");
    divGeneral.classList.add("divGeneral");
    subtituloAlquileres.classList.add("subtitulo");;
    subtituloReservas.classList.add("subtitulo");
    sectionAlquileres.setAttribute("id", "section-alquileres");
    sectionReservas.setAttribute("id", "section-reservas");
  
    subtituloAlquileres.innerText = "Mis alquileres";  
    subtituloReservas.innerText = "Mis reservas";
  
    divMisAlquileres.appendChild(subtituloAlquileres); 
    divMisReservas.appendChild(subtituloReservas);
    
    misAlquileres.then((misAlquileres) => {        
        let alqYres = separarAlqRes(misAlquileres);

        if (alqYres.alquileres == 0){
            let sinAlquileres = document.createElement("h5");
            sinAlquileres.innerText = "⚠️ No existen alquileres hasta el momento. ¡Dirijase al catálogo para ver nuestros libros! 📚";
            divMisAlquileres.appendChild(sinAlquileres);
        }
        if (alqYres.reservas == 0){
            let sinAlquileres = document.createElement("h5");
            sinAlquileres.innerText = "⚠️ No existen reservas hasta el momento. ¡Dirijase al catálogo para ver nuestros libros! 📚";
            divMisReservas.appendChild(sinAlquileres);
        }

        alqYres.alquileres.forEach(alquiler =>{
            let alquilerMaquetado = maquetarTarjetasAlquiler(alquiler,1);    
            sectionAlquileres.appendChild(alquilerMaquetado);    
            
        });
        alqYres.reservas.forEach(reserva =>{
            let reservaMaquetada = maquetarTarjetasAlquiler(reserva,2);
            sectionReservas.appendChild(reservaMaquetada);
            
        });
        mostrarTarjetas(sectionAlquileres);
        mostrarTarjetas(sectionReservas);
        divMisReservas.appendChild(sectionReservas); 
        divMisAlquileres.appendChild(sectionAlquileres);  
        divGeneral.appendChild(divMisAlquileres);
        divGeneral.appendChild(divMisReservas);
    });
    main.appendChild(divGeneral);
}

const separarAlqRes = (array) =>{
    var alqYres = {
        alquileres: [],
        reservas: []
    }
    array.forEach(elem =>{
        if(elem.fechaAlquiler == null){
            alqYres.reservas.push(elem);
        }
        else{
            alqYres.alquileres.push(elem);
        }
    })
    return alqYres;
}

const maquetarTarjetasAlquiler = (alquiler, opcion) =>{
    //Creamos los nodos necesarios
    let div = document.createElement("div");
    let p = document.createElement("p");
    let estado = document.createElement("h3");
    let img = document.createElement("img");
    let divEstado = document.createElement("div");
    let divImg = document.createElement("div") 
    let divInfo = document.createElement("div");
    let tituloLibro = document.createElement("h4");
    let nroAlquiler = document.createElement("p");

    //Agregamos clases y id's 
    img.classList.add("imagen-misAlquileres");
    div.classList.add("tarjeta-alquiler");
    p.classList.add("datos-alquiler");
    estado.classList.add("estado");
    divImg.classList.add("divImg");
    estado.setAttribute("id", "estado");
    nroAlquiler.setAttribute("id", "nroAlquiler");
    
    nroAlquiler.innerText = "Número de transacción: " + alquiler.alquilerId;
    let infoAlquiler = "ISBN: " + alquiler.isbn + "\n" + "Autor: "+ alquiler.autor+ "\n" + "Editorial: " + alquiler.editorial + "\n" + "Edición: " + alquiler.edicion;
    tituloLibro.innerText = alquiler.titulo;
    img.src = alquiler.imagen;
    p.innerText = infoAlquiler;

    divImg.appendChild(img);
    divInfo.appendChild(p);      
    div.append(divEstado,divImg,nroAlquiler,tituloLibro,divInfo);

    switch(opcion){
        case 1:
            let divDevolucion = document.createElement("div");
            divDevolucion.classList.add("divDevolucion");
            let devolucion = document.createElement("h3"); 
            devolucion.setAttribute("id", "estado-devolucion");

            devolucion.innerText =  "Hasta " +alquiler.fechaDevolucion.substring(0,10); 
            estado.innerText =  "Alquilado el " +alquiler.fechaAlquiler.substring(0,10);

            divEstado.appendChild(estado);
            divDevolucion.appendChild(devolucion);
            div.appendChild(divDevolucion);
            return div;  
        case 2:
            estado.innerText = "Reservado el: " + alquiler.fechaReserva.substring(0,10);
            divEstado.appendChild(estado);
            return div;     
    }
}

const mostrarTarjetas = (section) =>{          
    let tarjetas = section.childNodes;
    
    let cantTarjetas = 0;
    tarjetas.forEach(tarjeta =>{        
        tarjeta.style.display = "block";
        if (cantTarjetas > 2){
            tarjeta.style.display = "none";           
        }
        cantTarjetas++;        
    });   

    if (cantTarjetas > 3){
        let verMas = document.createElement("button");
        verMas.classList.add("verMas");
        verMas.innerText = "Ver más...";
        section.appendChild(verMas);
        
        verMas.addEventListener("click", () =>{
            let i = 0;
            let hayEscondidas = false;
            tarjetas.forEach(tarjeta =>{
                if(tarjeta.style.display == "none" && i < 3){
                    tarjeta.style.display = "block";
                    i++;                  
                }
                if(tarjeta.style.display == "none"){
                    hayEscondidas = true;
                }
            })
            if(!hayEscondidas){
                section.removeChild(verMas);
            }
        })
    }
}