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

    alert("Submitted successfully!");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" required />
        <br /><br />
        <input name="phone" placeholder="Phone Number" required />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

