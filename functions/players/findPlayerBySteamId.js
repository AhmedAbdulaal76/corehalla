const fetchPlayerById = require('./fetchPlayerById');

module.exports = (api_key, steam_id) => {
    return new Promise((resolve, reject) => {
        var URI = `https://api.brawlhalla.com/search`;
        axios.get(URI, { params: { api_key, steam_id } })
            .then(res => {
                if (res.status === 200)
                    resolve(res.data);
                else
                    reject(`${res.status} • ${res.statusText}`);
            })
            .catch(console.error);
    })
}