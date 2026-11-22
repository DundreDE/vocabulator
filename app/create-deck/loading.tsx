export default function loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg bg-stone-800 p-6 shadow-md ">
        <h1 className="mb-4 text-2xl text-center text-transparent font-bold">
          Edit this Deck
        </h1>
        <form className="flex w-full flex-col gap-2">
          <input type="hidden" name="deckId" />
          <input
            type="text"
            name="deckName"
            placeholder="Deck Name"
            required
            maxLength={100}
            className="rounded-md border animate-pulse border-slate-600 p-2"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Cards</h2>

            <div className="flex gap-2">
              <input type="hidden" name="cardId" />
              <input
                type="text"
                name="front"
                placeholder="Front"
                className="min-w-0 flex-1 rounded-md border border-slate-600 animate-pulse p-2"
              />
              <input
                type="text"
                name="back"
                placeholder="Back"
                className="min-w-0 flex-1 rounded-md border border-slate-600 animate-pulse p-2"
              />
              <button
                type="button"
                className="rounded-md bg-slate-600 px-4 py-2 text-transparent"
              >
                Remove
              </button>
            </div>

            <button
              type="button"
              className="rounded-md bg-slate-600 px-4 py-2 text-transparent "
            >
              Add Card
            </button>
          </div>

          <button
            type="submit"
            className="rounded-md bg-slate-600 px-4 py-2 text-transparent "
          ></button>
        </form>
      </div>
    </main>
  );
}
