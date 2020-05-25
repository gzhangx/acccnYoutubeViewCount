const {getGoogleLiveApiView, getYoutubeViewsByChannel} = require('./util');
const {readSheet, appendSheet}  = require('./getSheet');

const spreadsheetId = '1u_AR8y7iCRPGyDhdOb1cHhjL-vclCIxuLkMhIxd08mU';


function recordAcccnVideoViewCount(id) {
    return getGoogleLiveApiView(id).then(res=>{
        console.log(`Current views for ${id} ${res.concurrentViewers}`);
        return appendSheet(spreadsheetId,`'2020'!A1`,[[new Date(), res.concurrentViewers, id]]).then(res=>{
            console.log(JSON.stringify(res,null,2));
            return readSheet(spreadsheetId,`'2020'!A:J`).then(res=>{
                console.log(JSON.stringify(res.data.values,null,2));
                console.log(`====>Current views for ${id} ${res.concurrentViewers}`);
                return res.data.values;
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