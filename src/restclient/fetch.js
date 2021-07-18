const defaultError = {
    errors: [{
        "status": "error",
        "message": "Error while completing the operation."
    }]
};

export const fetchRequest = function (url, request) {
    return new Promise((resolve, reject) => {
        fetch(url, request)
            .then(res => res.json())
            .then(response => {
                if (response !== null && response !== undefined) {
                    let errors = response.errors;
                    if (errors != null && errors !== undefined) {
                        return reject(errors.length > 0 ? response : defaultError);
                    }
                    resolve(response);
                } else {
                    reject(defaultError);
                }
            })
            .catch(error => {
                if (error !== null && error !== undefined && error instanceof TypeError) {
                    reject({errors: [{message: error.message}]});
                } else {
                    reject({errors: [{message: error}]})
                }
            });
    });
}


export const fileFetchRequest = function (url, request) {
    return new Promise((resolve, reject) => {
        fetch(url, request)
            .then(res => res.blob())
            .then(response => {
                if (response !== null && response !== undefined) {
                    let errors = response.errors;
                    if (errors != null && errors !== undefined) {
                        return reject(errors.length > 0 ? response : defaultError);
                    }
                    resolve(response);
                } else {
                    reject(defaultError);
                }
            })
            .catch(error => {
                if (error !== null && error !== undefined && error instanceof TypeError) {
                    reject({errors: [{message: error.message}]});
                } else {
                    reject({errors: [{message: error}]})
                }
            });
    });
};