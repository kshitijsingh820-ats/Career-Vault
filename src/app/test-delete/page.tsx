"use client";

import { useState } from "react";

export default function TestDelete() {
  const [message, setMessage] = useState("");

  const deleteResume = async () => {
    const response = await fetch(
      "/api/resumes?id=cmtue8cti00047kc26mvg6iwk",
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    setMessage(JSON.stringify(data, null, 2));
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Test Delete Resume API</h1>

      <button onClick={deleteResume}>
        Delete Resume
      </button>

      <pre>{message}</pre>
    </main>
  );
}
