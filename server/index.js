const express = require("express"); 
const cors = require("cors");

const app = express();
const PORT = 5000;  

app.get("/", (req,res)=> {
    res.send("Wall Of Shame server is running");
});
//Running the server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});