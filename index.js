const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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
            pais = value;
            callback(pais);
        });
    });    
}

function postCountry(country, callback){
    conn.then(client=>{
        let res = client.db("population").collection("countries").insertOne(country);
        res.then(value => {
            pais = value;
            callback(pais);
        });
    });   
}

function editCountry(country, content, callback){
    conn.then(client=>{
        let res = client.db("population").collection("countries").updateOne({"country" : country}, {$set: content});
        res.then(value => {
            pais = value;
            callback(pais);
        });
    }).catch(reason => {
        console.log(reason);
    });   
}

function deleteCountry(country, callback){
    conn.then(client=>{
        let res = client.db("population").collection("countries").deleteOne({"country" : country});
        res.then(value => {
            callback(value);
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

app.post('/countries', (req, res) => {
    let countryToPost = {
        "country" : req.body.country,
        "population" : req.body.population,
        "continent" : req.body.continent,
        "lifeExpectancy" : req.body.lifeExpectancy,
        "purchasingPower" : req.body.purchasingPower
    };
    console.log(countryToPost);
    postCountry(countryToPost, (data) => {
        res.json(data);
    });
});

app.put('/countries/:country', (req, res) => {
    let content = {
        "population" : req.body.population,
        "continent" : req.body.continent,
        "lifeExpectancy" : req.body.lifeExpectancy,
        "purchasingPower" : req.body.purchasingPower
    };
    editCountry(req.params.country, content, (data) => {
        res.json(data);
    });
});

app.delete('/countries/:country', (req, res) => {
    deleteCountry(req.params.country, (data)=>{
        res.json(data);
    });
});

app.listen('8080');