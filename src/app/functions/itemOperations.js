const axios = require('axios');

const itemOperations = {};
/**
 * @description fetch data from facebook graph api
 * @param {url} url
 */
itemOperations.fetchApiData = (url) => {
    async function getUser() {
        try {
            const response = await axios.get('https://graph.facebook.com/?&id=https://prathipaksham.in/interview-with-kalyani-the-ancestor-of-priest/', {
                params: {
                    ID: 12345
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
};
