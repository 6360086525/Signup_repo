const express = require('express');
const app = express();


const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
const Port = process.env.PORT || 3000;

const dataList = [
    {
        name:'Parveez Pasha',
        User_Name:'Parveez@gmail.com',
        Password: 'parvez@123',
        
    }

];

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/SignUp.html");
})
app.post('/', (req, res) => {
    if (dataList != []) {
        for (let i in dataList) {
            if (dataList[i].name != '' && dataList[i].User_Name != ''  && dataList[i].Password != '') {
                pool.query(`INSERT INTO salesforce.Registration__c(Uname__c,UserName__c,Password__c)VALUES($1,$2,$3) ON CONFLICT (UserName__c) DO NOTHING`, [`${dataList[i].name}`, `${dataList[i].User_Name}`, `${dataList[i].Password}`]); 
                //(err, res) => {

                // if (err) {
                //     console.log("Error-> Failed to insert data into amazon_orders");
                //     console.log(err);
                // } else {
                //     console.log('DB res->', res);
                // }



           // }
           // else {
            }
        }
    }

    res.sendFile(__dirname + "/success.html");
})

app.listen(Port,
    () => console.log("Server is running...")
);



