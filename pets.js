#!/usr/bin/env node
//chmod +X pets.js



//import { writeFile } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';

const subcommand = process.argv[2];


if (subcommand === 'read') {

    const petIndex = process.argv[3];
    
    

readFile("./pets.json", "utf-8").then((text) => {
console.log(text)
    const pets = JSON.parse(text);

    if (petIndex === undefined ) {
        console.log(pets)
    } else if (petIndex > pets.length -1 || petIndex <= undefined) {
        console.error("Usage: node pets.js [read | create | update | destroy]");
        process.exit(1);
    } else {
        console.log(pets[petIndex])
    };
    

    
    });
    
} else if (subcommand === 'create') {

    const age = parseInt(process.argv[3]);
    const kind = process.argv[4];
    const name = process.argv[5];
    const pet = { age, kind, name };
    console.log(typeof parseInt(age))

    readFile("./pets.json", "utf-8").then((text) => {

        const pets = JSON.parse(text);
        pets.push(pet);
        return writeFile("./pets.json", JSON.stringify(pets)
            

    
).catch((err) => (
    console.log('kjds')
))
})
} else {
    console.error("Usage: node pets.js [read | create | update | destroy]");
    process.exit(1);
}

