import Header from "@/components/header/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow  items-center justify-center justify-items-center p-8 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/* Main Content */}
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <header className="text-center sm:text-left">
            <Image
              className="dark:invert"
              src="/company.svg"
              alt="Employee Manager Logo"
              width={180}
              height={38}
              priority
            />
            {/* Heading */}
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Welcome to Employee Manager
            </h1>
          </header>

          {/* Description */}
          <p className="max-w-md text-center sm:text-left text-gray-700">
            Simplify your workflow with powerful tools to add, edit, and track
            employee details. Stay organized and efficient with Employee
            Manager.
          </p>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Employee Manager. All rights reserved.
      </footer>
    </div>
  );
}
