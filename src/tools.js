export default {
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
