import Link from "next/link";
import Navbar from "../components/navbar";

export default function DashboardPage() {
    return (
        <>
            <Navbar />
        <main className="">
            <div className="flex flex-col min-h-screen items-center  p-6 gap-3">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-lg">Welcome to your dashboard!</p>
                    
                </div>
                <div className="flex w-full flex-col items-center justify-center p-6 gap-6 ">
                    <hr className="border-t-3 border-solid w-[98%] rounded mx-auto border-stone-800" />
                    <div className="flex w-full justify-end px-6">
                  <button
                    type="button"
                    className="self-end inline-flex right-10 ml-auto justify-end gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-stone-900
                            ring-1 ring-stone-300 transition-colors
                            hover:bg-stone-100 hover:text-amber-800
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800
                            dark:bg-amber-800 dark:text-stone-100 dark:ring-amber-700 dark:hover:bg-amber-900 dark:hover:text-white"
                    >
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" className="size-5 shrink-0" aria-hidden="true">
                        <path d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z"/>
                    </svg>
                    Edit
                    </button>
                    </div>
                    <div className="flex py-6 gap-6 ">
                        
                        <div className="w-full max-w-sm rounded-2xl bg-stone-800 px-10 py-6 text-center shadow-md">
                            <h1 className="mb-4 text-2xl font-bold">Test Deck</h1>
                        <Link
                            href="/LearningCards"
                            className="mb-4 inline-block rounded-lg text-center bg-amber-800 px-4 py-2 text-white hover:bg-amber-900"
                        >
                            Learn this Deck
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
}
