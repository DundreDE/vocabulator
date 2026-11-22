export default function Loading() {
  return (
    <>
      <main>
        <div>
          <div className="mt-4 min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl text-transparent animate-pulse select-none font-bold">
              Login/Register
            </h1>
            <p className="text-center text-transparent animate-pulse select-none text-lg">
              Please login or register to continue.
            </p>
            <div className="flex flex-col gap-2 bg-stone-800 p-4 rounded-lg">
              <form className="mx-auto flex max-w-sm flex-col gap-3 p-8">
                <input type="hidden" name="next" />
                <input className="rounded-lg text-transparent select-none animate-pulse border-2 py-1 border-slate-600" />
                <input className="rounded-lg  border-2 border-slate-600 select-none animate-pulse py-1 text-transparent" />
                <button className="rounded bg-slate-600 select-none animate-pulse px-4 py-2 text-transparent">
                  Log in
                </button>
                <button className="rounded bg-slate-600 select-none animate-pulse px-4 py-2 text-transparent">
                  Register
                </button>
              </form>
              <button className="text-center inline-block rounded-lg select-none animate-pulse bg-slate-600 px-4 py-2 text-transparent">
                Forgot your Password? Click here to reset it.
              </button>
              <button className="text-center inline-block rounded-lg select-none animate-pulse bg-slate-600 px-4 py-2 text-transparent">
                Already logged in? Go to the dashboard.
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
