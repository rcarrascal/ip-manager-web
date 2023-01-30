
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
export const ipValid = (event) => {
    return /^((?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])[.]){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/.test(event);

}