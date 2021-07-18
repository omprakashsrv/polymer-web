import {fetchRequest, fileFetchRequest} from "./fetch";

export const sendUploadRequest = function (url, formData) {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    let request = {
        method: "POST",
        body: formData
    };
    return fetchRequest(url, request);
};

export const sendRequest = function (url) {
    let request = {
        method: "GET"
    };
    return fileFetchRequest(url, request);
};