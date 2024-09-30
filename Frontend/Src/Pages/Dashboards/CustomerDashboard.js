import React, { useEffect, useState } from 'react';
import { supabase } from '../../Api/supabaseClient'; // Supabase client

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await supabase.auth.getSession();
      setUser(session?.data?.session?.user || null);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
      <p>This is a customer account for: {user.email}</p>
      <p>UID: {user.id}</p>
    </div>
  );
};

export default CustomerDashboard;
