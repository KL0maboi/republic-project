import React from "react";

type CaseCardProps = {
  caseText: string;
  onDrop: (droppedCard: string) => void;
};

export default function CaseCard({ caseText, onDrop }: CaseCardProps) {
  const handleDragOver = (event: React.MouseEvent) => event.preventDefault();

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedCard = event.dataTransfer.getData("text/plain");
    onDrop(droppedCard);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-center shadow-md"
      style={{ minHeight: "150px", width: "300px" }}
    >
      <h2 className="text-xl font-semibold">{caseText}</h2>
    </div>
  );
}
