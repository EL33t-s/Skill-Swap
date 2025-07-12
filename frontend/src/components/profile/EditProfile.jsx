import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    skills: "",
    availability: "",
    status: "Public",
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      const data = res.data;
      setFormData({
        name: data.name || "",
        location: data.location || "",
        skills: data.skills ? data.skills.join(", ") : "",
        availability: data.availability || "",
        status: data.status || "Public",
      });
    } catch (err) {
      console.error("Failed to load user data", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert comma-separated skills string to array
      const updatedData = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
      };

      await axios.put(`http://localhost:5000/api/users/${userId}`, updatedData);
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Error updating profile.");
    }
  };

  if (!userId) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Please log in to edit your profile.</h2>
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

        <main className="pt-16 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-100 flex-1 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-purple-700">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label className="block font-semibold mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="skills">
                Skills <small>(comma separated)</small>
              </label>
              <input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                placeholder="Photoshop, Guitar, ReactJS"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="availability">
                Availability
              </label>
              <input
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full"
                placeholder="Weekends, Evenings"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="status">
                Profile Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="submit" variant="default">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/profile")}>
                Cancel
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
