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
      name: "K.S. Puttaswamy v. Union of India (2017)",
      text: "In a case involving the government's decision to make biometric data collection mandatory for citizens, petitioners argued that the move infringed on privacy. The petitioners claimed that the program lacked sufficient safeguards to prevent misuse, and that it exposed individuals to unnecessary risks. The case raised complex questions about the boundaries of personal space and how far the state could go in collecting sensitive data from its citizens.",
      correctAnswer: "Right to Constitutional Remedies",
    },
    {
      name: "Unni Krishnan, J.P. v. State of Andhra Pradesh (1993)",
      text: "Several private educational institutions were found to be charging exorbitant fees, making education inaccessible to a large segment of the population. A petition was filed arguing that such practices were detrimental to the public good and violated the rights of children. The case dealt with whether education should be treated as a privilege or a fundamental necessity, and whether the state had a role in ensuring access to education for all children.",
      correctAnswer: "Cultural and Educational Rights",
    },
    {
      name: "Bandhua Mukti Morcha v. Union of India (1984)",
      text: "Workers employed in brick kilns and quarries were subjected to conditions that forced them into bonded labor. These workers were often unable to escape due to overwhelming debt and lack of agency. An organization fighting for the rights of these workers filed a petition, asking the court to intervene and stop the practice of bonded labor. The case highlighted the severe exploitation of vulnerable populations and the need for stronger enforcement of labor laws.",
      correctAnswer: "Right against Exploitation",
    },
    {
      name: "State of West Bengal v. Anwar Ali Sarkar (1952)",
      text: "A group of individuals were detained under a special law aimed at controlling unlawful activities in a particular region. The detention was carried out without trial or the usual legal procedures, and the accused challenged the process, arguing that it violated basic principles of justice. The law permitted detention based on suspicion, but the lack of transparency in the process raised concerns about fairness and arbitrary actions by the state.",
      correctAnswer: "Right to Equality",
    },
    {
      name: "Minerva Mills Ltd. v. Union of India (1980)",
      text: "A textile manufacturing company faced government action under a law aimed at nationalizing certain industries deemed to be underperforming. The company challenged the validity of this law, arguing that it granted excessive power to the state, potentially undermining the balance of authority established by the Constitution. The case required the court to examine whether the legislation in question disrupted the equilibrium between different branches of government, and if such concentration of power was permissible under the constitutional framework.",
      correctAnswer: "Right to Constitutional Remedies",
    },
    {
      name: "Maneka Gandhi v. Union of India (1978)",
      text: "Maneka Gandhi, a prominent journalist, was suddenly denied the right to travel abroad when the government seized her passport without providing any valid reasons. This action was taken under a broad discretionary power of the state, and Maneka challenged the decision, arguing that her ability to travel freely was unjustly curtailed. The case centered on whether the government’s actions violated her basic freedoms and personal liberty.",
      correctAnswer: "Right to Freedom",
    },
    {
      name: "Indian Young Lawyers Association v. State of Kerala (2018)",
      text: "A group of women petitioned the Supreme Court to challenge a religious practice that restricted women of a certain age from entering a temple. The practice had been long-standing, rooted in tradition, but the petitioners argued that it was discriminatory and violated their fundamental freedoms. The case prompted a debate over the intersection of religious customs and modern constitutional values, questioning how far religious practices could be maintained when they clash with individual rights.",
      correctAnswer: "Right to Freedom of Religion",
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
    if (currentCaseIndex === 6) return redirect("/game/cases/rights");
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
