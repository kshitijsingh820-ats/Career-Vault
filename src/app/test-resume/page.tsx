"use client";

import { useState } from "react";

export default function TestResume() {
  const [message, setMessage] = useState("");

  const createResume = async () => {
    const response = await fetch("/api/resumes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Frontend Developer Resume",
        content: "React, Next.js, JavaScript, TypeScript",
        userId: "cmtudl9mg00037kc228jxfcnd",
      }),
    });

    const data = await response.json();

    setMessage(JSON.stringify(data, null, 2));
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Test Resume API</h1>

      <button onClick={createResume}>
        Create Resume
      </button>

      <pre>{message}</pre>
    </main>
  );
}