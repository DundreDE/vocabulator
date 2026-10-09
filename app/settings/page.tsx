"use client";


import Navbar from "../components/navbar";

const name = "User Name"; 

export default function SettingsPage() {
    return (
        <>
            <Navbar />
            <main>
                <div className="flex flex-col min-h-screen items-center text-center p-6 gap-12">
                    <div className="rounded-2xl text-center bg-gray-700 relative top-3.5 p-3 w-[95%] ">
                        <h1 className="align-middle text-3xl font-bold">Settings</h1>
                    </div>
                    <div className="flex flex-col items-start w-[95%] bg-gray-700 gap-4 p-6 rounded-xl ">
                        <div className="text-left flx flex-col gap-2 ">
                            <p className="text-lg">Name:</p>
                            <input disabled type="text" defaultValue={name} className="rounded-lg bg-gray-600 px-4 py-2 text-white" />
                        </div>
                        <div className="text-left flex flex-col gap-2 ">
                           <p className="text-lg">Log out:</p>
                           <button className="rounded-lg bg-red-800 px-4 py-2 text-white hover:bg-red-900">Log out</button>
                        </div>
                        <div className="text-left gap-2 flex flex-col rounded-lg ">
                            <hr className="border-t-2 border-solid w-full mx-auto border-red-500" />
                            <h1 className="text-2xl text-red-500  font-bold">Danger Zone</h1>
                            <p className="text-lg">Delete your account:</p>
                            <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700">Delete account</button>
                        </div>    
                    </div>    
                </div>
            </main>
        </>
    );
}   
