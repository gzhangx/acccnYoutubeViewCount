const get = require('lodash/get');
const {getGoogleLiveApiView, getYoutubeViewsByChannel} = require('./util');
const {readSheet, appendSheet}  = require('./getSheet');

const spreadsheetId = '1u_AR8y7iCRPGyDhdOb1cHhjL-vclCIxuLkMhIxd08mU';


function recordAcccnVideoViewCount(id) {
    return getGoogleLiveApiView(id).then(videoDetail=>{
        const concurrentViewers = videoDetail.concurrentViewers;
        console.log(`Current views for ${id} ${concurrentViewers}`);
        return appendSheet(spreadsheetId,`'2020'!A1`,[[new Date(), concurrentViewers, id, videoDetail.channelTitle, videoDetail.title]]).then(appendres=>{
            //console.log(JSON.stringify(appendres,null,2));
            return readSheet(spreadsheetId,`'2020'!A:J`).then(res=>{
                //console.log(JSON.stringify(res.data.values,null,2));
                const appendRange = get(appendres,'updates.updatedRange');
                console.log(`====>Current views for ${id} ${videoDetail.channelTitle} ${videoDetail.title} ${concurrentViewers} ${appendRange}`);
                return {
                    count: concurrentViewers,
                    appendRange,
                }
            })
        })
    });
}

async function recordAcccnVideoViewCountByChannel(channel) {
    const res = await getYoutubeViewsByChannel(channel);
    if (!res.id) {
        return {
            error: 'No live vid in channel',
        }
    }
    return await recordAcccnVideoViewCount(res.id);
}

module.exports = {
    recordAcccnVideoViewCount,
    recordAcccnVideoViewCountByChannel,
}