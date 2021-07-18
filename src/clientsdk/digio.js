let loaded = false;

function submit(id, identifier) {
    return new Promise((resolve, reject) => {
        let options = {
            environment: "sandbox", callback: function (response) {
                if (response.hasOwnProperty("error_code")) {
                    reject(response);
                } else {
                    resolve(response);
                }
            }
        };
        let digio = new Digio(options);
        digio.init();
        digio.submit(id, identifier);
    })
}

export const digioSubmit = async (documentId, identifier) => {
    if (loaded) {
        return submit(documentId, identifier);
    }
    try {
        await load();
        return submit(documentId, identifier);
    } catch (e) {
        return Promise.reject(e);
    }
};

const load = () => {
    return new Promise((resolve) => {
        if (!loaded) {
            const script = document.createElement('script');
            if (script.readyState) {  // only required for IE <9
                script.onreadystatechange = function () {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        loaded = true;
                        resolve();
                    }
                };
            } else {
                script.onload = function () {
                    loaded = true;
                    resolve();
                };
            }
            script.src = 'https://app.digio.in/sdk/v8/digio.js';
            script.setAttribute('async', '');
            document.head.appendChild(script);
        } else {
            resolve();
        }
    });
};