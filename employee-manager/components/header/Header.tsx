"use client";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { deleteCookie, getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default function Header() {
  const userName: string | null = getCookie("UserName") as string;

  // Function to generate initials from email
  function getInitials(email: string | null): {
    initials: string;
    name: string;
  } {
    if (!email) return { initials: "", name: "" };

    const name: string = email.split("@")[0]; // Get part before the '@'
    const words: string[] = name.split(/[\._]/); // Split by dots or underscores

    // Generate initials
    const initials: string = words
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

    return { initials, name };
  }

  const profileDetails = getInitials(userName);

  async function handleLogout() {
    await deleteCookie("JwtToken");
    await deleteCookie("UserName");
    redirect("/login");
  }

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
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="bg-white border-black">
                  <AvatarFallback className="text-blue-800 font-semibold cursor-context-menu">
                    {profileDetails.initials}
                  </AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto h-auto">
                <div className="flex flex-col justify-center items-center space-y-3">
                  {/* Profile Name */}
                  <div className="text-md font-semibold text-gray-700 text-wrap">
                    {profileDetails.name}
                  </div>

                  {/* Logout Button */}
                  <Button
                    variant="secondary"
                    onClick={() => handleLogout()}
                    className="hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Logout
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
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
