const get = require('lodash/get');
const acccn = require('../../lib/acccn');

const ver = require('../../version');

function handleErr(res, err) {
    const txt = get(err,'response.text');
    console.log(txt);
    res.send(txt);
}
function checkVideo(req, res) {
    console.log(`video id ${req.query.id}`);
    return acccn.recordAcccnVideoViewCount(req.query.id).then(async ret=>{
        const maxInf = await acccn.getAndSetAcccnAttendenceNumber(ret.count);
        res.send(Object.assign(ret, maxInf));
    }).catch(err=>{
        handleErr(res,err);
    });
}

function checkChannel(req, res) {
    const id = req.query.id || 'UCgoGuFymG8WrD_3dBEg3Lqw';
    console.log(`channel id ${id}`);
    return acccn.recordAcccnVideoViewCountByChannel(id).then(async ret=>{
        const maxInf = await acccn.getAndSetAcccnAttendenceNumber(ret.count);
        res.send(Object.assign(ret, maxInf));
    }).catch(err=>{
        handleErr(res,err);
    })
}

function version(req, res) {
    const date = new Date();
    console.log(`version 1.0 ACCCN Sunday view count${date}`);
    return res.send(version);    
}

module.exports = {
    checkVideo,
    checkChannel,
    version,
};