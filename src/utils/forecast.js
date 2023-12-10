const request = require('request')

const forecast = (latitude, longitude, callback2) => {
   const url = 'http://api.weatherstack.com/current?access_key=14946101b4243dbf6f764cc155784cff&query=' + latitude + ',' + longitude
   console.log('Forecast url: ', url)

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