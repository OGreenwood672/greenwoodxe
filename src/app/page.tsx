"use client";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="fixed inset-0 z-10 flex items-center justify-center text-center">
      <div className="space-y-8">
        <div>
          <Image
            src="/greenwood-logo.png"
            alt="Logo"
            width={300}
            height={300}
            className="mx-auto mb-4 opacity-0 animate-fade-in-down animation-delay-1000"
          />
          <TypingAnimation
            duration={40}
            className="text-6xl font-bold min-h-10"
          >
            Oliver Greenwood
          </TypingAnimation>
        </div>
        <p className="text-xl opacity-0 animate-fade-in-up animation-delay-1000">
          Student + Developer
        </p>
        <div className="flex justify-center gap-4 mt-4 opacity-0 animate-fade-in-up animation-delay-1000">
          <Button
            variant={"default"}
            onClick={() => router.push("resume")}
            className="cursor-pointer"
          >
            Resumé
          </Button>
          <Button
            variant={"default"}
            onClick={() => router.push("projects")}
            className="cursor-pointer"
          >
            Projects
          </Button>
        </div>
      </div>
    </main>
  );
}
