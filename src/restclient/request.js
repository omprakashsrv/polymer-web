import {fetchRequest} from "./fetch";

export const sendRequest = function sendRequest(url, body) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept-Encoding", "gzip");
    let request = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    };
    return fetchRequest(url, request);
};