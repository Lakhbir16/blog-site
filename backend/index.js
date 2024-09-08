const express = require('express');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
const user = require('./routes/user');
const connection =require('./routes/db')
const cors = require('cors');
const jwt = require('jsonwebtoken');

const JWT_SECRET='lakhbir singh'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const PORT = 3002;

app.use('/user', user);


app.get("/", (req, res) => {
    res.send("Root says hi!");
});

app.get('/test',(req,res)=>{
    res.send(uuidv4())
})

app.post('/new-post',(req,res)=>{
    let {id,title,content,imageUrl,category,user_id,token}=(req.body)
    console.log(req.body)
    let uuid=uuidv4();
    jwt.verify(token,JWT_SECRET,(err,result)=>{
      if(err){
        res.send("Error During Token verify !")
      }
     user_id=result.id;

    const query = 'INSERT INTO posts (id, title,content,image_url,category,user_id) VALUES (?, ?,?,?,?,? )';
  connection.query(query, [uuid, title,content,imageUrl,category,user_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data');
    } else {
      res.json({"message":'Data inserted successfully',
        "result":result
      });
    }
  });
})
})

app.get('/getposts',(req,res)=>{


    const query = 'SELECT * FROM  posts'
    connection.query(query, (err, result) => {
        if (err) {
          console.error(err);
          res.status(401).send('Data not found');
        } else {
          res.send(result)
        }
      });

})
// ----------------------------------------------------------post bu u_id-------------------
app.post('/getposts-by-uid',(req,res)=>{
  const token=req.body.token;

 jwt.verify(token,JWT_SECRET,(err,result)=>{
  if(err){
    res.status(401).send("invalid token")
  }
  // console.log(result)
  let user_id=result.id;
  const query = 'SELECT * FROM  posts WHERE user_id= ?'
  connection.query(query,[user_id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(401).send('Data not found');
      } else {
        res.send(result)
      }
    });
  })

})


app.post('/getpost-by-id', (req, res) => {
  const { id ,uid} = req.body; 

  const query = 'SELECT * FROM posts WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error'); 
    }
    if (result.length === 0) {
      return res.json({
        message: 'No data found',
        result: result
      });
    }
    res.json({
      message: 'Data fetch successful',
      result: result
    });
  });
});

app.post('/editpostdata',(req,res)=>{
  const {title,content,category,imageUrl,id}=req.body;
  console.log(req.body)
  const query='UPDATE posts SET title=?,content=?,category=?,image_url=? WHERE id=?';
  connection.query(query,[title,content,category,imageUrl,id],(err,result)=>{
    if(err){
      console.error(err);
      return res.status(500).send('Error during Post data Update'); 
    }
    res.json({
      message: 'Data Updated successfully'
    });
  })
})




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
