import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-4xl font-bold">Republic Day Event</h1>

      <div className="flex gap-8">
        <Link href="/game">
          <button className="transform rounded-lg bg-blue-500 px-6 py-3 text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95">
            Event 1
          </button>
        </Link>

        <Link href="/about">
          <button className="transform rounded-lg bg-green-500 px-6 py-3 text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95">
            Event 2
          </button>
        </Link>
      </div>
    </div>
  );
}
