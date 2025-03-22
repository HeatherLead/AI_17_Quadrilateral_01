"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      redirect("/sign-in");
    }
  }, [userId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Protected Home Page</h1>
        <p className="text-lg mb-4">
          This is a protected home page. You can only see this if you&apos;re
          logged in.
        </p>
      </div>
    </main>
  );
}
