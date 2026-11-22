export default function Loading() {
  return (
    <main>
      <div className="bg-stone-800 flex flex-col items-center justify-center min-h-screen gap-4">
        <form className="flex flex-col gap-4">
          <input />
          <button className="bg-slate-600 animate-pulse select-none text-transparent px-4 py-2 rounded">
            Set New Password
          </button>
        </form>
      </div>
    </main>
  );
}
