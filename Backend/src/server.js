import 'dotenv/config'
import path from 'path'
import express from 'express'
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import session from 'express-session'
import {create} from 'express-handlebars'
import indexRouter from './routes/indexRoutes.js'
import initializatePassport from './config/passport.js'
import __dirname from './path.js'

const app = express ()
const PORT = 8080
const hbs = create({
    extname: '.handlebars',
    partialsDir: path.join(__dirname, 'views/partials'), // Registra los partials si los tienes
    defaultLayout: 'main' 
});


app.use(express.json())
app.use(cookieParser(process.env.SECRET_COOKIE))

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 25 //tiempo en segundos

    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
    
}))


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB is connected"))
.catch((e) => console.log(e))

initializatePassport() //Ejecunto passport con sus estragecias
app.use(passport.initialize())
app.use(passport.session())

app.get('/setCookie', (req, res)=>{
    res.status(200).cookie('coderCookie', "cokkie cokkie", {maxAge: 100000, signed: true}).send("Cookie creada")
})
app.get('/getCookie', (req, res)=>{
    res.status(200).send(req.cookies)
})
app.get('/deleteCookie', (req, res)=>{
    res.clearCookie('coderCookie').send("Cookie Eliminada")
})





app.use('/', indexRouter)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})