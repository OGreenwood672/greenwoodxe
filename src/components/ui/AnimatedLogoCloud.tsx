const logosMap: Record<string, string> = {
  React: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "Next.js": "https://cdn.worldvectorlogo.com/logos/nextjs-13.svg",
  "Node.js":
    "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo_2015.svg",
  "Tailwind CSS":
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  TypeScript: "https://img.icons8.com/m_rounded/512/typescript.png",
  JavaScript: "https://img.icons8.com/ios7/512/javascript.png",
  Python:
    "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  Django: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Django_logo.svg",
  Flask: "https://upload.wikimedia.org/wikipedia/commons/1/19/Flask_logo.svg",
  PostgreSQL: "https://www.svgrepo.com/show/473760/postgresql.svg",
  MongoDB:
    "https://upload.wikimedia.org/wikipedia/commons/9/37/MongoDB_Logo.svg",
  Firebase:
    "https://upload.wikimedia.org/wikipedia/commons/9/92/Firebase_Logo.svg",
  Postman:
    "https://upload.wikimedia.org/wikipedia/commons/4/4a/Postman_logo.svg",
  Canva: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Canva_logo.svg",
  Git: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg",
  GitHub:
    "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  Discord:
    "https://upload.wikimedia.org/wikipedia/commons/5/58/Discord_logo.svg",
  "Three.js":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Three.js_Icon.svg/1200px-Three.js_Icon.svg.png",
  Sockets:
    "https://static-00.iconduck.com/assets.00/brand-websocket-icon-2048x1537-kfk33etu.png",
  "Genetic Algorithm": "https://pngimg.com/d/dna_PNG24.png",
  HTML5: "https://cdn.creazilla.com/icons/3195437/html-icon-sm.png",
  CSS3: "https://static-00.iconduck.com/assets.00/css3-icon-454x512-9u5i5xw5.png",
  "p5.js":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/P5js_Logo.svg/250px-P5js_Logo.svg.png",
  "OpenAI API":
    "https://upload.wikimedia.org/wikipedia/commons/4/4f/OpenAI_Logo.svg",
  Vercel: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Vercel_logo.svg",
  OCAML:
    "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/ocaml-ikbn68gny0e0m63ib3qa5sk.png/ocaml-nsil49q53wnwx537ksfwl9.png?_a=DAJFJtWIZAAC",
  Golang: "https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png",
  "C#": "https://static-00.iconduck.com/assets.00/c-icon-1820x2048-5g8nvybk.png",
  Unity:
    "https://static-00.iconduck.com/assets.00/unity-icon-512x512-kdsx9w7b.png",
  Supabase:
    "https://static-00.iconduck.com/assets.00/supabase-icon-1733x2048-tduq2l3l.png",
  SCSS: "https://img.icons8.com/color/512/sass.png",
  "D3.js": "https://avatars.githubusercontent.com/u/1562726?s=280&v=4",
  Java: "https://cdn.iconscout.com/icon/free/png-256/free-java-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2945017.png?f=webp&w=256",
  Processing:
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Processing_2021_logo.svg",
  Flutter:
    "https://cdn.iconscout.com/icon/free/png-256/free-flutter-logo-icon-download-in-svg-png-gif-file-formats--programming-language-coding-development-logos-icons-1720090.png?f=webp",
};

const AnimatedLogoCloud = ({ logos }: { logos: string[] }) => {
  console.log(logos);
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6 font-bold"
              >
                {logos.map((logo) =>
                  logosMap[logo] ? (
                    <img
                      key={logo}
                      src={logosMap[logo]}
                      className="h-10 px-2 brightness-0 dark:invert text-center"
                      alt={`${logo}`}
                    />
                  ) : (
                    <span key={logo} className="h-10 px-2 flex items-center">
                      {logo}
                    </span>
                  )
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogoCloud;
