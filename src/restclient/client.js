const baseUrl = "http://localhost:3000/";
import {sendRequest, sendUploadRequest} from "./request";

const uploadEndPoint = baseUrl + "upload";
const downloadEndPoint = baseUrl + "download";

export const upload = function (file, identifier) {
    return new Promise(async (resolve, reject) => {
        try {
            let formData = new FormData();
            formData.append('file', file);
            let response = await sendUploadRequest(uploadEndPoint + "?identifier=" + identifier,
                formData);
            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
}

export const download = function (documentId) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await sendRequest(downloadEndPoint + "?document_id=" + documentId);
            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
}