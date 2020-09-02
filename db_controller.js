require('dotenv').config();

const monk = require('monk');
const db = monk(process.env.MONGODB_URI);
const ips = db.get('ips');


const ret = {
    get_last_ip: async() => {
        const ret = await ips.find({}, { sort: { date: -1 }, limit: 1 }, (e, docs) => {});
        if (ret) return ret[0];
        return ret;
    },
    insert_ip: async(name, ip) => {
        ips.insert({
            name: name,
            ip: ip,
            date: Date.now()
        });
    }

};
module.exports = ret;