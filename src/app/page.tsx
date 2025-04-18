import { NavBar } from "@/components/nav";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-20 text-center">
      <div className="space-y-8">
        <TypingAnimation className="text-6xl font-bold min-h-10">
          Greenwood
        </TypingAnimation>
        <p className="text-xl opacity-0 animate-fade-in-up animation-delay-1000">
          Student + Developer
        </p>
        {/* <p className="text-lg text-gray-600 opacity-0 animate-fade-in-up animation-delay-500">
            Hello!
          </p> */}
      </div>
    </main>
  );
}
