import { useEffect, useState } from "react";
//useState allows to remember data state and allows to automatically re-renders the frontend if there is any change in the data
//useEffect - this helps in fetching data from a server

import "../app.css";
function wallpage() {
  const [snippets, setSnippets] = useState([]); //here snippets is my dataset  which is initially empty whereas setSnippets is the function to set update the state of the snippets
  const [confession, setConfession] = useState(""); // similarly making states for confession and code
  const [code,setCode] = useState("");                    //for the snippets
  const [commentText, setCommentText] = useState({});    //for making comments
  const [activeSnippet, setActiveSnippet] = useState(null);             //for making the comment section visible only when clicked with intial state as null as none of the snippet is clicked

  let currentUser = localStorage.getItem("userId"); //providing every web browser a unique id
  
  if (!currentUser) {
  currentUser = Date.now().toString();  // unique ID if there doesn't exist already
  localStorage.setItem("userId", currentUser);
  }

  const fetchSnippets = () => {
  fetch("http://localhost:5000/snippets")
    .then(res => res.json())
    .then(data => setSnippets(data));
  };
  useEffect(() => {
    fetchSnippets();
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
      body: JSON.stringify({ confession, code ,userId: currentUser})
    })
      .then(res=>res.json())
      .then(()=>{
        setConfession("");
        setCode("");
        fetchSnippets(); //to refresh the UI
      })
  };
  const addComment = (snippetId, text) =>{
        if(!text){
          alert("Please enter the text field for making the comment");
          return;
        }
        
        fetch(`http://localhost:5000/snippets/${snippetId}/comments`,{
          method: "POST",
          headers: {
            "Content-Type" : "application/json" 
          },
          body: JSON.stringify({text})
        })
        .then(() => {
          fetchSnippets(); // to refresh UI
        })

        }
  //making a function for deleting the snippets
  const deleteSnippets = (snippetid) =>{
          fetch(`http://localhost:5000/snippets/${snippetid}`,{                         //passing a delete request with the field of userId
          method: "DELETE",
          headers: {
            "Content-Type" : "application/json" 
          },
          body: JSON.stringify({
            userId: currentUser
          })
        })
        .then(() => {
          fetchSnippets(); // to refresh UI
        })
        
  };      
  //now we are converting the snippets into html template and returning the html
  return (
    <div>
      <h1>The Wall of Shame </h1>
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
              Post to Wall of Shame
            </button>

         </div>
        {
        snippets.map(s => (
          <div key={s.id} className="card" >

            <div className="confession">{s.confession}</div>
            <pre className="code">{s.code}</pre>
            <button className = "expand-btn" onClick = {() => 
              { setActiveSnippet(activeSnippet === s.id ? null : s.id) }
              }>
                {activeSnippet === s.id ? "Hide Comments" : "View Comments"}          {/*maintaing whether the button should have text hide or view coments via state*/ }
            </button>
            {/*We want that the comment section should only appear if we click on the card and the that state is managed by the activeSNippet */}
            {activeSnippet === s.id && (<div className="comments">

                {s.comments && s.comments.map(c => (
                  <div key={c.id} className="comment">
                    {c.text}
                  </div>
                ))}

                
                <div className="comment-box">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText[s.id] || ""}
                    onChange={(e) =>
                      setCommentText({
                        ...commentText,
                        [s.id]: e.target.value
                      })
                    }
                  />

                  <button
                    onClick={() => {
                      addComment(s.id, commentText[s.id]);
                      setCommentText({
                        ...commentText,
                        [s.id]: ""
                      });
                    }}
                  >
                    Add
                  </button>

                </div>
               

        </div>
        )}
        <div className="delete-container">
            {/*we want the delete button should only appear if it is the user who posted the snippet*/}
            {s.userId === currentUser && (
              <button className="delete-btn" onClick={() => deleteSnippets(s.id)}>
                Delete Snippet
              </button>
            )}
        </div>
          </div>
        ))
        }
    </div>
  );
}

export default wallpage;