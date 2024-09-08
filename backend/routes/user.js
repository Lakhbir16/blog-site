const express = require('express');
const router = express.Router();
const jwt =require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const connection = require('./db')


const JWT_SECRET='lakhbir singh'

// ------------------------------------------------------------register user---------------------
router.post('/register', async (req, res) => {
    const { username, email, password ,name} = req.body;
    console.log(req.body)
    const id = uuidv4();

   
    const token = jwt.sign({ id, username, email }, JWT_SECRET, { expiresIn: '2h' });

    const query = 'INSERT INTO users (id, username, email, password, token,name) VALUES (?, ?, ?, ?, ?,?)';

    connection.query(query, [id, username, email, password, token,name], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err); 
            return res.status(500).send('Error inserting data');
        }
        return res.status(201).send('User registered successfully');
    });
});

// -----------------------------------------------------------Login user------------------------
router.post('/login', (req, res) => {

    let{email,password}=req.body;

    const query ='SELECT * FROM users WHERE email= ?'
    connection.query(query, [email,password], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err); 
            return res.status(500).send('Error during Login');
        }
        if(results.length==0){
            return res.status(401).json({"message":'Invalid Email address'});
        }
         let {id,username,email}=results[0]
         const token=jwt.sign({id,username,email},JWT_SECRET,{expiresIn:'2h'})
        if(results[0].password==password){
           const query='UPDATE users SET token =? WHERE email= ?'
           connection.query(query, [token,email], (err, results) => {
            if (err) {
                console.error('Error inserting data:', err); 
                return res.status(401).send('Error during Login');
            }
           })
          return res.status(201).json({"message":'Login successfully',token});
        }
        return res.status(401).json({"message":"Invalid Password"})
    });
   
});

// ----------------------------------usr data-------------------------------

router.post('/userinfo',(req,res)=>{
  const token=req.body.token
//   console.log(req.body.token)
  jwt.verify(token,JWT_SECRET,(err,result)=>{
    if(err){
        return res.send(err)
    }
    const {username,email}=result
    
    const query='SELECT * FROM users WHERE email = ?'
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('somthing is wrong:', err); 
            return res.status(401).send('Error during fetching user data');
        }
          delete results[0].password
           res.send(results)
       })
  })
  
})



router.post('/userinfo-by-uid',(req,res)=>{
    let {uid}=req.body
    // console.log(uid)
    
      const query='SELECT * FROM users WHERE id= ?'
      connection.query(query, [uid], (err, results) => {
          if (err) {
              console.error('somthing is wrong:', err); 
              return res.status(401).send('Error during fetching user data');
          }
        //   console.log(results)
        //    results[0].password=null
             res.send(results)
         })
    })
    


router.post('/new-userdata',(req,res)=>{
    const {id,name,email,password,bio,profilePicUrl,linkedin,instagram,twitter,github}=req.body
    const query='UPDATE users SET name = ?,email = ?,bio=?,linkedin=?,insta=?,github=?,twitter=?,profileimg=? WHERE email=?'
    connection.query(query,[name,email,bio,linkedin,instagram,github,twitter,profilePicUrl,email],(err,result)=>{
        if(err){
            console.error('somthing is wrong:', err); 
            return res.status(401).send('Error during inserting new user data');
        }
        res.status(200).send({"message":"Data updated successfully"})
    })
})

module.exports = router;