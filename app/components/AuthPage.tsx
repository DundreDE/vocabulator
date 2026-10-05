"use client";

import Link from "next/link";
import type { ReactNode } from "react";


interface AuthPageProps {
  title: string;
  intro: string;
  steps: string[];
  children: ReactNode;
}

export function AuthPage({
    title,
    intro,
    steps,
    children,
    }: AuthPageProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    {intro}{" "}
                    <code className="font-mono font-bold">{title}</code>
                </p>
            </div>

            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                {steps.map((step, index) => (
                    <Link
                        key={index}
                        href="#"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <h2 className="mb-2 text-lg font-semibold">
                            Step {index + 1} <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                        </h2>
                        <p className="m-0 text-sm opacity-50">
                            {step}
                        </p>
                    </Link>
                ))}
            </div>

            {children}
        </div>
    );
}