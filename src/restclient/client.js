const baseUrl = "http://localhost:3000/";
import {sendRequest} from "./request";

const uploadEndPoint = baseUrl + "upload";
export const uploadPdf = function (file) {
    return new Promise(async (resolve, reject) => {
        try {
            let formData = new FormData();
            formData.append('file', file);
            let response = await sendRequest(uploadEndPoint, formData);
            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
}