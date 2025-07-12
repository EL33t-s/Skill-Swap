import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [id]);

  if (!user) return <p>Loading user profile...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
        <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
        <p className="text-gray-600">{user.location}</p>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, i) => (
            <Badge key={i}>{skill}</Badge>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Availability</h2>
        <p>{user.availability}</p>
      </section>

      <div className="mt-6 text-center">
        <Button variant="outline">Request Swap</Button>
      </div>
    </div>
  );
};

export default Profile;
