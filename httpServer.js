import http from "node:http";
import nodemon from "nodemon";
import { readFile } from "node:fs/promises";

const server = http.createServer((req, res) => {

    const { method, url } = req;
    const petRegExp = /^\/pets\/(\d*)$/;

    if(method === 'POST' && url === '/pets') {
        let body = '';
        req.on('data', (chunk) => {
            console.log(typeof chunk);
            body += chunk;
        });
        req.on('end', () => {
            console.log(body)
        })
    }else if(req.method === 'GET' && req.url === '/pets') {

        readFile("./pets.json", "utf-8").then((text) => {
            res.setHeader("Content-Type", "application/json");
            res.end(text);
            //If we receive a get request to /pets 
            //Read opets.json
            //Return contents of the file
            //return all pets from pets.json
            //Set Content-Type header to the application.json
        
        });
   } else if (method === 'GET' && petRegExp.test(url)){
    const match = petRegExp.exec(url);
    const petIndex = match[1];
    readFile("./pets.json", "utf-8").then((text) => {
        const pets = JSON.parse(text);
        
         if (petIndex > pets.length -1 || petIndex < 0 || petIndex === ''){
            res.setHeader("Content-Type", "text/plain");
            res.statusCode = 404;
            res.end("Not Found");
            
         } else {
            res.end(JSON.stringify(pets[petIndex]));
            res.setHeader("Content-Type", "application/json");
        };
    
    });
    }else{ 
        res.setHeader("Content-Type", "text/plain");
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(3000, () => {
    console.log(`Server running on port 3000`)

});

