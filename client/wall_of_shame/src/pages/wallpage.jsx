import { useEffect, useState } from "react";
//useState allows to remember data state and allows to automatically re-renders the frontend if there is any change in the data
//useEffect - this helps in fetching data from a server

import "../app.css";

function wallpage() {
  const [snippets, setSnippets] = useState([]); //here snippets is my dataset  which is initially empty whereas setSnippets is the function to set update the state of the snippets
  const [confession, setConfession] = useState(""); // similarly making states for confession and code
  const [code,setCode] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/snippets")
      .then(res => res.json())
      .then(data => setSnippets(data));
  }, []); //we are first fetching the data by going to that URL and then converting it into a json object and then finally storing that data in snippets

  //creating the handleSubmit function
  const handleSubmit = () =>{
    if(!confession || !code){
      alert("Please fill all the fields in the form");
      return;
    }
    fetch("http://localhost:5000/snippets",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ confession, code })
    })
      .then(res=>res.json())
      .then(()=>{
        setConfession("");
        setCode("");
        fetchSnippets();
      })
  };
  //now we are converting the snippets into html template and returning the html
  return (
    <div>
      <h1>Wall of Shame </h1>
      {/*Now we are creating a form for posting snippets and confession*/}
        <div className="form">
        <input
          type="text"
          placeholder="Write your confession..."
          value={confession}
          onChange={(e) => setConfession(e.target.value)}
        />

        <textarea
          placeholder="Paste your bad code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

        <button onClick={handleSubmit}>
          Post
        </button>

         </div>
      {snippets.map(s => (
          <div key={s.id} className="card">
            <div className="confession">
              {s.confession}
            </div>

            <pre className="code">{s.code}</pre>
        </div>
      ))}
    </div>
  );
}

export default wallpage;