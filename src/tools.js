export default {
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
