"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const originalWord = "FUNDAMENTAL RIGHTS";
  const scrambledWord = "NDUHTMSLRTFAANGEI";
  const [input, setInput] = useState("");
  const [deck, setDeck] = useState<string[]>([]);
  const [arranged, setArranged] = useState<(string | null)[]>(
    originalWord.split("").map((char) => (char === " " ? " " : null)),
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (message === "Wrong letter") {
      const timeout = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input) {
      handleAddToDeck();
    }
  };

  const handleAddToDeck = () => {
    const noccurences = originalWord
      .split("")
      .filter((e) => e === input).length;

    const n =
      deck.filter((e) => e === input).length +
      arranged.filter((e) => e === input).length;
    console.log(n);
    console.log(noccurences);
    if (scrambledWord.includes(input) && noccurences > n) {
      if (originalWord.includes(input)) {
        setDeck([...deck, input]);
        setMessage(null);
      }
    } else {
      setMessage("Wrong letter");
    }
    setInput("");
  };

  const handleDragStart =
    (letter: string, fromDeck: boolean, index: number) =>
    (e: React.DragEvent) => {
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({ letter, fromDeck, index }),
      );
    };

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const {
      letter,
      fromDeck,
      index: fromIndex,
    } = JSON.parse(e.dataTransfer.getData("text/plain"));

    const newArranged = [...arranged];

    if (fromDeck) {
      if (!newArranged[index]) {
        const newDeck = deck.filter((_, i) => i !== fromIndex);
        newArranged[index] = letter;
        setDeck(newDeck);
      }
    } else {
      const temp = newArranged[index];
      newArranged[index] = letter;
      newArranged[fromIndex] = temp;
    }

    setArranged(newArranged);

    if (newArranged.join("") === originalWord.split("").join("")) {
      setMessage("You Won!");
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-white p-4">
      <h1 className="mb-6 text-3xl font-bold">Find Me!</h1>
      <div className="mb-4 flex items-center justify-center gap-2">
        {arranged.map((letter, index) => (
          <div
            key={index}
            onDragOver={letter === " " ? undefined : handleDragOver}
            onDrop={letter === " " ? undefined : handleDrop(index)}
            className={`relative flex h-16 w-12 items-center justify-center rounded-lg border shadow ${
              letter === " " ? "invisible bg-gray-400" : "bg-gray-300"
            }`}
          >
            {letter && letter !== " " && (
              <div
                draggable
                onDragStart={handleDragStart(letter, false, index)}
                className="absolute inset-0 flex items-center justify-center rounded-lg bg-blue-500 text-xl font-bold text-white"
              >
                {letter}
              </div>
            )}
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
      <div className="mb-4 flex flex-wrap gap-4">
        {deck.map((letter, index) => (
          <div
            key={index}
            draggable
            onDragStart={handleDragStart(letter, true, index)}
            className="flex h-16 w-12 cursor-move items-center justify-center rounded-lg bg-blue-500 text-xl font-bold text-white shadow"
          >
            {letter}
          </div>
        ))}
      </div>
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
