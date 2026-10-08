"use client";

import { useState, useEffect } from "react";

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
                        <div className="text-left ">
                            <p className="text-lg">Name:</p>
                            <input disabled type="text" defaultValue={name} className="rounded-lg bg-gray-600 px-4 py-2 text-white" />
                        </div>
                    </div>    
                </div>
            </main>
        </>
    );
}   
