import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WallPage from "./pages/wallpage";
import Profile from "./pages/profile";

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
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;