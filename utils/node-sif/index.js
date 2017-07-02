const request = require('superagent');

const apiCall = (endpoint, options) => {
    return new Promise((resolve, reject) => {
        request.get('http://schoolido.lu/api' + endpoint)
            .query(options)
            .end((error, response) => {
                if (!error && response.status === 200)
                    resolve(response.body);
                else
                    reject(new Error(error.status || error.response));
            });
    });
}

const findFilter = (substring, array) => {
    var key, value, result;
    for (key in array) {
        if (array.hasOwnProperty(key) && !isNaN(parseInt(key, 10))) {
            value = array[key];
            if (value.substring(0, 2) === substring) {
                result = value;
                return result;
            }
        }
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.getCardsFromSearch = (term) => {
    var searchTerm = term.split(',')[0];
    var filter = term.replace(/\s/g,'').split(',');
    var options = {};
    options.search = searchTerm;
    if (Boolean(findFilter('r=', filter))) {options.rarity = findFilter('r=', filter).replace('r=', '')};
    if (Boolean(findFilter('a=', filter))) {options.attribute = capitalize(findFilter('a=', filter).replace('a=', ''))};
    if (Boolean(findFilter('s=', filter))) {options.skill = findFilter('s=', filter).replace('s=', '')};
    if (Boolean(findFilter('p=', filter))) {options.page = findFilter('p=', filter).replace('p=', '')};
    let items = [];
    return new Promise((resolve, reject) => {
        apiCall(`/cards/`, options).then(response => {
            if (response.length === 0)
                return this.notFoundAsError ? reject(new Error('There was a problem with searching')) : resolve(response);
            response.results.forEach(e => {
                items.push(e);
            });
            resolve(items);
        })
        .catch(err => {
            console.log(err.stack);
        });
    });
}

exports.getSongsFromSearch = (term) => {
    var searchTerm = term.split(',')[0];
    var filter = term.replace(/\s/g,'').split(',');
    var options = {};
    options.search = searchTerm;
    if (Boolean(findFilter('a=', filter))) {options.attribute = capitalize(findFilter('a=', filter).replace('a=', ''))};
    if (Boolean(findFilter('p=', filter))) {options.page = findFilter('p=', filter).replace('p=', '')};
    let items = [];
    return new Promise((resolve, reject) => {
        apiCall('/songs/', options).then(response => {
            if (response.length === 0)
                return this.notFoundAsError ? reject(new Error('There was a problem with searching')) : resolve(response);
            response.results.forEach(e => {
                items.push(e);
            });
            resolve(items);
        })
        .catch(err => {
            console.log(err.stack);
        });
    });
}

exports.getIdolsFromSearch = (term) => {
    var searchTerm = term.split(',')[0];
    var filter = term.replace(/\s/g,'').split(',');
    var options = {};
    options.search = searchTerm;
    options.main = true;            // You aren't gonna get out much of non-main characters.
    if (Boolean(findFilter('s=', filter))) {options.school = findFilter('s=', filter).replace('s=', '')};
    if (Boolean(findFilter('mu=', filter))) {options.main_unit = findFilter('mu=', filter),replace('mu=', '')};
    if (Boolean(findFilter('su=', filter))) {options.sub_unit = findFilter('su=', filter).replace('su=', '')};
    if (Boolean(findFilter('p=', filter))) {options.page = findFilter('p=', filter).replace('p=', '')};
    let items = [];
    return new Promise((resolve, reject) => {
        apiCall('/idols/', options).then(response => {
            if (response.length === 0)
                return this.notFoundAsError ? reject(new Error('There was a problem with searching')) : resolve(response);
            response.results.forEach(e => {
                items.push(e);
            });
            resolve(items);
        })
        .catch(err => {
            console.log(err.stack);
        });
    });
}