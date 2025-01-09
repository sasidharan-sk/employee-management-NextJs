"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-500 text-white shadow-md top-0 sticky z-50">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="App Logo"
            width={35}
            height={35}
            className="dark:invert"
          />
          <h1 className="text-xl font-bold dark:text-white">
            Employee Manager
          </h1>
        </div>

        <div>
          <nav className="flex items-center justify-end gap-4">
            <Link href="/" className="hover:text-gray-200 transition">
              Home
            </Link>
            <Link href="/employees" className="hover:text-gray-200 transition">
              Employee List
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
