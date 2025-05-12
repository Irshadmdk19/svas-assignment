import React, { useEffect, useState } from 'react';

const UserSearch = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {   //Fetching from api
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(data => {
        setUsers(data.results);   
        setLoading(false);            
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Random Users</h2>
      {loading ? (
        <p>Loading users</p>
      ) : (
        <p>Fetchedusers from the API.</p>
      )}
    </div>
  );
};

export default UserSearch;
