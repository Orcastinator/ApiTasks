const express = require('express');
const router = express.Router();

const tasks = require('../tasks.json');

router.get("/", (req, res) => {
    res.json(tasks);
});

router.get('/:id', (req, res) => {
    var {id} = req.params;
    var exito = 0;
    tasks.forEach((t, i) => {
        if (t.id == id){
            res.json(t);
            exito = 1;
        }
    });
    if (exito == 0){
        res.status(500).send("Doesnt exists");
    }
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

router.delete('/:id', (req, res) => {
    var {id} = req.params;
    var exito = 0;
    tasks.forEach((t, i) => {
        if (t.id == id){
            res.send("Task deleted");
            tasks.splice(i, 1);
            exito = 1;
        }
    });
    if (exito == 0){
        res.status(500).send("Doesnt exists");
    }
});

router.put('/:id', (req, res) => {
    var exito = 0;
    var {id} = req.params;
    var o = {...req.body};
    if (o.titulo && o.descripcion){
        tasks.forEach((t, i) => {
            if (t.id == id){
                t.titulo = o.titulo;
                t.descripcion = o.descripcion;
                res.send("Task updated");
                exito = 1;
            }
        });
    }
    if (exito == 0){
        res.status(500).send("Doesnt exists");
    }
});

module.exports = router;