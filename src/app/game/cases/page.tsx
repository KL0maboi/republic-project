export default function Home() {
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
      name: "Cultural and educational rights",
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
      name: "Right to constitutional remedies",
      description:
        "Article 32: Provides the right to approach the Supreme Court for enforcement of rights.",
      icon: "📜",
    },
  ];

  const cases = [
    {
      text: "Imagine two individuals, Ravi and Priya, both applying for the same job at a company. Ravi is a man, and Priya is a woman. Both have similar qualifications, experience, and skills. However, in some companies, gender biases may exist, and women might not be considered equally for certain roles, especially in traditionally male-dominated industries",
    },
  ];

  return (
    <main className="flex h-screen w-screen flex-col items-center bg-gray-100 p-8">
      <h1 className="mb-6 flex-[1] text-center text-3xl font-bold">
        This Situation involves which right?
      </h1>

      <div className="mb-12 grid w-[80%] flex-[3] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rights.map((right) => (
          <div
            key={right.name}
            className="rounded-lg border bg-white p-4 shadow-md transition hover:shadow-lg"
          >
            <div className="mb-2 flex items-center justify-center text-2xl">
              {right.icon}
            </div>
            <h2 className="text-center text-lg font-semibold">{right.name}</h2>
            <p className="text-center text-sm text-gray-600">
              {right.description}
            </p>
          </div>
        ))}
      </div>

      <div className="h-full w-full rounded-lg border bg-white p-6 text-center shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Situation</h2>
        <p className="text-gray-700">{cases[0].text}</p>
      </div>
    </main>
  );
}
