import {get, post} from "./Request.js";

import {GETMISALQUILERES, POSTALQUILER} from "../Constant.js"

const getAlquileres = () => {
   return get(GETMISALQUILERES);
}

const postAlquiler = (alquiler) =>{
    return post(POSTALQUILER,alquiler);
}

export {postAlquiler,getAlquileres};