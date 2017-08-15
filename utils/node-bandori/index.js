const request = require('superagent'),
      scraper = require("scraperjs").StaticScraper,
      Constants = require('./Constants.js');

const apiCall = (endpoint, options) => {
    return new Promise((resolve, reject) => {
        request.get('http://bandori.party/api' + endpoint)
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
    var searchTerm = term.split(',')[0].toLowerCase();
    var filter = term.replace(/\s/g,'').split(',');
    var options = {};
    if (!Boolean(Constants.MemberSearchTerms[searchTerm])) {return new Error('Invalid Member Name')};
    console.log(Constants.MemberSearchTerms[searchTerm])
    options.member_id = Constants.MemberSearchTerms[searchTerm];
    if (Boolean(findFilter('r=', filter))) {options.i_rarity = findFilter('r=', filter).replace('r=', '')};
    if (Boolean(findFilter('a=', filter))) {options.i_attribute = findFilter('a=', filter).replace('a=', '')};
    if (Boolean(findFilter('s=', filter))) {options.i_skill_type = findFilter('s=', filter).replace('s=', '')};
    if (Boolean(findFilter('p=', filter))) {options.page = findFilter('p=', filter).replace('p=', '')};
    let items = [];
    return new Promise((resolve, reject) => {
        apiCall('/cards/', options).then(response => {
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
    })
}

exports.getCard = (id) => {
    var options = {};
    return new Promise((resolve, reject) => {
        apiCall(`/cards/${id}/`, options).then(response => {
            if (response.length === 0)
                return this.notFoundAsError ? reject(new Error('There was a problem with getting the card')) : resolve(response);
            resolve(response);
        })
        .catch(err => {
            console.log(err.stack);
        });
    })
}

exports.getMembers = (page) => {
    var options = {};
    options.page = !isNaN(parseInt(page)) ? page : 1;
    let items = [];
    return new Promise((resolve, reject) => {
        apiCall('/members/', options).then(response => {
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

exports.getMember = (name) => {
    var options = {};
    var id = Constants.MemberSearchTerms[name.toLowerCase()];
    return new Promise((resolve, reject) => {
        apiCall(`/members/${id}/`, options).then(response => {
            if (response.detail === 'Not found')
                return this.notFoundAsError ? reject(new Error('There was a problem getting the member')) : resolve(response);
            resolve(response);
        })
        .catch(err => {
            console.log(err.stack);
        });
    })
}

exports.getCurrentEvent = () => {
    function GetRemainingTime(date) {
        var time = new Date(date - new Date()).getTime();
        if (time < 0) {
            return false;
        }
        var d = Math.floor(time / (1000 * 60 * 60 * 24));
        var h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((time % (1000 * 60)) / 1000);

        var d_tag = d == 1 ? 'day' : 'days';
        var h_tag = h == 1 ? 'hour' : 'hours';
        var m_tag = m == 1 ? 'minute' : 'minutes';
        var s_tag = s == 1 ? 'second' : 'seconds';
        
        return `${d} ${d_tag}, ${h} ${h_tag}, ${m} ${m_tag}, ${s} ${s_tag} left`;
    }
    return new Promise((resolve, reject) => {
        scraper.create('http://bandori.party/events/')
            .scrape(function($) {
                return $('.col-md-6 a').map(function() {
                    return $(this).attr('href');
                }).get()[0];
            })
            .then(function(url) {
                scraper.create('http://bandori.party' + url)
                    .scrape(function($) {
                        var eDate = $('.datetime').map(function() {
                                        return $(this);
                                    }).get()[2].text().split(/ \d\d:/)[0];
                        eDate = new Date(`${eDate} 20:00:00`);
                        return {
                            image: 'http:' + $('.padding50.text-center.top-item img').attr('src'),
                            en_name: $('.table.about-table tr').map(function() {
                                return $(this);
                            }).get()[1].text().trim().replace(/[\n]|[\t]/g, '').split('      ')[1],
                            jp_name: $('.table.about-table tr').map(function() {
                                return $(this);
                            }).get()[2].text().trim().replace(/[\n]|[\t]/g, '').split('      ')[1],
                            jp_start: $('.datetime').map(function() {
                                        return $(this);
                                    }).get()[0].text().split(/ \d\d:/)[0] + ' 3:00 PM (JST)',
                            jp_end: $('.datetime').map(function() {
                                        return $(this);
                                    }).get()[2].text().split(/ \d\d:/)[0] + ' 9:00 PM (JST)',
                            jp_timeleft: GetRemainingTime(eDate),
                            website_url: 'http://bandori.party' + url
                        }
                    })
                    .then(function(data) {
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err.stack);
                    });
            })
            .catch(err => {
                reject(err.stack);
            });
    })
}