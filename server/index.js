const express = require("express"); 
const cors = require("cors");

const app = express();
const PORT = 5000;  

const path = require("path");
const fs = require("fs"); //using node built in file manager required for reading and writing the database.json file


function getDataDb(){
    const data = fs.readFileSync("db.json"); //reading the data from the db.json file in a synchronous form as the server waits until the read is complete
    return JSON.parse(data); // to convert the data that is a  string into a json object
}
function writeDataDb(data){
    fs.writeFileSync("db.json",JSON.stringify(data,null,2)); // write the file in a synchronous form, and JSON.stringify converts the JSON object into a text
}
app.get("/", (req,res)=> {
    res.send("Wall Of Shame server is running");
});
app.get("/snippets",(req,res)=>{
    const data = getDataDb();
    res.json(data.snippets);
});

app.post("/snippets",(req,res)=>{
    const newSnippet = {          //creating a new snippet
        id: Date.now(), 
        confession: req.body.confession, 
        code: req.body.code,
        comments : [] // initially no comment
    };
    const data = getDataDb();
    data.snippets.push(newSnippet);
    writeDataDb(data);
    res.json(newSnippet);
});
//Running the server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});