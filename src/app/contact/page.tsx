"use client";
import Link from "next/link";
import { toast } from "sonner";

export default function ContactPage() {
  const copyEmail = () => {
    navigator.clipboard
      .writeText("greenwoodxe@gmail.com")
      .then(() => {
        toast("Email copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy email:", err);
      });
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div>
        <div onClick={copyEmail}>
          <p className="hover:underline cursor-pointer text-xl font-['Times_New_Roman']">
            greenwoodxe@gmail.com
          </p>
        </div>
        <div className="flex justify-center mt-4 items-center gap-4">
          <Link href="https://linkedin.com/in/greenwoodxe" target="_blank">
            <img
              src="https://static.vecteezy.com/system/resources/previews/023/986/568/non_2x/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.png"
              alt="LinkedIn"
              className="w-10 h-10"
            />
          </Link>
          <Link href="https://github.com/OGreenwood672" target="_blank">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="w-8 h-8"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
