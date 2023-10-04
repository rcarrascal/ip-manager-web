export async function getData(url = '', token = '') {
    const timeout = 10000; // 10 segundos (ajusta el valor según tus necesidades)
  
    const controller = new AbortController();
    const signal = controller.signal;
  
    const fetchPromise = fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
        //credentials
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
      body: null,
      signal, // Pasamos la señal del controlador
    });
  
    // Configuramos el tiempo límite
    setTimeout(() => {
      controller.abort(); // Abortamos la solicitud si se excede el tiempo límite
    }, timeout);
  
    const response = await fetchPromise;

  
    return response.json();
}

export async function logout(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        //credentials
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response.json();
}

export async function postData(url = '', data = {}, headers = {}) {
    const timeout = 10000; // 10 segundos (ajusta el valor según tus necesidades)
  
    const controller = new AbortController();
    const signal = controller.signal;
  
    const fetchPromise = fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: headers,
      body: JSON.stringify(data),
      signal, // Pasamos la señal del controlador
    });
  
    // Configuramos el tiempo límite
    setTimeout(() => {
      controller.abort(); // Abortamos la solicitud si se excede el tiempo límite
    }, timeout);
  
    const response = await fetchPromise;

  
    return response.json();
  }
export async function deleteData(url = '', token = '') {
    const timeout = 10000; // 10 segundos (ajusta el valor según tus necesidades)
  
    const controller = new AbortController();
    const signal = controller.signal;
  
    const fetchPromise = fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
        //credentials
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
      body: null,
      signal, // Pasamos la señal del controlador
    });
  
    // Configuramos el tiempo límite
    setTimeout(() => {
      controller.abort(); // Abortamos la solicitud si se excede el tiempo límite
    }, timeout);
  
    const response = await fetchPromise;

  
    return response.json();

}