import { getSettings } from "@/lib/db/settings";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "../auth/auth";
import Navbar from "../components/navbar";
import UsernameForm from "./UsernameForm";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const username = (user.user_metadata?.username as string | undefined) ?? "";
  const email = user.email ?? "";
  const settings = await getSettings(user.id);

  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col min-h-screen items-center text-center p-6 gap-12">
          <div className="rounded-2xl text-center bg-stone-800 relative top-3.5 p-3 w-[95%] ">
            <h1 className="align-middle text-3xl font-bold">Settings</h1>
            <p className="text-lg">
              All settings are just demo nothing is working yet. Only working is
              Username and logout.
            </p>
          </div>
          <div className="flex flex-col items-center w-[95%] bg-stone-800 gap-4 p-6 rounded-xl ">
            <p className="text-lg">Max new cards per session:</p>
            <input
              type="number"
              name="maxNewCardsPerSession"
              defaultValue={settings.maxNewCardsPerSession}
              className="rounded-lg bg-amber-800 px-4 py-2 text-white"
            />
          </div>
          <div className="flex flex-col items-start w-[95%] bg-stone-800 gap-4 p-6 rounded-xl ">
            <UsernameForm username={username} />

            <p className="text-lg">Email:</p>
            <input
              disabled
              type="text"
              defaultValue={email}
              className="rounded-lg bg-amber-800 px-4 py-2 text-white"
            />

            <div className="text-left flex flex-col gap-2">
              <form>
                <p className="text-lg">Log out:</p>
                <button
                  formAction={logout}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                >
                  Log out
                </button>
              </form>
            </div>
            <div className="text-left flex flex-col gap-2">
              <p className="text-lg">Download your data:</p>
              <button className="rounded bg-amber-800 hover:bg-amber-900">
                Download
              </button>
            </div>
            <div className="text-left gap-2 flex flex-col rounded-lg ">
              <hr className="border-t-2 border-solid w-full mx-auto border-red-500" />
              <h1 className="text-2xl text-red-500 font-bold">Danger Zone</h1>
              <p className="text-lg">Get a password reset link:</p>
              <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700">
                Reset Password
              </button>
              <p className="text-lg">Delete your account:</p>
              <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700">
                Delete account
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
