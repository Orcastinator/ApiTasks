const express = require('express');
const router = express.Router();

const tasks = require('../tasks.json');

router.get("/", (req, res) => {
    res.json(tasks);
});

router.get('/:id', (req, res) => {
    var {id} = req.params;
    tasks.forEach((t, i) => {
        if (t.id == id){
            res.json(t);
        }
    });
    res.status(500).send("Doesnt exists");
});

router.post('/', (req, res) => {
    var t = req.body;
    if (t.titulo && t.descripcion){
        t.id = tasks.length+1;
        t.active = false;
        t.done = false;
        t.dateDone = "";
        res.send("Task added");
        tasks.push(t);
    }
    else {
        res.status(500).send("Incomplete task");
    }
});

module.exports = router;