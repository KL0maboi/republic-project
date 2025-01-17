import React, { useState, useEffect } from "react";

type RightsDeckProps = {
  rights: {
    name: string;
    description: string;
    icon: string;
  }[];
};

export default function RightsDeck({ rights }: RightsDeckProps) {
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  // const draggedCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setDragPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
      setDragPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleDragStart = (e: React.DragEvent, name: string) => {
    console.log("jej");
    e.preventDefault();
    setDragging(name);

    setDragPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragPosition({ x: 0, y: 0 });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedCard = e.dataTransfer.getData("text/plain");
    console.log("Dropped card:", droppedCard);
  };

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {rights.map((right) => (
        <div
          key={right.name}
          draggable
          onDragStart={(e) => handleDragStart(e, right.name)}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          className={`w-48 transform cursor-pointer rounded-lg border bg-blue-50 p-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg`}
          style={{
            position: dragging === right.name ? "absolute" : "relative",
            left: dragging === right.name ? `${dragPosition.x - 50}px` : "auto",
            top: dragging === right.name ? `${dragPosition.y - 50}px` : "auto",
            zIndex: dragging === right.name ? 999 : "auto",
            pointerEvents: dragging ? "none" : "auto",
          }}
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
