import * as mysql from 'promise-mysql';

const configStr = {
    host: "localhost",
    user: "root",
    // password: "",
    password: "Euler2718281828",
    // database: "tech"
    database: "mydatabase"
}

const con = mysql.createPool(configStr);

export {con}