import Link from "next/link";
import { login, signup } from "./auth";
// import { auth } from "@/app/auth/auth";
export default async function AuthPage( {
    searchParams,
}: {
      searchParams: Promise<{ error?: string; message?: string }>;
}) {
    const {error, message} = await searchParams;
      return (
        <>
        <main>
        <div>
            <div className="mt-4 min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Login/Register</h1>
                <p className="text-center text-lg"> Please login or register to continue.</p>
                <p className="text-center font-bold text-lg"> At this point the Registration form is not ready just click on go to Dashboard.</p>
                <div className="flex flex-col gap-2 bg-stone-800 p-4 rounded-lg">
                    <form className="mx-auto flex max-w-sm flex-col gap-3 p-8">
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {message && <p className="text-sm text-green-700">{message}</p>}

                        <input name="email" type="email" required placeholder="Email"/> 
                        <input name="password" type="password" required placeholder="Password"/>
                        
                        <button formAction={login} className="rounded bg-amber-800 px-4 py-2 text-white hover:bg-amber-900">
                            Log in
                        </button>
                        <button formAction={signup} className="rounded bg-amber-800 px-4 py-2 text-white hover:bg-amber-900">
                            Register
                        </button>

                    </form>
                       <Link
                        href="/dashboard"
                        className="text-center inline-block rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
        </main>
        </>
  );
}

