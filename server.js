const express = require('express')
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
//MYSQL Connection   
//For Connect DB use : npm run dev
app.use(express.json());//parse json => js obj

const db = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'WhereMyBeer',
    port: '3306'

});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/api/insert", (req, res) => {
    const Username = req.body.Username
    const Password = req.body.Password
    const F_name = req.body.F_name
    const L_name = req.body.L_name
    const Card_ID = req.body.Card_ID
    const Birth_date = req.body.Birth_date




    const sqlInsert = "INSERT INTO User (Username,Password,F_name,L_name,Card_ID,Birth_date) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [Username, Password, F_name, L_name, Card_ID, Birth_date], (err, results) => {
        console.log(err);
    })
});



app.get("/api/select", (req, res) => {
    
    
    db.query("SELECT Username,Password FROM User",(err,result)=>{
        res.send(result);
    })
    
    
})




app.listen(3000, () => console.log('Server is running on port 3000'));