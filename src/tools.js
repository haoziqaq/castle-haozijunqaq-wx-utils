export default {
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
                success(res) {
                    resolve(res);
                },
                fail(e) {
                    reject(e);
                }
            })
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
        wx.saveImageToPhotosAlbum({
            filePath,
            success:(res) => {
                this.$showToast('保存成功');
            },
            fail: (e) => {
                if (e.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                    this.$openSetting()
                        .then(settingData => {
                            if (settingData.authSetting["scope.writePhotosAlbum"]) {
                                this.$showToast('请重新保存');
                                callback();
                            } else {
                                this.$showToast('获取权限失败', 'none');
                            }
                        })
                } else {
                    this.$showToast('保存失败', 'none');
                }
            }
        })
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
        return JSON.parse(wx.getStorageSync(key));
    },

    $removeLocal(key) {
        wx.removeStorageSync(key)
    },

    $clearLocal() {
        wx.clearStorageSync()
    },
}
