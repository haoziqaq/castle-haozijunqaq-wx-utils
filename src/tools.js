export default {
    $downloadFile(url, header = null, filePath = null) {
        let taskCallback = typeof arguments[arguments.length - 1] === 'function' ? arguments[arguments.length - 1] : null;
        return new Promise((resolve, reject) => {
            const task = wx.downloadFile({
                url,
                header,
                filePath,
                complete(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
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
                complete(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
            if (taskCallback) taskCallback(task);
        })
    },

}
