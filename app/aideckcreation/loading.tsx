export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg bg-stone-800 p-6 shadow-md ">
        <h1 className="mb-4 text-2xl text-center text-transparent font-bold">
          Import a Deck
        </h1>
        <div className="space-y-4">
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-slate-600  p-8 text-center text-sm">
            <span></span>
            <input type="file" className="hidden text-transparent" />
          </label>
        </div>
      </div>
    </main>
  );
}
