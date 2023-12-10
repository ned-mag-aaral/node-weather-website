const request = require('request')

const forecast = (url, callback2) => {
   request({url, json: true}, (error, {body}) => {
        if(error) {
            callback2('Unable to access weather services', undefined)
        } else if (body.error) {
            callback2('Unable to find location', undefined)
        } else {
            callback2(undefined, 'It is ' + body.current.weather_descriptions[0] +'. It is ' + body.current.temperature + ' degrees out. Feels like ' + body.current.feelslike + ' degrees.')
        }
   })
}

module.exports = forecast