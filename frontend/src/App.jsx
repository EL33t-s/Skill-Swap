import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import LandingPage from "./components/LandingPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import Home from "./pages/Home";
import BrowseSkills from "./components/BrowseSkills";
import Browse from "./pages/Browse";
import MySwaps from "./pages/MySwaps";
import SwapRequest from "./pages/SwapRequest";

// Profile pages
import OwnProfile from "./pages/OwnProfile";   // your own profile page
import Profile from "./pages/Profile";         // browsed user's profile page

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>

      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* App pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/browse-skills" element={<BrowseSkills />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/my-swaps" element={<MySwaps />} />
          <Route path="/swap-request" element={<SwapRequest />} />

          {/* Profile routes */}
          <Route path="/profile" element={<OwnProfile />} />        {/* own logged-in user profile */}
          <Route path="/profile/:id" element={<Profile />} />       {/* other user's public profile */}

          {/* Catch-all 404 */}
          <Route path="*" element={<h2 className="p-6 text-2xl">404 - Page Not Found</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
