const axios = require('axios').default;

const sendRequest = async (options) => {
    console.log("options: ", options);
    try {
        const { data } = await axios(options);
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendRequest
}