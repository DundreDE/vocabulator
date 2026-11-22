export default function Loading() {
  type Direction = "front-back" | "back-front" | "both";
 type Mode = "click" | "type" | "choice";

    const directionOptions: { value: Direction; label: string }[] = [
      { value: "front-back", label: "Front to Back" },
      { value: "back-front", label: "Back to Front" },
      { value: "both", label: "Both" },
    ];
    
    const modeOptions: { value: Mode; label: string }[] = [
      { value: "click", label: "Flip cards" },
      { value: "type", label: "Type answer" },
      { value: "choice", label: "Choose it like a quiz" },
    ];
  return (
    <>
   <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4" aria-hidden="true">
      <h1 className="text-2xl font-bold text-transparent select-none">Testtee</h1>
          <div className="flex flex-col items-center text-center gap-3">
    <div role="radiogroup" className="inline-flex gap-1 rounded-lg border p-1">
      {directionOptions.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          className={`rounded-md px-3 py-1.5 text-sm transition bg-slate-600 text-transparent animate-pulse`}
        >
          {o.label}
        </button>
      ))}
    </div>
    <div role="radiogroup" className="inline-flex gap-1 rounded-lg border p-1">
      {modeOptions.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"

          className={`rounded-md px-3 py-1.5 text-sm transition bg-slate-600 text-transparent animate-pulse`}
        >
          {o.label}
        </button>
      ))}
    </div>

      <button
        className="rounded-lg  px-4 py-2 text-transparent bg-slate-600 animate-pulse"
      >
        Start Learning
      </button>
      <button
        className="rounded-lg  px-4 py-2 text-transparent bg-slate-600 animate-pulse"
      >
        Back to the Dashboard
      </button>
    </div>
    </main>
    </>
  );
}
