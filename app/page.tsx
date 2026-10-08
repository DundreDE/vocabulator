import Link from "next/link";
import Navbar from "./components/navbar";



export default function Home() {
  return (
    <>
    <Navbar />
      <main>
        <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col gap-2 bg-gray-700 p-4 rounded-lg text-center">
          <h1 className="text-2xl gap-2 font-bold">Welcome to Vocabulator.</h1>
          <Link href="/auth" className="rounded gap-2 text-lg p-4 text-white bg-gray-800 hover:underline">
            Login/Register
          </Link> 
        </div>
        </div>
      </main>
  </>
  );
}