import express from 'express'
import db from '../db.js'

const router=express.Router();
router.get("/",(req,res)=>{
    res.render('login')
})
router.post('/login',(req,res)=>{
    const {user,pass}=req.body;
   const sql='select * from admin where username=? and password=?'
   db.query(sql,[user,pass],(err,data)=>{
    if(err){
            console.log("errrrrr" ,data)

        res.render('login',{error : 'user not found'})
    }
     if (data.length > 0) {
            // Login success
            console.log("data" ,data)
            res.render('home');
        } else {
            // Login failed 
            console.log("failllled" ,data)

            res.render('login', { error: 'Invalid username or password' });
        }
   })
})
router.get('/register',(req,res)=>{
    res.render('register')
})

router.post("/register",(req,res)=>{
     const { username, password, email } = req.body;
    const sql = 'INSERT INTO admin (username, password, email) VALUES (?, ?, ?)';
    
    db.query(sql, [username, password, email], (err, result) => {
        if (err) {
            console.error("Registration error:", err);
            return res.render('register', { error: 'Failed to register user' });
        }

        console.log("User registered:", result);
        res.redirect('/login'); 
    })
})
 router.get('/logout',(req,res)=>{
    res.render('login')
 })
 router.get('/account',(req,res)=>{
    res.render('Myaccount')
 })
export default router; 