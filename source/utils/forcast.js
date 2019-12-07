const request=require('request')

const forcast=(a,b,callback)=>{
    const url='https://api.darksky.net/forecast/118180b289798289e997dabed15a2b63/'+encodeURIComponent(a)+','+encodeURIComponent(b)+'?units=si'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect',undefined)
        } else if(body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+ 'it is currently '+body.currently.temperature+' degrees out.There is '+(body.currently.precipProbability)*100+'%chance of rain')
        }
    })

}

module.exports=forcast







//  const url='https://api.darksky.net/forecast/118180b289798289e997dabed15a2b63/37.8267,-122.4233?units=si'
// request({url:url,json:true},(error,response)=>{
//  // console.log(response.body.currently)
// if(error){
//     console.log('unable to connect to weather service')
// }
// else if (response.body.error){
//     console.log('unable to find location')
// }

// else{
//  console.log(response.body.daily.data[0].summary+ 'it is currently '+response.body.currently.temperature+' degrees out.There is '+(response.body.currently.precipProbability)*100+'%chance of rain')
// } })
