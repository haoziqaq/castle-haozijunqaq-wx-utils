import axios from 'axios'

let headerExceptRequestURLs = [];
let headerOptions = [];

const service = axios.create();
service.withCredentials = true;

service.defaults.adapter = (config) => {
    return new Promise((resolve, reject) => {
        const { url , params: data, headers: header, method } = config;
        wx.request({
            url,
            header,
            method,
            data,
            success(res) {
                resolve(res)
            },
            fail(res) {
                reject(res);
            },
        })
    })
};

service.interceptors.request.use(config => {
    let hasUrl = headerExceptRequestURLs.some(url => url === config.url);
    if (!hasUrl) {
        headerOptions.forEach((header) => {
            config.headers[header[0]] = header[1];
        });
    }
    return config;
}, error => {
    Promise.reject(error)
});

service.getData = (url, par, options = {}) => {
    let taskCallback = typeof arguments[arguments.length - 1] === 'function' ? arguments[arguments.length - 1] : null;
    let queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    if (par) {
        let params = Object.assign(queryParams.params, par);
        queryParams = {
            params
        }
    }
    queryParams = Object.assign(queryParams, options);
    return new Promise((resolve, reject) => {
        service.get(url, queryParams)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
};

service.postData = (url, par, options = {}) => {
    let queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    if (par) {
        let params = Object.assign(queryParams.params, par);
        queryParams = {
            params
        }
    }
    queryParams = Object.assign(queryParams, options);
    return new Promise((resolve, reject) => {
        service.post(url, null, queryParams)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
};

service.postJSON = (url, par, options = {headers: {'Content-Type': 'application/json'}}) => {
    let queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    if (par) {
        let params = Object.assign(queryParams.params, par);
        queryParams = {
            params
        }
    }
    queryParams = Object.assign(queryParams, options);
    return new Promise((resolve, reject) => {
        service.post(url, null, queryParams)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
};

service.setBaseUrl = (baseURL) => {
    service.defaults.baseURL = baseURL;
};

service.getBaseUrl = (baseURL) => service.defaults.baseURL;

service.setTimeout = (time) => {
    service.defaults.timeout = time;
};

service.getTimeout = (time) => service.defaults.timeout;

service.addHeader = (key = '', value = '') => {
    headerOptions.push([key, value])
};

service.resetHeaders = () => {
    headerOptions = [];
};

service.setHeadersExcept = (URLs = []) => {
    headerExceptRequestURLs = URLs;
};

service.changeIsWithCredentials = (isWithCredentials) => {
    service.withCredentials = isWithCredentials;
};


export default service;
