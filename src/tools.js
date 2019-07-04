export default {
    /**
     * 防抖函数
     * @param method 事件触发的操作
     * @param delay 多少毫秒内连续触发事件，不会执行
     * @returns {Function}
     */
    $debounce(method, delay) {
        let timer = null;
        return function () {
            let self = this;
            let args = arguments;
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(self, args);
            },delay);
        }
    },

    /**
     * 节流函数
     * @param method 事件触发的操作
     * @param mustRunDelay 间隔多少毫秒需要触发一次事件
     */
    $throttle(method, mustRunDelay) {
        let timer;
        let args = arguments;
        let start;
        return function loop() {
            let self = this;
            let now = Date.now();
            if(!start){
                start = now;
            }
            if(timer){
                clearTimeout(timer);
            }
            if(now - start >= mustRunDelay){
                method.apply(self, args);
                start = now;
            }else {
                timer = setTimeout(function () {
                    loop.apply(self, args);
                }, 50);
            }
        }
    },

    $getUserInfo(withCredentials, lang) {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials,
                lang,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },

    $showModal(title, content, showCancel = true, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor = '#576B95') {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title,
                content,
                showCancel,
                cancelText,
                cancelColor,
                confirmText,
                confirmColor,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },

    $showLoading(title, mask = false) {
        return new Promise((resolve, reject) => {
            wx.showLoading({
                title,
                mask,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },

    $showActionSheet(itemList, itemColor = '#000000', ) {
        return new Promise((resolve, reject) => {
            wx.showActionSheet({
                itemList,
                itemColor,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },

    $login(timeout) {
        return new Promise(((resolve, reject) => {
            wx.login({
                timeout,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        }))
    },

    $getWeRunData() {
        return new Promise(((resolve, reject) => {
            wx.getWeRunData({
                success:(res) => {
                    resolve(res);
                },
                fail:(e) => {
                    if (e.errMsg.includes('auth')) {
                        wx.showModal({
                            title: '请求授权',
                            content: '小程序需要获取您的微信步数信息',
                            showCancel: false,
                            success:() => {
                                this.$openSetting().then((settingData) => {
                                    if (settingData.authSetting["scope.werun"]) {
                                        this.$showToast('授权成功');
                                        this.$getWeRunData()
                                            .then((res) => {
                                                resolve(res);
                                            })
                                            .catch((e) => {
                                                reject(e);
                                            })
                                    } else {
                                        this.$showToast('授权被拒绝');
                                        reject({errMsg: 'auth refused'});
                                    }
                                });
                            },
                            fail:() => {
                                reject({errMsg: 'auth refused'});
                            }
                        })
                    } else {
                        this.$showToast('获取失败', 'none');
                    }
                }
            });
        }))
    },

    $hideToast() {
        return new Promise((resolve, reject) => {
            wx.hideToast({
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },

    $hideLoading() {
        return new Promise((resolve, reject) => {
            wx.hideLoading({
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },

    $showToast(title, icon = 'success', image, duration = 1500, mask = false) {
        return new Promise((resolve, reject) => {
            wx.showToast({
                title,
                icon,
                image,
                duration,
                mask,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },

    $openSetting() {
        return new Promise((resolve, reject) => {
            wx.openSetting({
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e)
                }
            })
        });
    },

    $canvasToTempFilePath(x = 0, y = 0, width = null, height = null, destWidth = null, destHeight = null, canvasId, fileType = 'png', quality) {
        return new Promise((resolve, reject) => {
            wx.canvasToTempFilePath({
                x,
                y,
                width,
                height,
                destWidth,
                destHeight,
                canvasId,
                fileType,
                quality,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e)
                }
            })
        });
    },

    $switchTab(url) {
        return new Promise((resolve, reject) => {
            wx.switchTab({
                url,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e)
                }
            })
        });
    },

    $reLaunch(url) {
        return new Promise((resolve, reject) => {
            wx.reLaunch({
                url,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e)
                }
            })
        });
    },

    $redirectTo(url) {
        return new Promise((resolve, reject) => {
            wx.redirectTo({
                url,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e)
                }
            })
        });
    },

    $navigateTo(url) {
        return new Promise((resolve, reject) => {
            wx.navigateTo({
                url,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e)
                }
            })
        });
    },

    $navigateBack(delta) {
        return new Promise((resolve, reject) => {
            wx.navigateBack({
                delta,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e)
                }
            })
        });
    },

    $chooseImage(count = 1, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera']) {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count,
                sizeType,
                sourceType,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },

    $saveImageToPhotosAlbum(filePath, callback = () => {}) {
        return new Promise(((resolve, reject) => {
            wx.saveImageToPhotosAlbum({
                filePath,
                success:(res) => {
                    this.$showToast('保存成功');
                },
                fail: (e) => {
                    if (e.errMsg.includes('auth')) {
                        wx.showModal({
                            title: '请求授权',
                            content: '小程序需要写入您的相册',
                            showCancel: false,
                            success:() => {
                                this.$openSetting().then((settingData) => {
                                    if (settingData.authSetting["scope.writePhotosAlbum"]) {
                                        callback();
                                        this.$showToast('授权成功');
                                    } else {
                                        this.$showToast('授权被拒绝', 'none');
                                        reject({errMsg: 'auth refused'})
                                    }
                                });
                            },
                            fail:() => {
                                reject({errMsg: 'auth refused'})
                            }
                        })
                    } else {
                        this.$showToast('保存失败', 'none');
                    }
                }
            })
        }))
    },

    $getSystemInfo() {
        return new Promise((resolve, reject) => {
            wx.getSystemInfo({
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e)
                }
            })
        });
    },

    $getImageInfo(src) {
        return new Promise((resolve, reject) => {
            wx.getImageInfo({
                src,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        });
    },

    $setLocal(key, value) {
        wx.setStorageSync(key, JSON.stringify(value));
    },

    $getLocal(key) {
        try {
            const value = wx.getStorageSync(key);
            if (value) return JSON.parse(value);
        } catch (e) {
            console.log(e);
        }
    },

    $removeLocal(key) {
        wx.removeStorageSync(key)
    },

    $clearLocal() {
        wx.clearStorageSync()
    },

    $startPullDownRefresh() {
        return new Promise((resolve, reject) => {
            wx.startPullDownRefresh({
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e)
                }
            })
        });
    },

    $stopPullDownRefresh() {
        return new Promise((resolve, reject) => {
            wx.stopPullDownRefresh({
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e)
                }
            })
        });
    },

    $previewImage(urls = [], current = '') {
        return new Promise((resolve, reject) => {
            wx.previewImage({
                urls,
                current,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },

    $requestPayment(timeStamp, nonceStr, pack, signType, paySign) {
        return new Promise((resolve, reject) => {
            wx.requestPayment({
                timeStamp,
                nonceStr,
                package: pack,
                signType,
                paySign,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },
    $makePhoneCall(phoneNumber) {
        return new Promise((resolve, reject) => {
            wx.makePhoneCall({
                phoneNumber,
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
        })
    },
}
