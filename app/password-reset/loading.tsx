export default function Loading() {
  return (
    <main>
      <div className="mt-4 min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl text-transparent font-bold">Password Reset</h1>
        <p className="text-center text-transparent text-lg">
          Please enter your email to receive a password reset link.
        </p>
        <div className="flex flex-col gap-2 animate-pulse bg-stone-800 p-4 rounded-lg">
          <form className="mx-auto flex max-w-sm flex-col gap-3 p-8">
            <input className="rounded border animate-pulse select-none border-slate-600 bg-slate-600 px-3 py-2 text-transparent" />
            <button className="rounded-lg animate-pulse select-none bg-slate-600 px-4 py-2 text-transparent disabled:opacity-50"></button>
          </form>
        </div>
      </div>
    </main>
  );
}
