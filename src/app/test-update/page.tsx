"use client";

import { useState } from "react";

export default function TestUpdate() {
  const [message, setMessage] = useState("");

  const updateResume = async () => {
    const response = await fetch(
      "/api/resumes?id=cmtug8uiv00003cc2m8i14guc",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Full Stack Developer Resume",
          content: "React, Next.js, PostgreSQL, Prisma",
        }),
      }
    );

    const data = await response.json();

    setMessage(JSON.stringify(data, null, 2));
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Test Update Resume API</h1>

      <button onClick={updateResume}>
        Update Resume
      </button>

      <pre>{message}</pre>
    </main>
  );
}