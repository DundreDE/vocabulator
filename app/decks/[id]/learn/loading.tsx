export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="relative">
        <h1 className="mb-4 text-2xl text-center text-transparent invisible select-none font-bold">
          Test
        </h1>
        {/* card learning  */}

        <div className="flex flex-col items-center justify-center">
          <h1 className="absolute bottom-full mb-2.5 w-full text-center text-transparent text-2xl font-bold">
            Learn your deck
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative overflow-hidden flex h-40 w-64 cursor-grab touch-none select-none items-center justify-center rounded border p-4 text-center active:cursor-grabbing">
              <div className="pointer-events-none absolute inset-0 bg-slate-600 animate-pulse text-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-slate-600 animate-pulse text-transparent" />
              <p className="relative text-4xl font-semibold"></p>
            </div>
          </div>

          <div className="mt-4 flex w-64 flex-col gap-3">
            <button
              type="button"
              className="rounded-lg border-2 bg-transparent text-transparent px-4 py-3 text-center"
            ></button>
          </div>
        </div>
        {/* Card learning ended */}
      </div>
      <button className="fixed bottom-4 animate-pulse left-4 inline-block rounded-lg bg-slate-600 px-4 py-2 text-transparent ">
        Back to the Dashboard
      </button>
    </main>
  );
}
