"use client";

import AnimatedLogoCloud from "@/components/ui/AnimatedLogoCloud";
import projects from "../projects.json";
import { use } from "react";
import { SquareChevronRight } from "lucide-react";

type ProjectKey = keyof typeof projects;

export default function ProjectPage({
  params,
}: {
  params: Promise<{ project: string[] }>;
}) {
  const { project } = use(params);

  // Check if the project exists in the projects.json file
  const projectExists = projects.hasOwnProperty(project[0]);

  if (project.length === 0 || !projectExists) {
    return (
      <div className="w-auto text-center mt-20">
        <h1 className="text-lg font-semibold">Project Page</h1>
        <p>
          I haven't build <span className="font-bold">{project[0]}</span> yet,
          maybe come back next week
        </p>
      </div>
    );
  }
  const project_details = projects[project[0] as ProjectKey];

  return (
    <div className="md:w-1/2 mx-auto mt-20 space-y-8">
      <div className="flex items-center space-y-5.5 md:space-y-0 md:items-end justify-between text-base md:flex-row flex-col">
        <h1 className="text-5xl font-semibold">{project_details.name}</h1>

        {project_details.image && (
          <img
            src={project_details.image}
            alt={project_details.name}
            className="w-96 rounded-lg shadow-lg"
          />
        )}
      </div>

      <div className="text-lg text-gray-700 leading-relaxed">
        {project_details.description}
        {project_details.link && (
          <div className="w-full flex justify-end mt-2">
            <a
              href={project_details.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
            >
              <SquareChevronRight size={40} />
            </a>
          </div>
        )}
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-1">Technologies Used:</h2>
        <AnimatedLogoCloud logos={project_details.technologies} />
      </div>
    </div>
  );
}
