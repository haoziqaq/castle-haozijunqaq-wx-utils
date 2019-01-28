export default {
    $downloadFile(url, header = null, filePath = null) {
        let taskCallback = typeof arguments[arguments.length - 1] === 'function' ? arguments[arguments.length - 1] : null;
        return new Promise((resolve, reject) => {
            const task = wx.downloadFile({
                url,
                header,
                filePath,
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            });
            if (taskCallback) taskCallback(task);
        })
    },

    $uploadFile(url, filePath, name, header = {}, formData = {}) {
        let taskCallback = typeof arguments[arguments.length - 1] === 'function' ? arguments[arguments.length - 1] : null;
        return new Promise((resolve, reject) => {
            const task = wx.uploadFile({
                url,
                filePath,
                name,
                header,
                formData,
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            });
            if (taskCallback) taskCallback(task);
        })
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

    $navigateBack(url) {
        return new Promise((resolve, reject) => {
            wx.navigateBack({
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
    }


}
