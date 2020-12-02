const URLBASEBIBLIOTECA = "https://localhost:44302/api/";

const GETLIBROS = URLBASEBIBLIOTECA + "libros?stock=true";

const GETMISALQUILERES = URLBASEBIBLIOTECA + "alquiler/cliente/1";

const POSTALQUILER = URLBASEBIBLIOTECA + "alquiler";

// Clases

class Alquiler {
    constructor(isbn,fecha){
        this.clienteID = 1;
        this.isbn = isbn;
        this.fechaAlquiler = fecha;
    }
}
class Reserva {
    constructor(isbn,fecha){
        this.clienteID = 1;
        this.isbn = isbn;
        this.fechaReserva = fecha;
    }
}

export {GETMISALQUILERES,POSTALQUILER,GETLIBROS, Alquiler, Reserva};