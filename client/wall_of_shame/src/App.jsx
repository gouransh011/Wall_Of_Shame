import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WallPage from "./pages/wallpage";
// import ProfilePage from "./ProfilePage"; // You will create this later

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-logo"> Wall of Shame</div>
        <div className="nav-links">
          <Link to="/" className="nav-item">Global Wall</Link>
          <Link to="/profile" className="nav-item">Profile</Link>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<WallPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;