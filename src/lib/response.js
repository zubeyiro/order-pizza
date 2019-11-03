global.response = {
    success: (obj = null) => {
        return {
            status: true,
            data: obj
        }
    },
    error: (obj = null) => {
        return {
            status: false,
            err: obj
        }
    }
}