import React, { useEffect } from "react";

const Profile = ({ params }: { params: { id: string } }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      User: <span className="bg-orange-400 text-white px-2 py-1 rounded-lg ml-3">{params.id}</span>
    </div>
  );
};

export default Profile;
