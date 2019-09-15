const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();

const url = "mongodb://localhost:27017"

var conn = MongoClient.connect(url, 
    {useNewUrlParser: true, useUnifiedTopology: true});

function getCountries(callback){
    conn.then(client=>{
        let res = client.db("population").collection("countries").find({}).toArray();
        res.then(value => {
            paises = [];
            paises = value;
            callback(paises);
        });
    });
}

function getCountryByName(countryName, callback){
    conn.then(client=>{
        let res = client.db("population").collection("countries").find({"country": countryName}).toArray();
        res.then(value => {
            //paises = [];
            pais = value;
            callback(pais);
        });
    });    
}

app.get('/', (req, res) => {
    res.send("Countries database");
});

app.get('/countries', (req, res) => {
    getCountries((data)=> {
        res.json(data);
    });
});

app.get('/countries/:country', (req, res) => {
    //res.send("Valor: " + req.params.country);
    getCountryByName(req.params.country, (data)=>{
        res.json(data);
    });
});



app.listen('8080');