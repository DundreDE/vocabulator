import Navbar from "@/app/components/navbar";

const SKELETON_CARDS = 4;

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-4 p-6">
        <div className="mb-4 rounded h-8 w-40 animate-pulse rounded bg-slate-600 px-2 py-6 animate-pulse" />
        <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: SKELETON_CARDS }).map((_, i) => (
            <div key={i} className="rounded-xl border p-4">
              <div className="h-14 w-16 animate-pulse rounded bg-slate-600" />
              <div className="mt-2 h-8 w-24 animate-pulse rounded bg-slate-600" />
              <div className="mt-2 h-4 w-32 animate-pulse rounded bg-slate-600" />
            </div>
          ))}
          {/* <div className="flex items-center justify-center">
            <div className="h-32 w-96 animate-pulse rounded bg-slate-600" />
          </div> */}
        </div>
      </main>
    </>
  );
}
