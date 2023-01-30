
export async function getIp(url = '', token = '') {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        //credentials
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }

    });
    return response.json();
}

export async function postData(url = '', data = {}, headers = {}) {

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        //credentials
        headers: headers,
        body: JSON.stringify(data)
    });
    return response.json();

}

export async function deleteData(url = '', token = '') {
    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        //credentials
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: null
    });
    return response.json();

}