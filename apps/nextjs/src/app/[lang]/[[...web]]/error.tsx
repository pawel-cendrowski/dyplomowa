"use client"; // Musi być komponentem klienckim

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Layout Error captured:", error);
  }, [error]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Wystąpił błąd połączenia z serwerem. IN</h2>
      <p>Nie udało się pobrać treści strony.</p>
      <button
        onClick={() => reset()} // Próba ponownego załadowania
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}