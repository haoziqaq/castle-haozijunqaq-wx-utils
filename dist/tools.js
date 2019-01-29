'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
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
    $navigateBack: function $navigateBack(delta) {
        return new Promise(function (resolve, reject) {
            wx.navigateBack({
                delta: delta,
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