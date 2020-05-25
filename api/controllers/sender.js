const autil = require('../../lib/util');
const sheet = require('../../lib/getSheet');

const ver = require('../../version');


function checkVideo(req, res) {
    
}

function version(req, res) {
    const date = new Date();
    console.log(`version 1.0 ACCCN Sunday view count${date}`);
    return res.send(ver);    
}

module.exports = {
    sender,
    showWeek,
    sendHebrewsWeeklyEmail,
    sendSantury,
    version,
};