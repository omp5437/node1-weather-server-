const request=require('request')
const apiKey = "579ea7aff68efb449e8cc4e1fc2b9805";
const forecast=(query,callback)=>{

 
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query  + "&appid=" + apiKey + "&units=metric";

    // const url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=metric&appid=579ea7aff68efb449e8cc4e1fc2b9805'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to reach weathermap!',undefined)
        }else if(body.message){
            //console.log(body.message)
            callback(body.message+'. Please provide correct adresss.',undefined)
        }else{
            callback(undefined,'The Weather Condition is presently ' +body.weather[0].description+ '. It is '+ body.main.temp+
            ' degrees celsius out there. It feels more like '+ body.main.feels_like+' degrees.')
        }
    
    })
}


    const forecastCurrent=({lat,lon},callback)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

    request({url,json:true},(error,{body})=>{
        if (error) {
                    callback('Unable to connect to weather service!', undefined)
                } else if (body.error) {
                    callback('Unable to find location', undefined)
                } else {
                    callback(undefined, body);
                }
    })
    }

    // request({ url, json: true }, (error, { body }) => {
    //     if (error) {
    //         callback('Unable to connect to weather service!', undefined)
    //     } else if (body.error) {
    //         callback('Unable to find location', undefined)
    //     } else {
    //         callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    //     }
    // })

module.exports= {
    forecast,
    forecastCurrent
}