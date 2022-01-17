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
        name: 'Parveez',
        Email: 'parveezp178@gmail.com',
        Phone: 8123456790,
        Gender: 'Male',
        City: 'Bangalore'
    },
    {
        name: 'Nayeem',
        Email: 'Nayeem@gmail.com',
        Phone: 0987654390,
        Gender: 'Male',
        City: 'Bangalore'
    }
];

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/sync.html");
})
app.post('/', (req, res) => {
    if (dataList != []) {
        for (let i in dataList) {
            if (dataList[i].name != '' && dataList[i].Email != '' && dataList[i].Gender != '' && dataList[i].City != '') {
                pool.query(`INSERT INTO salesforce.Heroku_test__c(MemberName__c, Email__c, Phone_number__c, Gender__c,City__c)VALUES($1,$2,$3,$4,$5) ON CONFLICT (Phone_number__c) DO NOTHING`, [`${dataList[i].MemberName__c}`, `${dataList[i].Email__c}`, `${dataList[i].Phone_number__c}`, `${dataList[i].Gender__c}`, `${dataList[i].City__c}`]); 
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



