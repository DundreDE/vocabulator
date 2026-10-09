import Link from "next/link";
import Navbar from "../components/navbar";
// import { auth } from "@/app/auth/auth";
export default function AuthPage() {
      return (
        <>
        <main>
        <div>
            <div className="mt-4 min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Login/Register</h1>
                <p className="text-center text-lg"> Please login or register to continue.</p>
                <p className="text-center font-bold text-lg"> At this point the Registration form is not ready just click on go to Dashboard.</p>
                <div className="flex flex-col gap-2 bg-taupe-700 p-4 rounded-lg">
                    <input type="text" placeholder="Email"/> 
                    <input type="password" placeholder="Password"/>
                    <button className="text-center inline-block rounded-lg bg-taupe-800 px-4 py-2 text-white hover:bg-taupe-900">Login/Register</button>
                       <Link
                        href="/dashboard"
                        className="text-center inline-block rounded-lg bg-taupe-800 px-4 py-2 text-white hover:bg-taupe-900">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
        </main>
        </>
  );
}

