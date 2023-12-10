const request = require('request')

// geoapify free tier
const geocode = (url, callback1) => {
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback1('Unable to connect to geoapify services', undefined)
        } else if(!body.features) { // error 400 when text is empty
            callback1('Bad Request', undefined)
        } else if(body.features.length === 0) {
            callback1('Unable to find location', undefined)
        } else {
            callback1(undefined, {
                latitude: body.features[0].properties.lat,
                longitude: body.features[0].properties.lon,
                location: body.features[0].properties.formatted
            })
        }
    })
}

module.exports = geocode