const axios = require(axios);

module.exports = (api_key, clan_id) => {
    return new Promise((resolve, reject) => {
        var URI = `https://api.brawlhalla.com/clan/${clan_id}`;
        axios.get(URI, { params: { api_key } })
            .then(res => {
                if (res.status !== 200)
                    reject(`${res.status} • ${res.statusText}`);
                resolve(res.data);
            })
            .catch(err => reject());
    })
}