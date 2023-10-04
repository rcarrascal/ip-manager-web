
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

    // Expresión regular para cualquier dirección IP privada
    // RANGOS: 192.168.0.0 a 192.168.255.255, 10.0.0.0 a 10.255.255.255 y 172.16.0.0 a 172.31.255.255    
    const privateIPRegex = /^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)/;

    if (privateIPRegex.test(ip)) {
        return true;  
    }  

    return false;
}