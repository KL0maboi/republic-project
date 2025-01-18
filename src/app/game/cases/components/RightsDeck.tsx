import React from "react";

type RightsDeckProps = {
  rights: {
    name: string;
    description: string;
    icon: string;
  }[];
  answered: boolean;
};

export default function RightsDeck({ rights, answered }: RightsDeckProps) {
  const handleDragStart = (e: React.DragEvent, name: string) => {
    e.dataTransfer.setData("text/plain", name);
  };

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {rights.map((right) => (
        <div
          key={right.name}
          draggable={!answered}
          onDragStart={(e) => handleDragStart(e, right.name)}
          className="w-48 transform cursor-pointer rounded-lg border bg-blue-50 p-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg"
        >
          <div className="text-center text-4xl">{right.icon}</div>
          <h3 className="mt-2 text-center text-lg font-bold">{right.name}</h3>
          <p className="mt-1 text-center text-sm text-gray-600">
            {right.description}
          </p>
        </div>
      ))}
    </div>
  );
}
