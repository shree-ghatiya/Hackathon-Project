import React from "react";

const ProfileCard = ({ name, role, location, email, avatar }) => {
  return (
    <div style={{
      width: "300px",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <img 
        src={avatar} 
        alt={name} 
        style={{ width: "100px", height: "100px", borderRadius: "50%" }} 
      />
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{location}</p>
      <p>{email}</p>
      <button style={{
        marginTop: "10px",
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#6366f1",
        color: "white",
        cursor: "pointer"
      }}>
        Connect
      </button>
    </div>
  );
};

export default function ProfileCardDemo() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <ProfileCard
        name="Mahendra Singh"
        role="Full Stack Developer"
        location="Jaipur, India"
        email="mahendra@example.com"
        avatar="https://i.pravatar.cc/150?img=3"
      />
    </div>
  );
}
