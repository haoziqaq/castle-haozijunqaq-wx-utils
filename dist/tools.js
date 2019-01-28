'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    $downloadFile: function $downloadFile(url) {
        var header = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var filePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        var taskCallback = typeof arguments[arguments.length - 1] === 'function' ? arguments[arguments.length - 1] : null;
        return new Promise(function (resolve, reject) {
            var task = wx.downloadFile({
                url: url,
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
    },
    $uploadFile: function $uploadFile(url, filePath, name) {
        var header = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var formData = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        var taskCallback = typeof arguments[arguments.length - 1] === 'function' ? arguments[arguments.length - 1] : null;
        return new Promise(function (resolve, reject) {
            var task = wx.uploadFile({
                url: url,
                filePath: filePath,
                name: name,
                header: header,
                formData: formData,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(res) {
                    reject(res);
                }
            });
            if (taskCallback) taskCallback(task);
        });
    },
    $switchTab: function $switchTab(url) {
        return new Promise(function (resolve, reject) {
            wx.switchTab({
                url: url,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $reLaunch: function $reLaunch(url) {
        return new Promise(function (resolve, reject) {
            wx.reLaunch({
                url: url,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $redirectTo: function $redirectTo(url) {
        return new Promise(function (resolve, reject) {
            wx.redirectTo({
                url: url,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $navigateTo: function $navigateTo(url) {
        return new Promise(function (resolve, reject) {
            wx.navigateTo({
                url: url,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $navigateBack: function $navigateBack(url) {
        return new Promise(function (resolve, reject) {
            wx.navigateBack({
                url: url,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $chooseImage: function $chooseImage() {
        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var sizeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['original', 'compressed'];
        var sourceType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['album', 'camera'];

        return new Promise(function (resolve, reject) {
            wx.chooseImage({
                count: count,
                sizeType: sizeType,
                sourceType: sourceType,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $setLocal: function $setLocal(key, value) {
        wx.setStorageSync(key, JSON.stringify(value));
    },
    $getLocal: function $getLocal(key) {
        return JSON.parse(wx.getStorageSync(key));
    },
    $removeLocal: function $removeLocal(key) {
        wx.removeStorageSync(key);
    },
    $clearLocal: function $clearLocal() {
        wx.clearStorageSync();
    }
};