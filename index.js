import dotenv from 'dotenv'; 
dotenv.config(); 

import path from 'path'; 
import { fileURLToPath } from 'url';


import passport from 'passport'; 
import express from 'express'; 
import session from 'express-session'; 

import  connectDB from './dB/db.js';
import { configurePassport } from './config/passport.js';
import router from './Router/router.js';

const app = express(); 

app.use(express.json()); 
 

const __filename = fileURLToPath(import.meta.url); 
const __dirname =  path.dirname(__filename); 

app.use(express.static(path.join(__dirname, "public"))); 


connectDB(); 
// Session Setup 
app.use(session({ 
     secret:"mySecret", 
     resave: false, 
     saveUninitialized: false,
     cookie: { 
         maxAge: 1000*60*60, 
         httpOnly: true 
     }
})
); 
// Initialize Passport 
configurePassport(); 
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use('/auth',router); 
const PORT = 3000; 
app.listen(3000, ()=>{console.log(`Server is Running on the Port No. ${PORT}`)}); 