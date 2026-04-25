const express = require("express"); 
const cors = require("cors");

const app = express();
const PORT = 5000;  

const path = require("path");
const fs = require("fs"); //using node built in file manager required for reading and writing the database.json file

// cors() allows the React frontend (running on port 5173) to talk to this server
app.use(cors());

// express.json() parses incoming JSON request bodies so we can read req.body that will be used in adding the new snippets in the database
app.use(express.json());

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
        comments : [] ,// initially no comment
        userId: req.body.userId
    };
    const data = getDataDb();
    data.snippets.push(newSnippet);
    writeDataDb(data);
    res.json(newSnippet);
});

app.post("/snippets/:id/comments", (req,res)=>{
    const data = getDataDb();
    const snippet = data.snippets.find(             //finding the snippet of that particular id for which we are willing to add comment
        s => s.id  == req.params.id
    );            
    if(!snippet){
        return res.status(404).json({ message : "Snippet not found"});       //if the snippet is not found then we are returning a response 404 with error message i.e. snippet not found
    }

    const newComment = {
        id: Date.now(),
        text : req.body.text,
        userId: req.body.userId
    };

    snippet.comments.push(newComment); // adding a new comment for that snippet
   
    writeDataDb(data); //now overwriting the complete data for db.json
    res.json(newComment);

});

//Running the server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.delete("/snippets/:id", (req,res) => {
    const data = getDataDb();

    const snippet = data.snippets.find(
        s => s.id == req.params.id
    );

    if(snippet.userId !== req.body.userId){
        return res.json({message: "Not allowed, only user who posted the snippet can delete it"})
    }

    //Delete snippet
    data.snippets = data.snippets.filter(
        s=> s.id != req.params.id
    );
    writeDataDb(data);

    res.json({message : "Snippet deleted"});
});
