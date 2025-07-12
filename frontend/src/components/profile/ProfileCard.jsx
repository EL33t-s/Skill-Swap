import React from "react";
import { Link } from "react-router-dom";
import Badge from "../UI/Badge";
import Button from "../UI/Button";

const Profilecard = ({ match }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition">
            <div className="w-20 h-20 bg-gray-200 rounded-full mb-4" />
            <h3 className="font-semibold text-lg mb-1">{match.user.name}</h3>
            <p className="text-gray-600 text-sm mb-1">{match.user.location}</p>
            <div className="flex flex-wrap justify-center gap-1 mb-2">
                {match.user.skills.map((skill, idx) => (
                    <Badge key={idx}>{skill}</Badge>
                ))}
            </div>
            <p className="text-xs text-gray-500 mb-1">Matched for: {match.skill}</p>
            <p className="text-xs text-gray-500 mb-1">On: {new Date(match.date).toLocaleDateString()}</p>
            <Badge className="bg-green-100 text-green-800">{match.status}</Badge>
            <div className="flex gap-2 mt-3">
                <Link to={`/profile/${user._id}`}>
                    <Button variant="outline" size="sm">View Profile</Button>
                </Link>
            </div>
        </div>
    );
};

export default Profilecard;
