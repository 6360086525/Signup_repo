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
        RegNo:'STD-1',
        name: 'Parveez',
        //Email: 'parveez123@gmail.com',
        Phone: 8123456790     
    },
    {
        RegNo:'STD-2',
        name: 'Nayeem',
        //Email: 'nayeem123@gmail.com',
        Phone: 8123456980
    }
];

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/sync.html");
})
app.post('/', (req, res) => {
    if (dataList != []) {
        for (let i in dataList) {
            if (dataList[i].RegNo != '' && dataList[i].name != '') {
                pool.query(`INSERT INTO salesforce.Student__c(RegNo__c,Name__c,phone__c)VALUES($1,$2,$3) ON CONFLICT (RegNo__c) DO NOTHING`, [`${dataList[i].RegNo__c}`, `${dataList[i].Name__c}`, `${dataList[i].phone__c}`]); 
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



