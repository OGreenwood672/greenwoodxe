import React from "react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function ResumePage() {
  return (
    <main className="p-8">
      <AnimatedGridPattern
        className={cn(
          "[mask-image:radial-gradient(750px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Resume</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Professional Experience
          </h2>
          {/* Add experience items here */}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          {/* Add education details here */}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          {/* Add skills here */}
        </section>
      </div>
    </main>
  );
}
