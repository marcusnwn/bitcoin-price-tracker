const express = require('express')
const app = express()
const port = 3000
const rp = require('request-promise');
const moment = require('moment');

const APIKeyFile = require('./keys')

const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    qs: {
        'id': '1',
        'convert': 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': APIKeyFile.APIKey
    },
    json: true,
    gzip: true
};

app.set('view engine', 'ejs');
const publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir))

app.get('/', (req, res) => {


    const formatPercentage = (num) => {
        if (num > 0) {
            return "+" + num.toFixed(2);
        } else {
            return num.toFixed(2).toString();
        }
    }

    rp(requestOptions).then(response => {
        const org_last_update = response["data"]["1"]["last_updated"]
        const process_last_update = Date.parse(org_last_update)

        const last_update = moment(new Date(process_last_update)).local().format("YYYY-MM-DD HH:mm:ss")
        const price = response["data"]["1"]["quote"]["USD"]["price"].toLocaleString('en-US', { maximumFractionDigits: 2 })
        const price_change_1d = formatPercentage(response["data"]["1"]["quote"]["USD"]["percent_change_24h"])
        const price_change_30d = formatPercentage(response["data"]["1"]["quote"]["USD"]["percent_change_30d"])
        const price_change_90d = formatPercentage(response["data"]["1"]["quote"]["USD"]["percent_change_90d"])

        res.render('index', {
            last_update,
            price,
            price_change_1d,
            price_change_30d,
            price_change_90d,
        });

    }).catch((err) => {
        const last_update = ""
        const price = err.message
        const price_change_1d = "N/A"
        const price_change_30d = "N/A"
        const price_change_90d = "N/A"
        res.render('index', {
            last_update,
            price,
            price_change_1d,
            price_change_30d,
            price_change_90d,
        });
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})