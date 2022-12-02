import express from "express";
import nodemon from "nodemon";
import { readFile, writeFile } from "node:fs/promises";


// set up dependencies
const server = express();

//handle request with routes

// app.get('/goodbye', (req,res) => {
//     res.send('goodbye');
// })
//accept Get requests to o
server.get("/pets", (req, res) => {
    readFile("./pets.json", "utf-8").then((text) => {
        res.set("Content-Type", "application/json");
        res.json(JSON.parse(text));
    });
});

server.get("/pets/:index", (req,res) => {
    const index = req.params.index;
    readFile("./pets.json", 'utf-8').then((text) => {
        const pets = JSON.parse(text);
        const selectedPet = pets[index];
        if (selectedPet !== undefined) {
            res.json(selectedPet);
        } else {
            res.status(404);
            res.set("Content-Type", "text/plain");
            res.send("Not Found");
        };
    });
});

server.get("/pets/:index")
// server.use((err, req, res, next) => {
//     res.status(404)
// })

// listen on a port
server.listen(3000, () => {
    console.log('server is running')
});