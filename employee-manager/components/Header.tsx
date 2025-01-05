import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-500 text-white shadow-md top-0 sticky">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">
          <Link href="/">Employee Manager</Link>
        </h1>
        <nav className="flex gap-4">
          <Link
            href="/"
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>
          <Link
            href="/employees"
            className="hover:text-gray-200 transition"
          >
            Employee List
          </Link>
        </nav>
      </div>
    </header>
  );
}
