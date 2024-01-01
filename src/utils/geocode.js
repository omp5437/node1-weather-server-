const request=require('request')

const geoCodeApikey='e90f215a00764779b41750c7fee2ffe4'
const geoCode=({lat,long},callback)=>{
    const url= `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${geoCodeApikey}`

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to reach opencage',undefined)
        }else {
            callback(undefined,response)
        }
    })
}

// const geoCode=(address,callback)=>{
//     const url='https://maps.googleapis.com/maps/api/geocode/json?place_id='+ address+'&key=YOUR_API_KEY'
    
//     request({url: url, json:true},(error,response)=>{
//         if(error){
//             callback('Unable to reach mapbox!',undefined)
//         }
//         else if(response.body.features.length===0){
//             callback('Provide correct address!',undefined)
//         }else{
//             callback(undefined,{
//                 latitude: response.body.features[0].center[0],
//                 longitude: response.body.features[0].center[1]
//             })
//         }
//     })
// }
module.exports=geoCode