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

    // Convertir IP a número para comparar rangos
    const ipToLong = (ip) => ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0);

    const ipNum = ipToLong(ip);

    // Rangos no públicos
    const ranges = [
        // Reservado
        [ipToLong('0.0.0.0'), ipToLong('0.255.255.255')],
        // CGNAT
        [ipToLong('100.64.0.0'), ipToLong('100.127.255.255')],
        // Loopback 
        [ipToLong('127.0.0.0'), ipToLong('127.255.255.255')],
        // Link-local 
        [ipToLong('169.254.0.0'), ipToLong('169.254.255.255')],
        // Privada 
        [ipToLong('172.16.0.0'), ipToLong('172.31.255.255')],
        // 192.0.0.0/24 Reservado
        [ipToLong('192.0.0.0'), ipToLong('192.0.0.255')],
        // 192.0.2.0/24 Test-net-1
        [ipToLong('192.0.2.0'), ipToLong('192.0.2.255')],
        // Privada 
        [ipToLong('192.168.0.0'), ipToLong('192.168.255.255')],
        // 198.18.0.0/15 Prueba de red
        [ipToLong('198.18.0.0'), ipToLong('198.19.255.255')],
        // 198.51.100.0/24 Test-net-2
        [ipToLong('198.51.100.0'), ipToLong('198.51.100.255')],
        // 203.0.113.0/24 Test-net-3
        [ipToLong('203.0.113.0'), ipToLong('203.0.113.255')],
        // Multicast 224.0.0.0 - 239.255.255.255
        [ipToLong('224.0.0.0'), ipToLong('239.255.255.255')],
        // Reservado 240.0.0.0 - 255.255.255.254
        [ipToLong('240.0.0.0'), ipToLong('255.255.255.254')],
        // 192.88.99.0/24 Anycast
        [ipToLong('192.88.99.0'), ipToLong('192.88.99.255')],
    ];

    for (const [start, end] of ranges) {
        if (ipNum >= start && ipNum <= end) return false;
    }

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