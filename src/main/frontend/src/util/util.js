
import { Store } from 'react-notifications-component';

/**
 * Metodo encargado para envair notificaciones 
 * personalizadas. 
 * 
 * @param {*} type 
 * @param {*} title 
 * @param {*} message 
 */
export function notification(type, title, message, duration = 5000) {

    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration,
            onScreen: true
        }
    });

}
/**
 * Método para validar si una IP es pública y válida.
 * Rechaza IPs privadas, máscaras de subred, y direcciones APIPA.
 * @param {string} ip 
 * @returns {boolean}
 */
export const ipValid = (ip) => {
    // IP válida (formato general)
    const ipFormat = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
    if (!ipFormat.test(ip)) return false;

    // No permitir 255.x.y.z (máscara de subred)
    if (/^255\./.test(ip)) return false;

    // No permitir 169.254.x.y (APIPA)
    if (/^169\.254\./.test(ip)) return false;

    // No permitir IPs privadas
    if (
        /^10\./.test(ip) ||
        /^192\.168\./.test(ip) ||
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip)
    ) return false;

    // No permitir loopback
    if (/^127\./.test(ip)) return false;

    // No permitir 0.x.x.x
    if (/^0\./.test(ip)) return false;

    return true;
};

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