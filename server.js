const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const path=require('path')
const fileUrlToPath=require('url').fileURLToPath()
require('dotenv').config()

const app=express()


const PORT=process.env.PORT ||8080

const filename=fileUrlToPath(import.meta.url)

const __dirname=path.dirname(filename)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'./client/build')))


mongoose.Promise=global.Promise
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{
    console.log("database connected successfully")
}).catch(err=> console.log(err))


app.use("/api/auth",require('./route/userRoute'))
app.use("/api/category",require('./route/categoryRoute'))
app.use("/api/product",require('./route/productRoute'))

app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'))
})
// app.use('/api/auth',require('./route/userRoute'))
app.listen(PORT,()=>{
    console.log("server started on "+PORT)
})