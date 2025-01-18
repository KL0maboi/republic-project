import React from "react";

const rights = [
  {
    name: "Right to Equality",
    description:
      "Article 14: Ensures equality before the law and prohibits discrimination based on religion, race, caste, sex, or place of birth.",
    icon: "⚖️",
  },
  {
    name: "Right to Freedom",
    description:
      "Article 19: Guarantees freedoms of speech, expression, assembly, movement, and profession.",
    icon: "🕊️",
  },
  {
    name: "Right against Exploitation",
    description:
      "Article 23 & 24: Prohibits human trafficking, forced labor, and child labor.",
    icon: "🛑",
  },
  {
    name: "Cultural and Educational Rights",
    description:
      "Article 29 & 30: Protects cultural rights and the right to establish educational institutions for minorities.",
    icon: "🎓",
  },
  {
    name: "Right to Freedom of Religion",
    description:
      "Article 25-28: Protects the freedom to practice, profess, and propagate religion.",
    icon: "🛐",
  },
  {
    name: "Right to Constitutional Remedies",
    description:
      "Article 32: Provides the right to approach the Supreme Court for enforcement of rights.",
    icon: "📜",
  },
];

const RightsPage: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center p-6">
      <h1 className="mb-6 text-3xl font-semibold">Fundamental Rights</h1>

      <div className="mb-12 grid w-[80%] flex-[3] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rights.slice(0, 3).map((right) => (
          <div
            key={right.name}
            className="cursor-pointer rounded-lg border bg-white p-4 shadow-md transition hover:shadow-lg"
          >
            <div className="mb-2 flex items-center justify-center text-4xl">
              {right.icon}
            </div>
            <h2 className="text-center text-lg font-semibold">{right.name}</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {right.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-12 grid w-[80%] flex-[3] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rights.slice(3).map((right) => (
          <div
            key={right.name}
            className="cursor-pointer rounded-lg border bg-white p-4 shadow-md transition hover:shadow-lg"
          >
            <div className="mb-2 flex items-center justify-center text-4xl">
              {right.icon}
            </div>
            <h2 className="text-center text-lg font-semibold">{right.name}</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {right.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightsPage;
