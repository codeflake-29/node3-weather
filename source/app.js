const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()


const port=process.env.PORT || 3000
const geocode=require('./utils/geocode')
const forcast=require('./utils/forcast')


//define paths for express config
console.log(path.join(__dirname,'../public'))
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')



//set up handle bar engine and views location

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)


//set up static directory to serve
app.use(express.static(path.join(__dirname,'../public')))



app.get('',(req,res)=>{
    res.render('index',{
        title:'weather ',
        name:'made by love with user'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'andrew meed'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        help:'HELP i am being surrounded',
        title:'HELP',
        name:'chiru'
    })
})




// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'error you must provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return(res.send({error}))
        }
        forcast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast:forecastdata,
                location,
                address:req.query.address
            })
        })

    })



    // res.send({
    //     forecast:'Weather',
    //     location:'india',
    //     address:req.query.address
    // })
})





app.get('/products',(req,res)=>{
if(!req.query.search){
   return res.send({
        error:'you must provide search'
    })
}


    console.log(req.query.search)
    res.send({
        products:'no products'
    })
})





app.get('/help/*',(req,res)=>{
    res.render('no',{
        title:'404',
        name:'made by chiru',
        errormessage:'help article not found'
    })
})




app.get('*',(req,res)=>{
    res.render('no',{
        title:'404',
        name:'chiru',
        errormessage:'page404 not found'
    })
})


app.listen(port,()=>{
    console.log('server is at'+port)
})