import React from "react";
import { Link } from "react-router-dom";
import { Search, Users, Star } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-purple-700">SkillSwap</h1>
        <div className="space-x-4">
          <Link to="/browse-skills" className="px-4 py-2 rounded hover:bg-purple-100">Browse Skills</Link>
          <a href="#how-it-works" className="px-4 py-2 rounded hover:bg-purple-100">How It Works</a>
          <Link to="/Login" className="border px-4 py-2 rounded">Sign In</Link>
          <Link to="/SignUp" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">SignUp</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-10 max-w-6xl mx-auto">
        <div>
          <h2 className="text-5xl font-bold mb-4">Swap Skills, Grow Together.</h2>
          <p className="text-lg mb-6 text-gray-600">Discover people to exchange knowledge, hobbies, and expertise with. No money — just skills.</p>
          <div className="space-x-4">
            <Link to="/home" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded">Join the Community</Link>
            <Link to="/browse-skills" className="border px-6 py-3 rounded">Browse Skills</Link>
          </div>
        </div>

        <div>
          <img src="/swap-illustration.svg" alt="Skill Swap Illustration" className="w-full" />
        </div>
      </div>

      {/* Search Skills */}
      <div className="max-w-3xl mx-auto my-12 text-center">
        <h3 className="text-2xl font-semibold mb-4">Search for a Skill</h3>
        <div className="flex items-center space-x-2">
          <input type="text" placeholder="e.g. Photoshop, Cooking, Guitar..." className="flex-1 px-4 py-2 border rounded" />
          <button className="border p-2 rounded"><Search className="w-5 h-5" /></button>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="bg-white py-16">
        <h3 className="text-3xl font-bold text-center mb-10">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          <div className="border rounded-lg p-6 text-center shadow-sm">
            <Users className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2">Create a Profile</h4>
            <p className="text-gray-600">List your skills, what you want to learn, and when you're available.</p>
          </div>
          <div className="border rounded-lg p-6 text-center shadow-sm">
            <Search className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2">Find Swaps</h4>
            <p className="text-gray-600">Browse or search skills and connect with members to exchange knowledge.</p>
          </div>
          <div className="border rounded-lg p-6 text-center shadow-sm">
            <Star className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2">Swap & Rate</h4>
            <p className="text-gray-600">Meet up, exchange skills, and leave feedback to help others too.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-16">
        <h3 className="text-3xl font-bold mb-4">Ready to Share What You Know?</h3>
        <p className="text-gray-600 mb-6">Join thousands of learners swapping skills worldwide.</p>
        <Link to="/profile" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4 rounded">Create Your Profile</Link>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 pb-6">
        © 2025 SkillSwap — Built with ❤️
      </footer>
    </div>
  );
};

export default LandingPage;



