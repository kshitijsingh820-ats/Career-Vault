"use client";

import { useState } from "react";

export default function TestUser() {
  const [message, setMessage] = useState("");

  const createUser = async () => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Kshitij",
        email: "email: kshitij2@example.com",
      }),
    });

    const data = await response.json();

    setMessage(JSON.stringify(data, null, 2));
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Test User API</h1>

      <button  onClick={createUser}>
        Create User
      </button>

      <pre>{message}</pre>
    </main>
  );
}