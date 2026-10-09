"use client"

import { useState } from "react"

type NavLink = {
    name: string;
    href: string;
}

const links: NavLink[] = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Settings", href: "/settings" },
]

export default function Navbar() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-white bg-black/60 flex w-full backdrop-blur items-center justify-between p-2 text-white">

            <div className="mx-auto flex h-16 max-w-6xl justify-between items-center px-4">
                <ul className="hidden items-center gap-7 md:flex">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a
                            href={link.href}
                            className="text-lg font-extrabold text-white transition-colors hover:text-taupe-200"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="rounded-md p-2 right-4 absolute text-white hover:bg-taupe-800 md:hidden"
            >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                >
                    {open ? (
                        <path
                            strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path
                            strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
            </div>
            <div className={`md:hidden ${open ? "block" : "hidden"} absolute top-16 left-0 w-full bg-taupe-700`}>
                <ul className="flex flex-col items-center gap-4 p-4">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a
                            href={link.href}
                            className="text-sm font-bold text-white transition-colors hover:text-taupe-200"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

        </nav>
    );
}