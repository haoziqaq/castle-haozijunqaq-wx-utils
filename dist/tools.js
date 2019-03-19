'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    $showModal: function $showModal(title, content) {
        var showCancel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var cancelText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '取消';
        var cancelColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#000000';
        var confirmText = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '确定';
        var confirmColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '#576B95';

        return new Promise(function (resolve, reject) {
            wx.showModal({
                title: title,
                content: content,
                showCancel: showCancel,
                cancelText: cancelText,
                cancelColor: cancelColor,
                confirmText: confirmText,
                confirmColor: confirmColor,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $showLoading: function $showLoading(title) {
        var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        return new Promise(function (resolve, reject) {
            wx.showLoading({
                title: title,
                mask: mask,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $showActionSheet: function $showActionSheet(itemList) {
        var itemColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#000000';

        return new Promise(function (resolve, reject) {
            wx.showActionSheet({
                itemList: itemList,
                itemColor: itemColor,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $hideToast: function $hideToast() {
        return new Promise(function (resolve, reject) {
            wx.hideToast({
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $hideLoading: function $hideLoading() {
        return new Promise(function (resolve, reject) {
            wx.hideLoading({
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $showToast: function $showToast(title) {
        var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
        var image = arguments[2];
        var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1500;
        var mask = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        return new Promise(function (resolve, reject) {
            wx.showToast({
                title: title,
                icon: icon,
                image: image,
                duration: duration,
                mask: mask,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $openSetting: function $openSetting() {
        return new Promise(function (resolve, reject) {
            wx.openSetting({
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $canvasToTempFilePath: function $canvasToTempFilePath() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var destWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var destHeight = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
        var canvasId = arguments[6];
        var fileType = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'png';
        var quality = arguments[8];

        return new Promise(function (resolve, reject) {
            wx.canvasToTempFilePath({
                x: x,
                y: y,
                width: width,
                height: height,
                destWidth: destWidth,
                destHeight: destHeight,
                canvasId: canvasId,
                fileType: fileType,
                quality: quality,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
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
    $saveImageToPhotosAlbum: function $saveImageToPhotosAlbum(filePath) {
        var _this = this;

        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success: function success(res) {
                _this.$showToast('保存成功');
            },
            fail: function fail(e) {
                if (e.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                    _this.$openSetting().then(function (settingData) {
                        if (settingData.authSetting["scope.writePhotosAlbum"]) {
                            _this.$showToast('请重新保存');
                            callback();
                        } else {
                            _this.$showToast('获取权限失败', 'none');
                        }
                    });
                } else {
                    _this.$showToast('保存失败', 'none');
                }
            }
        });
    },
    $getSystemInfo: function $getSystemInfo() {
        return new Promise(function (resolve, reject) {
            wx.getSystemInfo({
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $getImageInfo: function $getImageInfo(src) {
        return new Promise(function (resolve, reject) {
            wx.getImageInfo({
                src: src,
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