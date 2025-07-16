
function handleApiError(error: any) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        throw new Error('La solicitud ha superado el tiempo de espera. Si el problema persiste, comunicarse con soporte por favor.');
    }
    if (typeof error === 'object' && error.message) {
        throw error;
    }
    throw {
        message: "Error desconocido, comunicarse con soporte por favor",
    };
}

export async function getData(url = '', token = '') {
    const timeout = 10000; // 10 segundos

    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: null,
            signal: AbortSignal.timeout(timeout),
        });
        return response.json();
    } catch (error: any) {
        handleApiError(error);
    }
}

export async function logout(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

export async function postData(url = '', data = {}, headers = {}) {
    const timeout = 10000; // 10 segundos

    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: headers,
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(timeout),
        });
        return response.json();
    } catch (error: any) {
        handleApiError(error);
    }
}

export async function deleteData(url = '', token = '') {
    const timeout = 10000; // 10 segundos

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: null,
            signal: AbortSignal.timeout(timeout),
        });
        return response.json();
    } catch (error: any) {
        handleApiError(error);
    }
}