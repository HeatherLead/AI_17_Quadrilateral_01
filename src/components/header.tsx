"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isRootPage = pathname === "/";
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <header className="border-b relative">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between">
        <Link href="/" className="flex items-center">
          <div className="font-bold text-xl">Kekio</div>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isRootPage && !userId ? (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="hidden sm:block px-4 py-2 bg-black text-white rounded-md dark:bg-white dark:text-black">
                  Sign up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  rootBox: "z-50",
                },
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}
