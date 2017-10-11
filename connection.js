let mysql = require('mysql');


function mysqlCon(callback) {

    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
    });

    connection.connect(function(err) {

        if (err) throw err;

        console.log("Connected!");

        connection.query("CREATE DATABASE payket", function (err, result) {

            //if (err) throw err;

            console.log("Database created");

            connection.query("USE payket", function (err, result) {
                if(err) throw err;
            });

            let query = "CREATE TABLE `payket`.`goods` ( `id` INT NOT NULL AUTO_INCREMENT , `name` TEXT CHARACTER SET utf8 COLLATE utf8_bin NOT NULL , `color` VARCHAR(6) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL , `pic` VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL , `price` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = MyISAM;";

            connection.query(query, function (err, result) {

                //if (err) throw err;
            });

            callback(connection);
        });
    });
}


module.exports = {

  mysqlCon:mysqlCon
};