export default function DashboardPage() {
    return (
        <main>
            <div>
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome to your dashboard!</p>
                </div>
                    <div className="flex min-h-screen items-center justify-center p-6">
                        <div className="w-full max-w-sm rounded-2xl bg-gray-700 p-6 shadow-md">
                            <h1 className="mb-4 text-2xl font-bold">Test Deck</h1>
                            <a href="/LearningCards">Learn this Deck</a>
                        </div>
                    </div>
            </div>
        </main>
    );
}