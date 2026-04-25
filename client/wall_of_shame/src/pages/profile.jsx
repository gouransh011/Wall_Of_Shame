import { useEffect, useState } from "react";

function ProfilePage() {
  const [mySnippets, setMySnippets] = useState([]);

  let currentUser = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://localhost:5000/snippets")
      .then(res => res.json())
      .then(data => {
        // filtering only user snippets
        const userSnippets = data.filter(
          s => s.userId === currentUser
        );
        setMySnippets(userSnippets);
      });
  }, []);

  return (
    <div>
      <h1>My Profile</h1>

      <h3>Your Snippets </h3>
       { mySnippets.map(s => (
          <div key={s.id} className="card">
            <div className="confession">{s.confession}</div>
            <pre className="code">{s.code}</pre>
          </div>
        ))}
      
    </div>
  );
}

export default ProfilePage;