
import { Store } from 'react-notifications-component';

/**
 * Metodo encargado para envair notificaciones 
 * personalizadas. 
 * 
 * @param {*} type 
 * @param {*} title 
 * @param {*} message 
 */
export function notification(type, title, message) {

    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
        }
    });

}
/**
 * Metodo para valdiar si una ip es valida.
 * @param {*} event 
 * @returns 
 */
export const ipValid = (ip) => {

    const privateIPRegex = /^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)/;
    const publicIPRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (publicIPRegex.test(ip) && !privateIPRegex.test(ip)) {
        return true;  
    }  
    return false;
}

/**
 * Metodo para valdiar los octetos de una ip.
 * @param {*} event 
 * @returns 
 */
export const validateOctetos  = (ip ) => {

    const octetos = ip.split(".");

    for (let i = 0; i < octetos.length; i++) {
        let octeto = octetos[i];
        // Convertir el octeto a un número entero        
        let numero = parseInt(octeto);

        // Verificar si el número que tiene el valor absoluto es igual al octeto original        
        if (numero.toString() !== octeto) {
            return false;
        }
    }
    return true;
}