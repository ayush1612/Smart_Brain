const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

db.select('*').from('users').then(data =>{
    console.log(data)
});


app.use(cors());
// app.use(__dirname+'/public');

// app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());


app.get('/',(req,res) =>{res.json("it is working")})
//the statement below is equivalent to
// app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/signin',signin.handleSignin(db,bcrypt))
app.post('/register',(req,res)=>{ register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put("/image",(req,res)=>{image.handleImage(req,res,db)})
app.post("/imageurl",(req,res)=>{image.handleApiCall(req,res)})


app.listen(process.env.PORT || 1111,()=>{
    console.log(`Running on port:${process.env.PORT}`)
})