// src/[id].jsx

import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">this is exemple </h1>
      <p>Viewing profile for user ID: {id}</p>
      {/* Fetch and display user data based on the ID */}
    </div>
  );
};

export default UserProfile;
