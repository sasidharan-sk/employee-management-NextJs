import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/logo.svg" // Old Next.js logo
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Welcome to the Employee Manager
        </h1>
        <p className="text-center sm:text-left text-gray-600">
          Manage your team efficiently with tools to add, edit, and track employee details.
        </p>
      </main>
    </div>
  );
}
