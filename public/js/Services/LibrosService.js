import * as Constant from "../Constant.js";
import { get } from "./Request.js";

export const GetLibrosFiltrados = (filtro) =>{
    let urlLibros = Constant.GETLIBROS;
    if(filtro.value)
        return get(urlLibros);
    return get(urlLibros+ "&autor="+ filtro + "&titulo=" + filtro);
}