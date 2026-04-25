import { useEffect, useState } from "react";

function ProfilePage() {
  const [mySnippets, setMySnippets] = useState([]);
  const [comments, setComments] = useState([]);

  let currentUser = localStorage.getItem("userId");

 useEffect(() => {
    fetch("http://localhost:5000/snippets")
      .then(res => res.json())
      .then(data => {

        // fetching our sinppets 
        const mySnippets = data.filter(s => s.userId === currentUser);
        setMySnippets(mySnippets);

        // fetching our comments
        let myComments = [];
        data.forEach(s => {
          if (s.comments) {
            s.comments.forEach(c => { if (c.userId === currentUser) {
                myComments.push({
                  text: c.text,
                  id: c.id,
                  snippet: s.confession
                })
              }
            });
          }
        });

        setComments(myComments);
      });
  }, []);

  return (
    <div>
      <h1>My Profile</h1>

      <h3>Your Snippets</h3>
    
       { mySnippets.map(s => (
          <div key={s.id} className="card">
            <div className="confession">{s.confession}</div>
            <div className="snippet-date">
              {new Date(s.id).toLocaleString()}
            </div>
            <pre className="code">{s.code}</pre>
          </div>
        ))
        }
        

      <h3>My Comments</h3>
        
       { comments.map(c => (
          <div key={c.id} className="comment">
            <div>{c.text}</div>

            <div className="comment-date">
              {new Date(c.id).toLocaleString()}
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default ProfilePage;