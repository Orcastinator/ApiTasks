const express = require('express');
const router = express.Router();

const mysql = require('mysql2');
const poolDB = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_BBDD,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



const tasks = require('../tasks.json');

router.get("/", (req, res) => {
    poolDB.query(
        "SELECT * FROM tasks",
        (err, results, fields) => {
            if (results){
                res.json(results);
            }
            else{
                res.send("Empty.");
            }
        });
});

router.get('/:id', (req, res) => {
    var {id} = req.params;
    poolDB.query(
        "SELECT * FROM tasks WHERE id_task = "+id,
        (err, results, fields) => {
            if (results.length > 0){
                res.json(results);
            }
            else{
                res.send("Doesnt exist.");
            }
        });
});

router.post('/', (req, res) => {
    var t = req.body;
    if (t.titulo && t.descripcion){
        poolDB.query(
            "INSERT INTO tasks (titulo, descripcion) VALUES ('"+t.titulo+"', '"+t.descripcion+"')",
            (err, results, fields) => {
                if (results.affectedRows > 0){
                    res.send("Task added.");
                }
                else{
                    res.send("Error adding task.");
                }
            });
    }
    else {
        res.status(500).send("Incomplete task");
    }
});

router.delete('/:id', (req, res) => {
    var {id} = req.params;
    poolDB.query(
        "DELETE FROM tasks WHERE id_task = "+id,
        (err, results, fields) => {
            if (results.affectedRows > 0){
                res.send("Task deleted.");
            }
            else{
                res.send("Error deleting task.");
            }
        });
});

router.put('/:id', (req, res) => {
    var {id} = req.params;
    var o = {...req.body};
    poolDB.query(
        "UPDATE tasks SET titulo = '"+o.titulo+"', descripcion = '"+o.descripcion+"' WHERE id_task = "+id,
        (err, results, fields) => {
            if (results.affectedRows > 0){
                res.send("Task updated.");
            }
            else{
                res.send("Error updating task.");
            }
        });
});

module.exports = router;