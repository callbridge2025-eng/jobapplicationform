"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          alert("Location permission is required.");
        }
      );
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!location) {
      alert("Please allow location access.");
      return;
    }

    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      latitude: location.latitude,
      longitude: location.longitude,
    };

    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    alert("Application submitted successfully!");
    e.target.reset();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            fontWeight: 600,
            textAlign: "center",
            color: "#333",
          }}
        >
          Job Application Form
        </h1>

        <p
          style={{
            fontSize: "14px",
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Kindly fillup all required informations and submit. Our HR team will
          contact you shortly.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            required
            style={inputStyle}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "white",
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer",
};
