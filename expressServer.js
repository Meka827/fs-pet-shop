import express from "express";
import nodemon from "nodemon";
import { readFile, writeFile } from "node:fs/promises";
import { nextTick } from "node:process";


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

server.use(express.json());
  
// For parsing serverlication/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));
  
server.post('/pets', function (req, res) {
//     let body = "";
  const pet = req.body;
  const { age, kind, name } = pet;
  const requiredFields = ["age", "kind", "name"];
const errors = [];

for (let field of requiredFields) {
    if (pet[field] === undefined) {
        errors.push(`Missing pet '${field}'`)
    }
}

if (pet.age && typeof pet.age !== 'number') {
    errors.push("Pet age must be a number.")
}

if (errors.length > 0) {
    res.status(422);
    res.send(errors.join(" "));
} else {
  
  readFile("./pets.json", "utf-8")
    .then((text) => {

        const pets = JSON.parse(text);
        pets.push(pet);
        return writeFile("./pets.json", pets)
    
        })
        .then(() => {
            res.json(pet)
            res.status(201)
        })
        .catch((error) => {
            next(error);
        })
    }
});

///server.get("/pets/:index")
// server.use((err, req, res, next) => {
//     res.status(404)
// })

// listen on a port
server.listen(3000, () => {
    console.log('server is running')
});