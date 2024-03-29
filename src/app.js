const path=require('path')
const express= require('express')
const hbs=require('hbs')
// const geocode=require('./utils/geocode.js')
const {forecast,forecastCurrent} = require('./utils/forecast.js')
const app=express()

const staticPath = path.join(__dirname,'../public')
const viewPath= path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000

hbs.registerPartials(partialPath)
app.set('view engine','hbs')
app.set('views',viewPath)

app.use(express.static(staticPath))
app.get('',(req,res) =>{// used  for main page
    res.render('index',{
        title: 'Weather Information',
        name: 'Om Prakash'
    })
})

app.get('/help', (req,res) =>{ 
    res.render('help',{
        title: 'Help Page!',
        name:'Om Prakash'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me' ,
        name: 'Om Prakash'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
       return res.send({
            error: 'Address field cannot be blank'
        })
    }

    // // geocode(req.query.address,(error,data)=>{
    //     if(error){
    //     return res.send({
    //         errorMessage: error
    //     })
    //     }
        
      
    forecast(req.query.address,(error,forecastData)=>{
         if(error){
             return res.send({
                errorMessage: error
             })
         }
       res.send({
       forecast: forecastData,
        location: req.query.address
       })
    })
})

app.get('/weatherCurrent',(req,res)=>{
    const lat=req.query.lat
    const lon=req.query.lon

    forecastCurrent({lat,lon},(error,forecastData)=>{
        if(error){
            return res.send({
               errorMessage: error
            })
        }
      res.send({
      forecast: ` The weather description is ${forecastData.weather[0].description}, temperature
      is ${forecastData.main.temp} degrees celsius`,
       location: forecastData.name
      })
   })
})


app.get('/help/*',(req,res)=>{
  res.render('error',{
    title: '404',
    message: 'Help article not found',
    name: 'Om Prakash'
  })
})

app.get('*',(req,res)=>{
  res.render('error',{
    title:'404',
    message: 'Page Not found',
    name: 'Om Prakash'
  })
})

app.listen(port,()=> {               //this function is used to start the server on given port number.
    console.log('Server is up and running on port ' +port)
})