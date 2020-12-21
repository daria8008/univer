const serverUrl = "https://my-json-server.typicode.com/daria8008/univer/";

export async function ajax(path) {
    try {
        const response = await fetch(serverUrl + path);
        const responseBody = await response.json();
        
        return responseBody;
    } catch (err) {
        console.error('AJAX call error: ', err);
    }
}