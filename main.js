let con = require('./connection');
let path = require('path');
let fs = require('fs');
let mysql = require('mysql');
let EJS = require('ejs');

let express = require('express');
let app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

con.mysqlCon(main);



function main(con) {

    let query = "SELECT * FROM `goods`";
    con.query(query, function (err, result) {

        if(err) throw err;

        // write the data to the json file for api
        fs.writeFile('user.json', JSON.stringify(result),'utf8', function () {

            ///////// TODO: send as api

            app.get('/api', function (req, res) {

                res.sendFile(path.join(__dirname+'/user.json'));
            });

            app.get('/',function(req,res){

                res.render('pages/index', {
                    result: result,
                });

            });
        });
    })
}

app.listen(8020, function () {
    console.log('Example app listening on port 3000!')
});