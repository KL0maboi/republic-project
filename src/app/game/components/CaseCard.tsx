import React from "react";

type CaseCardProps = {
  caseText: string;
  onDrop: (droppedCard: string) => void;
};

const CaseCard: React.FC<CaseCardProps> = ({ caseText, onDrop }) => {
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedCard = e.dataTransfer.getData("text/plain");
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
};

export default CaseCard;
