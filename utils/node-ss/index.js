const request = require('superagent');

const apiCall = (endpoint, options) => {
    return new Promise((resolve, reject) => {
        request.get('https://starlight.kirara.ca/api/v1' + endpoint)
            .query(options)
            .end((error, response) => {
                if (!error && response.status === 200)
                    resolve(response.body);
                else
                    reject(new Error(error.status || error.response));
            });
    });
}

exports.getCard = (id) => {
    var options = {};
    return new Promise((resolve, reject) => {
        apiCall(`/card_t/${id}`, options).then(response => {
            if (response.length === 0)
                return this.notFoundAsError ? reject(new Error('There was a problem with getting the card')) : resolve(response);
            resolve(response);
        })
        .catch(err => {
            console.log(err.stack);
        });
    })
}