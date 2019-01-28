'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _arguments = arguments;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headerExceptRequestURLs = [];
var headerOptions = [];

var service = _axios2.default.create();
service.withCredentials = true;

service.defaults.adapter = function (config) {
    return new Promise(function (resolve, reject) {
        var url = config.url,
            data = config.params,
            header = config.headers,
            method = config.method;

        wx.request({
            url: url,
            header: header,
            method: method,
            data: data,
            success: function success(res) {
                resolve(res);
            },
            fail: function fail(res) {
                reject(res);
            }
        });
    });
};

service.interceptors.request.use(function (config) {
    var hasUrl = headerExceptRequestURLs.some(function (url) {
        return url === config.url;
    });
    if (!hasUrl) {
        headerOptions.forEach(function (header) {
            config.headers[header[0]] = header[1];
        });
    }
    return config;
}, function (error) {
    Promise.reject(error);
});

service.getData = function (url, par) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var taskCallback = typeof _arguments[_arguments.length - 1] === 'function' ? _arguments[_arguments.length - 1] : null;
    var queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    if (par) {
        var params = Object.assign(queryParams.params, par);
        queryParams = {
            params: params
        };
    }
    queryParams = Object.assign(queryParams, options);
    return new Promise(function (resolve, reject) {
        service.get(url, queryParams).then(function (res) {
            resolve(res);
        }).catch(function (error) {
            reject(error);
        });
    });
};

service.postData = function (url, par) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    if (par) {
        var params = Object.assign(queryParams.params, par);
        queryParams = {
            params: params
        };
    }
    queryParams = Object.assign(queryParams, options);
    return new Promise(function (resolve, reject) {
        service.post(url, null, queryParams).then(function (res) {
            resolve(res);
        }).catch(function (error) {
            reject(error);
        });
    });
};

service.postJSON = function (url, par) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { headers: { 'Content-Type': 'application/json' } };

    var queryParams = {
        params: {
            _t: new Date().getTime()
        }
    };
    if (par) {
        var params = Object.assign(queryParams.params, par);
        queryParams = {
            params: params
        };
    }
    queryParams = Object.assign(queryParams, options);
    return new Promise(function (resolve, reject) {
        service.post(url, null, queryParams).then(function (res) {
            resolve(res);
        }).catch(function (error) {
            reject(error);
        });
    });
};

service.setBaseUrl = function (baseURL) {
    service.defaults.baseURL = baseURL;
};

service.getBaseUrl = function (baseURL) {
    return service.defaults.baseURL;
};

service.setTimeout = function (time) {
    service.defaults.timeout = time;
};

service.getTimeout = function (time) {
    return service.defaults.timeout;
};

service.addHeader = function () {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    headerOptions.push([key, value]);
};

service.resetHeaders = function () {
    headerOptions = [];
};

service.setHeadersExcept = function () {
    var URLs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    headerExceptRequestURLs = URLs;
};

service.changeIsWithCredentials = function (isWithCredentials) {
    service.withCredentials = isWithCredentials;
};

exports.default = service;