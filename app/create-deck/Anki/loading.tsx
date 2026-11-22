export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg bg-stone-800 p-6 shadow-md ">
        <h1 className="mb-4 text-2xl text-center text-transparent select-none font-bold">
          Import a Deck from an Anki File.
        </h1>
        <div className="space-y-4 rounded-xl border p-4">
          <input type="file" className="text-sm" />
        </div>
      </div>
      <button className="fixed bottom-4 left-4 inline-block rounded-lg select-none  animate-pulse bg-slate-600 px-4 py-2 text-transparent">
        Back to the Dashboard
      </button>
    </main>
  );
}
