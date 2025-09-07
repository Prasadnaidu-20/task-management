import { useEffect, useState } from "react";
import { getUser } from "../api";

interface User {
  _id: string;
  name: string;
  email: string;
}

const UserDetails = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(userId);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};

export default UserDetails;
