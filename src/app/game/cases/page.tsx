"use client";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

  const rights = [
    {
      name: "Right to Equality",
      icon: "⚖️",
    },
    {
      name: "Right to Freedom",
      icon: "🕊️",
    },
    {
      name: "Right against Exploitation",
      icon: "🛑",
    },
    {
      name: "Cultural and Educational Rights",
      icon: "🎓",
    },
    {
      name: "Right to Freedom of Religion",
      icon: "🛐",
    },
    {
      name: "Right to Constitutional Remedies",
      icon: "📜",
    },
  ];

  const cases = [
    {
      name: "State of West Bengal v. Anwar Ali Sarkar (1952)",
      text: "In this case, the Supreme Court examined whether a law that allowed for preventive detention without trial violated the right to equality. The Court held that such laws must not be arbitrary and should provide reasonable safeguards against misuse.",
      correctAnswer: "Right to Equality",
    },
    {
      name: "Maneka Gandhi v. Union of India (1978)",
      text: "Maneka Gandhi's passport was impounded by the government without providing reasons. The Supreme Court ruled that the right to travel abroad is a part of the right to personal liberty under Article 21, and any restriction must be reasonable and follow due process.",
      correctAnswer: "Right to Freedom",
    },
    {
      name: "K.S. Puttaswamy v. Union of India (2017)",
      text: "The Supreme Court unanimously declared the right to privacy as a fundamental right under the Constitution, emphasizing that privacy is intrinsic to the right to life and personal liberty.",
      correctAnswer: "Right to Constitutional Remedies",
    },
    {
      name: "Indian Young Lawyers Association v. State of Kerala (2018)",
      text: "The Supreme Court lifted the ban on women of menstruating age entering the Sabarimala temple, ruling that the practice violated the right to equality and the right to freedom of religion.",
      correctAnswer: "Right to Freedom of Religion",
    },
    {
      name: "Unni Krishnan, J.P. v. State of Andhra Pradesh (1993)",
      text: "The Supreme Court held that the right to education is a fundamental right under Article 21, and the state is obligated to provide free and compulsory education to children up to the age of 14.",
      correctAnswer: "Cultural and Educational Rights",
    },
    {
      name: "Bandhua Mukti Morcha v. Union of India (1984)",
      text: "The Supreme Court addressed the issue of bonded labor, ruling that the practice violated the right against exploitation and directed the government to take steps to eliminate it.",
      correctAnswer: "Right against Exploitation",
    },
  ];

  const handleRightClick = (right: string) => {
    if (selectedRight == cases[currentCaseIndex].correctAnswer) return;

    setSelectedRight(right);
    if (right === cases[currentCaseIndex].correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setWrongAnswers((prev) => [...prev, right]);
    }
  };

  const handleNextCase = () => {
    if (currentCaseIndex === 5) return redirect("/game/cases/rights");
    setIsCorrect(null);
    setSelectedRight(null);
    setWrongAnswers([]);
    setCurrentCaseIndex((prev) => (prev + 1) % cases.length);
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center bg-gray-100 p-8">
      <h1 className="mb-6 flex-[1] text-center text-3xl font-bold">
        This Situation involves which right?
      </h1>

      <div className="mb-12 grid w-[80%] flex-[3] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rights.map((right) => (
          <div
            key={right.name}
            onClick={() => handleRightClick(right.name)}
            className={`cursor-pointer rounded-lg border p-4 shadow-md transition hover:shadow-lg ${
              selectedRight === right.name
                ? isCorrect
                  ? "cursor-default border-green-500 bg-green-100"
                  : "cursor-default border-red-500 bg-red-100"
                : wrongAnswers.includes(right.name)
                  ? "cursor-default border-red-500 bg-red-100"
                  : "bg-white"
            }`}
          >
            <div className="mb-2 flex items-center justify-center text-4xl">
              {right.icon}
            </div>
            <h2 className="text-center text-lg font-semibold">{right.name}</h2>
          </div>
        ))}
      </div>

      <div className="h-full w-full rounded-lg border bg-white p-6 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">
          {cases[currentCaseIndex].name}
        </h2>
        <p className="text-lg text-gray-700">{cases[currentCaseIndex].text}</p>
      </div>

      {isCorrect == true && (
        <button
          onClick={handleNextCase}
          className="fixed bottom-8 right-8 flex items-center justify-center rounded-full bg-blue-500 p-4 text-white hover:scale-105 active:scale-95"
        >
          <span className="text-xl">➡️</span>
        </button>
      )}
    </main>
  );
}
