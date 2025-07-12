import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import Button from "./ui/Button";
import ProfileCard from "./profile/ProfileCard"; // adjust path if needed
import axios from "axios";

const categories = ["Design", "Music", "Coding", "Languages"];
const availabilityOptions = ["Weekends", "Evenings", "Mornings"];

const BrowseSkills = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [showPublicOnly, setShowPublicOnly] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const toggleAvailability = (option) => {
    setAvailabilityFilter((prev) =>
      prev.includes(option)
        ? prev.filter((a) => a !== option)
        : [...prev, option]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setAvailabilityFilter([]);
    setShowPublicOnly(false);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      user.skills.some((skill) => skill.includes(selectedCategory));

    const matchesAvailability =
      availabilityFilter.length === 0 ||
      availabilityFilter.some((a) => user.availability.includes(a));

    const matchesStatus = !showPublicOnly || user.status === "Public";

    return (
      matchesSearch && matchesCategory && matchesAvailability && matchesStatus
    );
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r h-screen fixed top-0 left-0 z-30">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b shadow z-20 flex items-center px-6">
          <Navbar />
        </header>

        <main className="pt-16 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-100 flex-1 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">
            Browse Skills
          </h1>
          <p className="text-gray-600 mb-8">
            Find people offering the skills you need and request a swap!
          </p>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8 grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="🔍 Search skills or users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            >
              <option value="">📂 Skill Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Availability</label>
              <div className="flex flex-wrap gap-2">
                {availabilityOptions.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-1 text-sm">
                    <input
                      type="checkbox"
                      checked={availabilityFilter.includes(opt)}
                      onChange={() => toggleAvailability(opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-semibold">🌐 Public Only</label>
              <input
                type="checkbox"
                checked={showPublicOnly}
                onChange={() => setShowPublicOnly(!showPublicOnly)}
              />
            </div>

            <Button variant="outline" onClick={resetFilters} className="col-span-full">
              🌀 Reset Filters
            </Button>
          </div>

          {/* User cards */}
          {filteredUsers.length === 0 ? (
            <p className="text-gray-500">No users found for selected filters.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <ProfileCard key={user._id} user={user} />
              ))}
            </div>
          )}

          {/* Load more / Pagination placeholder */}
          <div className="flex justify-center mt-10">
            <Button variant="outline">Load More</Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrowseSkills;
