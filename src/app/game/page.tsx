"use client";
import { useState } from "react";
import CaseCard from "./components/CaseCard";

export default function Game() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const cases = [
    {
      text: "Case 1: Right to Free Speech",
      correctAnswer: "Freedom of Speech",
    },
    { text: "Case 2: Right to Equality", correctAnswer: "Right to Equality" },
    { text: "Case 3: Right to Privacy", correctAnswer: "Right to Privacy" },
  ];

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentCaseIndex((prevIndex) => (prevIndex + 1) % cases.length);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-3xl font-semibold">
        Drag the Correct Fundamental Right
      </h1>
      <CaseCard
        caseText={cases[currentCaseIndex].text}
        correctAnswer={cases[currentCaseIndex].correctAnswer}
        onAnswer={handleAnswerSelection}
      />
      {selectedAnswer && (
        <div className="mt-4 text-xl font-semibold text-green-500">
          Correct answer: {selectedAnswer}
        </div>
      )}
    </div>
  );
}
