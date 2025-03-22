"use client";

import Spline from "@splinetool/react-spline";
import { Suspense } from "react";

export default function RootPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <main className="w-screen h-screen z-20">
          <Spline
            scene="https://prod.spline.design/azAhVF9QLiK-9oJ0/scene.splinecode"
            onError={(error) => console.log("Spline error:", error)}
          />
        </main>
      </Suspense>
    </main>
  );
}
