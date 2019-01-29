'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _arguments = arguments;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getObjectFirstProperty = function getObjectFirstProperty() {
    var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var key in object) {
        return [key, object[key]];
    }
};

var deleteObjectFirstProperty = function deleteObjectFirstProperty() {
    var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var key in object) {
        delete object[key];
        return;
    }
};

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

service.postMultipart = function (url) {
    var par = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var taskCallback = arguments[3];

    var hasUrl = headerExceptRequestURLs.some(function (exceptURL) {
        return exceptURL === url;
    });

    var _getObjectFirstProper = getObjectFirstProperty(par),
        _getObjectFirstProper2 = _slicedToArray(_getObjectFirstProper, 2),
        _getObjectFirstProper3 = _getObjectFirstProper2[0],
        name = _getObjectFirstProper3 === undefined ? '' : _getObjectFirstProper3,
        _getObjectFirstProper4 = _getObjectFirstProper2[1],
        filePath = _getObjectFirstProper4 === undefined ? '' : _getObjectFirstProper4;

    deleteObjectFirstProperty(par);
    var header = options.headers ? options.headers : {};
    if (!hasUrl) {
        headerOptions.forEach(function (headers) {
            header[headers[0]] = headers[1];
        });
    }
    return new Promise(function (resolve, reject) {
        var task = wx.uploadFile({
            url: '' + service.defaults.baseURL + url,
            filePath: filePath,
            name: name,
            header: header,
            formData: par,
            success: function success(res) {
                resolve(res);
            },
            fail: function fail(res) {
                reject(res);
            }
        });
        if (taskCallback) taskCallback(task);
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

service.download = function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var taskCallback = arguments[2];

    var hasUrl = headerExceptRequestURLs.some(function (exceptURL) {
        return exceptURL === url;
    });
    var filePath = options.filePath ? options.filePath : null;
    var header = options.headers ? options.headers : {};
    if (!hasUrl) {
        headerOptions.forEach(function (headers) {
            header[headers[0]] = headers[1];
        });
    }
    return new Promise(function (resolve, reject) {
        var task = wx.downloadFile({
            url: '' + service.defaults.baseURL + url,
            header: header,
            filePath: filePath,
            success: function success(res) {
                resolve(res);
            },
            fail: function fail(res) {
                reject(res);
            }
        });
        if (taskCallback) taskCallback(task);
    });
};

exports.default = service;