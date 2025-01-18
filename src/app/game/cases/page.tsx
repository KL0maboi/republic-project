"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import CaseCard from "./components/CaseCard";
import RightsDeck from "./components/RightsDeck";

export default function Cases() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  const cases = [
    {
      text: "Case 1: Right to Free Speech",
      correctAnswer: "Freedom of Speech",
    },
    { text: "Case 2: Right to Equality", correctAnswer: "Right to Equality" },
    { text: "Case 3: Right to Privacy", correctAnswer: "Right to Privacy" },
  ];

  const rights = [
    {
      name: "Freedom of Speech",
      description:
        "The right to express opinions without censorship or restraint.",
      icon: "🗣️",
    },
    {
      name: "Right to Equality",
      description: "The right to be treated equally before the law.",
      icon: "⚖️",
    },
    {
      name: "Right to Privacy",
      description:
        "The right to personal privacy and protection of personal data.",
      icon: "🔒",
    },
  ];

  const handleDrop = (droppedCard: string) => {
    setAnswered(true);
    if (droppedCard === cases[currentCaseIndex].correctAnswer) {
      setFeedback("Correct!");

      setTimeout(() => {
        setAnswered(false);

        setFeedback(null);
        if (currentCaseIndex === cases.length - 1) {
          redirect("/game/final");
        } else {
          setCurrentCaseIndex((prev) => (prev + 1) % cases.length);
        }
      }, 2000);
    } else {
      setFeedback("Wrong Answer. Try Again!");
      setTimeout(() => {
        setFeedback(null);
        setAnswered(false);
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-6 text-3xl font-bold">Fundamental Rights Game</h1>
      <CaseCard caseText={cases[currentCaseIndex].text} onDrop={handleDrop} />
      {feedback && (
        <div
          className={`mt-4 text-lg font-semibold ${feedback === "Correct!" ? "text-green-500" : "text-red-500"}`}
        >
          {feedback}
        </div>
      )}
      <RightsDeck rights={rights} answered={answered} />
    </div>
  );
}