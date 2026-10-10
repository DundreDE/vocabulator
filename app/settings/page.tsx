"use client";

import Navbar from "../components/navbar";

const name = "User Name"; 
const email = "email@mail.com";

export default function SettingsPage() {
    return (
        <>
        <Navbar />
            <main>
                <div className="flex flex-col min-h-screen items-center text-center p-6 gap-12">
                    <div className="rounded-2xl text-center bg-stone-800 relative top-3.5 p-3 w-[95%] ">
                        <h1 className="align-middle text-3xl font-bold">Settings</h1>
                        <p className="text-lg">All settings are just demo nothing is working yet.</p>
                    </div>
                    <div className="flex flex-col items-start w-[95%] bg-stone-800 gap-4 p-6 rounded-xl ">
                        <div className="text-left flx flex-col gap-2 ">
                            <p className="text-lg">Name:</p>
                            <input disabled type="text" defaultValue={name} className="rounded-lg bg-amber-800 px-4 py-2 text-white" />
                            <p className="text-lg">Email:</p>
                            <input disabled type="text" defaultValue={email} className="rounded-lg bg-amber-800 px-4 py-2 text-white" />
                        </div>
                        <div className="text-left flex flex-col gap-2">
                           <p className="text-lg">Log out:</p>
                           <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700">Log out</button>
                        </div>
                        <div className="text-left flex flex-col gap-2">
                            <p className="text-lg">Download your data:</p>
                            <button className="rounded bg-amber-800 hover:bg-amber-900">Download</button>
                        </div>
                        <div className="text-left gap-2 flex flex-col rounded-lg ">
                            <hr className="border-t-2 border-solid w-full mx-auto border-red-500" />
                            <h1 className="text-2xl text-red-500 font-bold">Danger Zone</h1>
                            <p className="text-lg">Get a password reset link:</p>
                            <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700">Reset Password</button>
                            <p className="text-lg">Delete your account:</p>
                            <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700">Delete account</button>
                        </div>    
                    </div>    
                </div>
            </main>
        </>
    );
}