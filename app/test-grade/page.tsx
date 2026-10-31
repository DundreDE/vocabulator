"use client";

import { gradeCard } from "../decks/[id]/learn/action";

const CARD_ID = "02922094-bf51-4dfe-923f-e112e95cd3d1";

export default function TestGradeSystemPage() {
  return (
    <div>
      <h1>Test Grade System</h1>
      <button
        onClick={async () => {
          try {
            await gradeCard(CARD_ID, "good");
            alert("Card graded successfully!");
          } catch (error) {
            console.error("Error grading card:", error);
            alert(error instanceof Error ? error.message : String(error));
          }
        }}
      >
        Grade Card
      </button>
    </div>
  );
}
