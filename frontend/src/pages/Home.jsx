import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setUserData(response.data);
    } catch (err) {
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const userId = "USER_ID_HERE"; // Replace with actual logic (e.g., from JWT or auth context)
  if (userId) fetchUserData();
}, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r h-screen fixed top-0 left-0 z-30">
        <Sidebar />
      </aside>

      {/* Page Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b shadow z-20 flex items-center px-6">
          <Navbar />
        </header>

        {/* Main content */}
        <main className="pt-16 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-100 flex-1">
          {loading && <p className="text-center p-10">Loading profile...</p>}
          {error && <p className="text-center p-10 text-red-600">{error}</p>}

          {!loading && !error && userData && (
            <>
              <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-purple-700 mb-2">
                    Hello, {userData.fullName}!
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-700 text-base">
                    <span>📍 {userData.location || "Not specified"}</span>
                    <span>🕒 {userData.availability?.join(", ") || "Not available"}</span>
                    <span>
                      {userData.status === "Public" ? (
                        <Badge className="bg-green-100 text-green-800">Public</Badge>
                      ) : (
                        <Badge className="bg-gray-300 text-gray-800">Private</Badge>
                      )}
                    </span>
                  </div>
                </div>
                <Button variant="default">Edit Profile</Button>
              </header>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-purple-800 mb-4">Your Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-2">Skills Offered</h3>
                    {userData.skills?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {userData.skills.map((skill, index) => (
                          <Badge key={index}>{skill}</Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No skills added yet.</p>
                    )}
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-2">Skills Wanted</h3>
                    {userData.skillsWanted?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {userData.skillsWanted.map((skill, index) => (
                          <Badge key={index} className="bg-yellow-100 text-yellow-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No skills added yet.</p>
                    )}
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
