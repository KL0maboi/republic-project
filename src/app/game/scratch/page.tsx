"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const originalWord = "FUNDAMENTALRIGHTS";
  const scrambledWord = "NDUHTMSLRTFAANGEI";

  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState<boolean[]>(
    Array(scrambledWord.length).fill(false),
  );
  const [arranged, setArranged] = useState<string[]>(scrambledWord.split(""));
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (message === "Wrong letter") {
      const timeout = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const handleReveal = () => {
    const newRevealed = [...revealed];
    let found = false;

    scrambledWord.split("").forEach((letter, index) => {
      if (letter === input) {
        newRevealed[index] = true;
        found = true;
      }
    });

    if (found) {
      setMessage(null);
    } else {
      setMessage("Wrong letter");
    }

    setRevealed(newRevealed);
    setInput("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input) {
      handleReveal();
    }
  };

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const newArranged = [...arranged];
    [newArranged[index], newArranged[draggedIndex]] = [
      newArranged[draggedIndex],
      newArranged[index],
    ];
    setArranged(newArranged);
    console.log(newArranged.join(""), originalWord);
    if (newArranged.join("") === originalWord) {
      setMessage("You Won!");
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-6 text-3xl font-bold">Scrambled Word Game</h1>
      <div className="mb-4 flex flex-wrap justify-center gap-4">
        {arranged.map((letter, index) => (
          <div
            key={index}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={handleDrop(index)}
            className={`relative flex h-16 w-12 items-center justify-center rounded-lg border bg-gray-200 shadow ${
              revealed[index]
                ? "bg-blue-500 text-black"
                : "bg-white text-gray-400"
            }`}
          >
            <div
              className={`absolute inset-0 flex items-center justify-center text-xl font-bold transition-transform duration-500 ${
                revealed[index] ? "rotate-y-0" : "rotate-y-180"
              }`}
            >
              {revealed[index] ? letter : "?"}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        maxLength={1}
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        onKeyDown={handleInputKeyDown}
        placeholder="Enter a letter"
        className="mb-4 w-64 rounded-lg border border-gray-300 p-2 text-center text-lg"
      />
      {message && (
        <p
          className={`mt-4 text-lg font-semibold ${
            message === "You Won!" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
