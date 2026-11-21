import Navbar from "../components/navbar";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="">
        <div className="flex flex-col min-h-screen items-center  p-6 gap-3">
          <div className="text-center rounded bg-gray-600 animate-pulse">
            <h1 className="text-2xl invisible font-bold">Dashboard</h1>
            <p className="text-lg invisible">Welcome to your dashboard!</p>
          </div>
          <div className="flex w-full flex-col items-center justify-center p-6 gap-6 ">
            <hr className="border-t-3 border-solid w-[98%] rounded mx-auto border-stone-800" />
            <div className="flex w-full justify-end px-6">
              <button
                className="self-end inline-flex right-10 ml-auto justify-end gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-stone-900
                            ring-1 ring-stone-300 transition-colors
                            hover:bg-stone-100 animate-pulse hover:text-gray-600
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800
                             dark:text-stone-100  dark:hover:text-white"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="size-5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z" />
                </svg>
                Edit
              </button>
            </div>
            <h1 className="text-2xl font-bold">My Decks</h1>
            <div className="flex py-6 gap-6 ">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <li>
                  <div className=" rounded-xl border flex flex-col gap-2 p-4 text-center shadow-sm transition hover:shadow-md">
                    <h2 className="mb-4 text-2xl invisible font-bold"></h2>
                    <p className="mb-4 invisible text-lg">Cards:</p>
                    <button>
                      <button className="rounded bg-amber-800 hover:bg-amber:900 px-4 py-2 text-white">
                        Learn this deck
                      </button>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex text-center  gap-4 flex-col">
              <button className="bg-gray-600 animate-pulse rounded p-2 ">
                Create a New Deck
              </button>
              <button className="bg-gray-600 animate-pulse rounded p-2">
                Create a New Deck by Importing an Anki file.
              </button>
              <button className="bg-gray-600 animate-pulse rounded p-2">
                Create a New Deck by scanning a page
              </button>
            </div>
          </div>
          {/* here deck content */}
        </div>
      </main>
    </>
  );
}
