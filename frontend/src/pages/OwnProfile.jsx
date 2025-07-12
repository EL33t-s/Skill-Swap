import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const OwnProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Assume logged-in user's ID stored in localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchOwnProfile();
    }
  }, [userId]);

  const fetchOwnProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch own profile:", error);
    }
  };

  if (!userId) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Please log in to view your profile.</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Loading your profile...</h2>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r h-screen fixed top-0 left-0 z-30">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col ml-64">
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b shadow z-20 flex items-center px-6">
          <Navbar />
        </header>

        <main className="pt-16 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-100 flex-1 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-700 mb-6">My Profile</h1>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 bg-gray-300 rounded-full mb-4" />
              <h2 className="text-3xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.location}</p>
            </div>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, i) => (
                  <Badge key={i}>{skill}</Badge>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Availability</h3>
              <p>{user.availability}</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Profile Status</h3>
              <Badge
                className={
                  user.status === "Public"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-200 text-gray-800"
                }
              >
                {user.status}
              </Badge>
            </section>

            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" onClick={() => navigate("/edit-profile")}>
                Edit Profile
              </Button>
              <Button variant="default">Change Password</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnProfile;
