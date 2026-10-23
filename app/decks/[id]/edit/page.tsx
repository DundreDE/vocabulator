import EditDeckForm from "./editdeckform";

export default function EditDeckPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg bg-stone-800 p-6 shadow-md ">
        <h1 className="mb-4 text-2xl text-center font-bold">Edit this Deck</h1>
        <EditDeckForm />
      </div>
    </main>
  );
}
