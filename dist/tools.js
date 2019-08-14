'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
    /**
     * 函数柯里化
     * @param fn {function} 需要函数柯里化的函数
     * @param args 需要被解耦的参数集
     */
    $curring: function $curring(fn) {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return function () {
            for (var _len2 = arguments.length, _args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                _args[_key2] = arguments[_key2];
            }

            return fn.call.apply(fn, [_this].concat(_toConsumableArray(args), _args));
        };
    },


    /**
     * 防抖函数
     * @param method 事件触发的操作
     * @param delay 多少毫秒内连续触发事件，不会执行
     * @returns {Function}
     */
    $debounce: function $debounce(method, delay) {
        var timer = null;
        return function () {
            var self = this;
            var args = arguments;
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(self, args);
            }, delay);
        };
    },


    /**
     * 节流函数
     * @param method 事件触发的操作
     * @param mustRunDelay 间隔多少毫秒需要触发一次事件
     */
    $throttle: function $throttle(method, mustRunDelay) {
        var timer = void 0;
        var args = arguments;
        var start = void 0;
        return function loop() {
            var self = this;
            var now = Date.now();
            if (!start) {
                start = now;
            }
            if (timer) {
                clearTimeout(timer);
            }
            if (now - start >= mustRunDelay) {
                method.apply(self, args);
                start = now;
            } else {
                timer = setTimeout(function () {
                    loop.apply(self, args);
                }, 50);
            }
        };
    },
    $getUserInfo: function $getUserInfo(withCredentials, lang) {
        return new Promise(function (resolve, reject) {
            wx.getUserInfo({
                withCredentials: withCredentials,
                lang: lang,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
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
    $login: function $login(timeout) {
        return new Promise(function (resolve, reject) {
            wx.login({
                timeout: timeout,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $getWeRunData: function $getWeRunData() {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
            wx.getWeRunData({
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    if (e.errMsg.includes('auth')) {
                        wx.showModal({
                            title: '请求授权',
                            content: '小程序需要获取您的微信步数信息',
                            showCancel: false,
                            success: function success() {
                                _this2.$openSetting().then(function (settingData) {
                                    if (settingData.authSetting["scope.werun"]) {
                                        _this2.$showToast('授权成功');
                                        _this2.$getWeRunData().then(function (res) {
                                            resolve(res);
                                        }).catch(function (e) {
                                            reject(e);
                                        });
                                    } else {
                                        _this2.$showToast('授权被拒绝');
                                        reject({ errMsg: 'auth refused' });
                                    }
                                });
                            },
                            fail: function fail() {
                                reject({ errMsg: 'auth refused' });
                            }
                        });
                    } else {
                        _this2.$showToast('获取失败', 'none');
                    }
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
        var _this3 = this;

        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        return new Promise(function (resolve, reject) {
            wx.saveImageToPhotosAlbum({
                filePath: filePath,
                success: function success(res) {
                    _this3.$showToast('保存成功');
                },
                fail: function fail(e) {
                    if (e.errMsg.includes('auth')) {
                        wx.showModal({
                            title: '请求授权',
                            content: '小程序需要写入您的相册',
                            showCancel: false,
                            success: function success() {
                                _this3.$openSetting().then(function (settingData) {
                                    if (settingData.authSetting["scope.writePhotosAlbum"]) {
                                        callback();
                                        _this3.$showToast('授权成功, 请重试保存', 'none');
                                    } else {
                                        _this3.$showToast('授权被拒绝', 'none');
                                        reject({ errMsg: 'auth refused' });
                                    }
                                });
                            },
                            fail: function fail() {
                                reject({ errMsg: 'auth refused' });
                            }
                        });
                    } else {
                        _this3.$showToast('保存失败', 'none');
                    }
                }
            });
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
        try {
            var value = wx.getStorageSync(key);
            if (value) return JSON.parse(value);
        } catch (e) {
            console.log(e);
        }
    },
    $removeLocal: function $removeLocal(key) {
        wx.removeStorageSync(key);
    },
    $clearLocal: function $clearLocal() {
        wx.clearStorageSync();
    },
    $startPullDownRefresh: function $startPullDownRefresh() {
        return new Promise(function (resolve, reject) {
            wx.startPullDownRefresh({
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $stopPullDownRefresh: function $stopPullDownRefresh() {
        return new Promise(function (resolve, reject) {
            wx.stopPullDownRefresh({
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $previewImage: function $previewImage() {
        var urls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return new Promise(function (resolve, reject) {
            wx.previewImage({
                urls: urls,
                current: current,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $requestPayment: function $requestPayment(timeStamp, nonceStr, pack, signType, paySign) {
        return new Promise(function (resolve, reject) {
            wx.requestPayment({
                timeStamp: timeStamp,
                nonceStr: nonceStr,
                package: pack,
                signType: signType,
                paySign: paySign,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $makePhoneCall: function $makePhoneCall(phoneNumber) {
        return new Promise(function (resolve, reject) {
            wx.makePhoneCall({
                phoneNumber: phoneNumber,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail(e) {
                    reject(e);
                }
            });
        });
    },
    $getCurrentMonthLastDay: function $getCurrentMonthLastDay() {
        var date = new Date();
        var currentMonth = date.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        var lastTime = new Date(nextMonthFirstDay - oneDay);
        var month = parseInt(lastTime.getMonth() + 1);
        var day = lastTime.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return new Date(date.getFullYear() + '-' + month + '-' + day);
    }
};