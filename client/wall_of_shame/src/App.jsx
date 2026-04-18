import { useEffect, useState } from "react";
//useState allows to remember data state and allows to automatically re-renders the frontend if there is any change in the data
//useEffect - this helps in fetching data from a server

import "./app.css";

function App() {
  const [snippets, setSnippets] = useState([]); //here snippets is my dataset  which is initially empty whereas setSnippets is the function to set update the state of the snippets

  useEffect(() => {
    fetch("http://localhost:5000/snippets")
      .then(res => res.json())
      .then(data => setSnippets(data));
  }, []); //we are first fetching the data by going to that URL and then converting it into a json object and then finally storing that data in snippets

  //now we are converting the snippets into html template and returning the html
  return (
    <div>
      <h1>Wall of Shame </h1>
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

export default App;