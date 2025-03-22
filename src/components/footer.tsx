import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500">Kekio by Team Quadrilateral</p>
        </div>
        <Link
          href="https://github.com/HeatherLead/AI_17_Quadrilateral_01"
          target="_blank"
          className="text-gray-400 hover:text-gray-500"
        >
          <Github className="h-5 w-5" />
        </Link>
      </div>
    </footer>
  );
}
