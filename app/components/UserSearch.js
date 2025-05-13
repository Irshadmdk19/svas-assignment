"use client";
import React, { useEffect, useState } from "react";

const UserSearch = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    //Fetching from api
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  //applying filter to search by firsrname
  const filteredUsers = users.filter((user) =>
    user.name.first.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Search Contacts</h2>
      <input
        type="text"
        placeholder="Search by first name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          fontSize: "1rem",
        }}
      />
      <ul
        style={{
          maxHeight: "200px",
          overflowY: "scroll",
          listStyle: "none",
          padding: 0,
          margin: 0,
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        {filteredUsers.map((user, index) => (
          <li
            key={index}
            onClick={() => setSelectedUser(user)}
            style={{
              padding: "0.5rem",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
          >
            {user.name.first} {user.name.last}
          </li>
        ))}
      </ul>
      {loading && <p>Loading users...</p>}
      {selectedUser && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>Selected  User Details</h3>
          <img
            src={selectedUser.picture.large}
            alt="User"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
          <p>
            <strong>Full Name:</strong> {selectedUser.name.title}{" "}
            {selectedUser.name.first} {selectedUser.name.last}
          </p>
          <p>
            <strong>Gender:</strong> {selectedUser.gender}
          </p>
          <p>
            <strong>Emaill:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedUser.phone}
          </p>
          <p>
            <strong>County:</strong> {selectedUser.location.country}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
