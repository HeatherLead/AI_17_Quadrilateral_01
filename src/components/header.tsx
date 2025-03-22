"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isRootPage = pathname === "/";
  const { userId, isLoaded } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Don't render until Clerk is loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <header className="border-b relative">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between">
        {/* Left side - Logo */}
        <Link href="/t" className="flex items-center">
          <div className="font-bold text-xl">LOGO</div>
        </Link>

        {/* Center - Navigation */}
        {(!isRootPage || userId) && (
          <>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden absolute right-16"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
              <Link href="/chat" className="hover:text-gray-600 transition">
                Chat
              </Link>
              <Link href="/about" className="hover:text-gray-600 transition">
                About
              </Link>
              <Link
                href="/analytics"
                className="hover:text-gray-600 transition"
              >
                Analytics
              </Link>
              <Link href="/products" className="hover:text-gray-600 transition">
                Products
              </Link>
            </div>
          </>
        )}

        {/* Right side - Theme Toggle and Auth */}
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (!isRootPage || userId) && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b z-50">
          <nav className="flex flex-col p-4">
            <Link
              href="/chat"
              className="py-2 hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
             Chat
            </Link>
            <Link
              href="/about"
              className="py-2 hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/analytics"
              className="py-2 hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              href="/products"
              className="py-2 hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
