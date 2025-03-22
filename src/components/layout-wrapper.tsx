"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRootPage = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {!isRootPage && <Footer />}
    </div>
  );
}
