import {fetchRequest} from "./fetch";

export const sendRequest = function (url, formData) {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    let request = {
        method: "POST",
        body: formData
    };
    return fetchRequest(url, request);
};