"use client";
import React, { useState, useRef } from "react";

type CaseCardProps = {
  caseText: string;
  correctAnswer: string;
  onAnswer: (answer: string) => void;
};

const CaseCard: React.FC<CaseCardProps> = ({
  caseText,
  correctAnswer,
  onAnswer,
}) => {
  const [dragging, setDragging] = useState(false);
  //   const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const dropRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setDragging(true);
    // setDraggedItem(correctAnswer);
    e.dataTransfer.setData("text/plain", correctAnswer);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedItem = e.dataTransfer.getData("text");
    if (droppedItem === correctAnswer) {
      onAnswer(correctAnswer);
    } else {
      alert("Wrong answer, try again!");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mb-6 max-w-sm rounded-lg bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-xl font-semibold">{caseText}</h2>
      <div className="space-y-4">
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`mt-4 border-2 border-dashed p-6 ${dragging ? "bg-gray-200" : "bg-gray-100"}`}
          style={{ minHeight: "100px" }}
        >
          {dragging ? "Release to drop here" : "Drag the correct answer here"}
        </div>
        <div
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="w-full cursor-pointer rounded-lg bg-blue-500 px-6 py-2 text-lg text-white"
        >
          {correctAnswer}
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
