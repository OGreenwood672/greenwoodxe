"use client";
import React from "react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import IconTabs, { TabType } from "@/components/ui/tabs";
import { BriefcaseBusiness, GraduationCap, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ResumePage() {
  const tabs: TabType[] = [
    {
      title: "Professional",
      icon: <BriefcaseBusiness />,
    },
    {
      title: "Education",
      icon: <GraduationCap />,
    },
    {
      title: "Hackathons",
      icon: <Trophy />,
    },
  ];

  const professionalExperiences = [
    {
      company: "Helsing",
      position: "Intern",
      location: "London, UK",
      date: "Summer 2025",
      skills: ["Rust", "Python", "Data Science"],
      description: [
        "Developed a Rust based twirp search client, exposing their pre-existing search service progressively to the Rust SDK, Python SDK, and an internal CLI tool.",
        "Reduced search index size by 10x and eliminated long-standing race conditions on AWS S3, maintaining 100% data retrieval accuracy. ",
        "Independently managed and delivered filtering in the search service based on user feedback, integrated support in both the internal CLI tool and React UI and presented the solution at company-wide weekly demos. ",
        "Researched potential future full-text search solutions (OpenSearch, Manticore, LLM-based vector search) that allowed for sharding and inbuilt analytics and setup prototypes to demonstrate functionality and trade-offs.",
      ],
    },
    {
      company: "Peters' Research",
      position: "Research Assistant",
      location: "Great Missenden, UK",
      date: "January 2025",
      skills: ["Python", "Machine Learning", "Data Science"],
      description: [
        "Used random forests to predict lift movement between floors.",
        "Fused barometer and accelerometer data to find lift height.",
        "Braved High Wycombe to collect data from lifts.",
      ],
    },
    {
      company: "Peters' Research",
      position: "Research Assistant",
      location: "Great Missenden, UK",
      date: "Summer 2024",
      skills: [
        "Python",
        "Machine Development",
        "Data Science",
        "Java",
        "Mobile Development",
      ],
      description: [
        "Applied machine learning with an accelerometer to calculate lift kinematics.",
        "Conducted research, developed, and documented a paper titled 'Using Multivariate Polynomial Linear Regression to Model Asymmetric Lift Kinematics'. ",
        "Released an app in Android Studio with Java to collect accelerometer lift data and analyse for customers.",
      ],
    },
  ];

  const educationExperiences = [
    {
      institution: "University of Cambridge",
      location: "Cambridge, UK",
      date: "2023 - 2026",
      degree: "BA Computer Science",
      description: [
        "President of the Queens' Computer Science Society",
        "Active participant in hackathons and coding competitions",
      ],
    },
    {
      institution: "Dr Challoners' Grammar School",
      location: "Amersham, UK",
      date: "2021 - 2023",
      degree: "A-Levels",
      description: [
        "A* Mathematics",
        "A* Further Mathematics",
        "A* Computer Science",
        "A* Physics",
      ],
    },
    {
      institution: "Dr Challoners' Grammar School",
      location: "Amersham, UK",
      date: "2021 - 2023",
      degree: "GCSEs",
      description: [
        "9 Mathematics",
        "9 Further Mathematics",
        "9 Computer Science",
        "9 Physics",
        "9 Chemistry",
        "9 Biology",
        "9 Electronics",
        "8 History",
        "8 French",
        "8 English Literature",
        "7 English Language",
      ],
    },
  ];

  const hackathonExperiences = [
    {
      title: "EasyA x Vechain",
      date: "March 2024",
      location: "Cambridge, UK",
      description:
        "Developed an app to reward users for using public transport.",
      placement: "1st",
      skills: ["TypeScript", "Mobile Development", "API Integration"],
    },
    {
      title: "Huawei Techarena Dublin",
      date: "September 2024",
      location: "Dublin, Ireland",
      description:
        "Worked on an algorithm to find the optimal use of servers and datacenters.",
      placement: "Top 20",
      skills: ["Python", "Machine Learning", "Data Science"],
    },
    {
      title: "CamHack",
      date: "November 2024",
      location: "Cambridge, UK",
      description:
        "We hacked a TENS unit to control people's muscles through a web interface",
      placement: "1st",
      skills: ["Python", "Electronics", "Web Development"],
    },
  ];

  const [selected, setSelected] = React.useState(tabs[0]);

  return (
    <main className="md:p-8">
      <AnimatedGridPattern
        maxOpacity={0.1}
        className={cn(
          "[mask-image:radial-gradient(750px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <div className="w-full md:w-3/4 lg:w-[550px] mx-auto mt-8 md:p-6 relative z-10">
        <IconTabs
          tabs={tabs}
          selected={selected}
          setSelected={setSelected}
          center={true}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.title}
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {selected.title === "Professional" && (
              <div className="relative space-y-8">
                <div className="flex flex-col gap-4">
                  {professionalExperiences.map((experience, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-gray-200 dark:border-gray-700 pl-4"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <h3 className="font-semibold dark:text-gray-100">
                          {experience.position} • {experience.company}
                        </h3>
                        <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {experience.location}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {experience.date}
                      </p>
                      {experience.description && (
                        <ul className="list-disc pl-4 mb-2">
                          {Array.isArray(experience.description) &&
                            experience.description.map((desc, i) => (
                              <li
                                key={i}
                                className="text-sm text-gray-600 dark:text-gray-300"
                              >
                                {desc}
                              </li>
                            ))}
                        </ul>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selected.title === "Education" && (
              <div className="relative space-y-8">
                <div className="flex flex-col gap-4">
                  {educationExperiences.map((education, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-gray-200 dark:border-gray-700 pl-4"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <h3 className="font-semibold dark:text-gray-100">
                          {education.institution}
                        </h3>
                        <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {education.location}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {education.degree} • {education.date}
                      </p>
                      {education.description && (
                        <ul className="list-disc pl-4 mb-2">
                          {education.description.map((desc, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-600 dark:text-gray-300"
                            >
                              {desc}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selected.title === "Hackathons" && (
              <div className="relative space-y-8">
                <div className="flex flex-col gap-4">
                  {hackathonExperiences.map((hackathon, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-gray-200 dark:border-gray-700 pl-4"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <h3 className="font-semibold dark:text-gray-100">
                          {hackathon.title}
                        </h3>
                        <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {hackathon.location}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span className="font-semibold text-black">
                          {hackathon.placement}
                        </span>{" "}
                        • {hackathon.date}
                      </p>
                      <div className="mb-4 dark:text-gray-300">
                        {hackathon.description}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hackathon.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
