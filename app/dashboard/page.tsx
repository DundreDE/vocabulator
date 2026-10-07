import Link from "next/link";

export default function DashboardPage() {
    return (
        <main>
            <div className="flex flex-col min-h-screen items-center justify-center p-6">
                <div >
                    <h1 className="text-2xl">Dashboard</h1>
                    <p className="text-lg">Welcome to your dashboard!</p>
                </div>
                    <div className="flex items-center justify-center p-6 gap-6">
                        <div className="w-full max-w-sm rounded-2xl bg-gray-700 px-10 py-6 shadow-md">
                            <h1 className="mb-4 text-2xl font-bold">Test Deck</h1>
                        <Link
                            href="/LearningCards"
                            className="mb-4 inline-block rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                        >
                            Learn this Deck
                        </Link>
                    </div>
                    </div>
            </div>
        </main>
    );
}