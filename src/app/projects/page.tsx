"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import projects from "./projects.json";
import { useTheme } from "next-themes";
import ButtonShapeTabs from "@/components/ui/basic-tabs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Define types for the graph data
interface Node extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  href: string;
  image: string;
}

interface Project {
  name: string;
  image: string;
  concepts: string[];
  technologies: string[];
  description: string;
  date: string;
}

// Define extended Link interface with strength
interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node | number;
  target: Node | number;
  strength: number;
}

// Function to generate links between nodes based on shared tags
function generateLinks(
  projects: Record<string, Project>,
  connection: "concepts" | "technologies"
): Link[] {
  const links: Link[] = [];
  const entries = Object.entries(projects);

  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [, proj1] = entries[i];
      const [, proj2] = entries[j];

      // Count shared tags
      const sharedTags = proj1[connection].filter((tag: string) =>
        proj2[connection].includes(tag)
      ).length;

      if (sharedTags > 0) {
        links.push({
          source: i + 1, // Using 1-based index to match existing IDs
          target: j + 1,
          strength: sharedTags * 0.3, // Adjust strength based on number of shared tags
        });
      }
    }
  }
  return links;
}

// Function to generate nodes from projects data
function generateNodes(projects: Record<string, Project>): Node[] {
  return Object.entries(projects).map(([key, project], index) => ({
    id: index + 1,
    name: project.name,
    href: "projects/" + key,
    image: project.image,
  }));
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  const [connection, setConnection] = useState("");
  const graphData: { nodes: Node[]; links: Link[] } = {
    nodes: generateNodes(projects),
    links: [],
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setConnection(window.innerWidth <= 768 ? "list" : "concepts");
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const theme = useTheme().resolvedTheme === "dark" ? "#ffffff" : "#000000";

  useEffect(() => {
    if (connection != "concepts" && connection != "technologies") return;
    graphData.links = generateLinks(projects, connection);

    const svg = d3
      .select(containerRef.current)
      .append("svg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight);

    // Add pattern definitions for images
    const defs = svg.append("defs");
    graphData.nodes.forEach((node) => {
      defs
        .append("pattern")
        .attr("id", `image-${node.id}`)
        .attr("width", 1)
        .attr("height", 1)
        .append("image")
        .attr("href", node.image)
        .attr("width", 80)
        .attr("height", 80);
    });

    const simulation: d3.Simulation<Node, Link> = d3
      .forceSimulation(graphData.nodes)
      .force(
        "link",
        d3
          .forceLink(graphData.links)
          .id((d) => (d as Node).id)
          .strength((d: Link) => d.strength)
        //   .distance(100)
      )
      .force(
        "charge",
        d3.forceManyBody().strength(connection == "concepts" ? -1400 : -800)
      )
      .force(
        "center",
        d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
      )
      .force("collision", d3.forceCollide().radius(80))
      .force("x", d3.forceX().strength(0.1))
      .force("y", d3.forceY().strength(0.1));

    const links = svg
      .append("g")
      .selectAll("line")
      .data(graphData.links)
      .join("line")
      .style("stroke", "#999999")
      .style("stroke-width", 2);

    const nodes = svg
      .append("g")
      .selectAll("g")
      .data(graphData.nodes)
      .join("g");

    nodes
      .append("circle")
      .attr("r", 40)
      .style("fill", (d: Node) => `url(#image-${d.id})`)
      .style("cursor", "pointer")
      .on("click", (_: object, d: Node) => {
        window.location.href = d.href;
      });

    nodes
      .append("text")
      .text((d: Node) => d.name)
      .attr("dy", 60)
      .style("text-anchor", "middle")
      .style("font-weight", "600")
      .style("fill", theme);

    simulation.on("tick", () => {
      links
        .attr("x1", (d: Link) => (d.source as Node).x!)
        .attr("y1", (d: Link) => (d.source as Node).y!)
        .attr("x2", (d: Link) => (d.target as Node).x!)
        .attr("y2", (d: Link) => (d.target as Node).y!);

      nodes.attr("transform", (d: Node) => `translate(${d.x},${d.y})`);
    });

    const resize = () => {
      svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
      simulation.force(
        "center",
        d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
      );
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      svg.remove();
    };
  }, [theme, connection, graphData]);

  return (
    <div>
      <div
        className={`overflow-hidden fixed inset-0 z-10 ${
          connection !== "list" ? "" : "hidden"
        }`}
        ref={containerRef}
        style={{
          width: "100%",
          height: "100vh",
        }}
      />
      <div className={`absolute top-20 left-10 ${isMobile ? "hidden" : ""}`}>
        <ButtonShapeTabs
          tabs={["concepts", "technologies", "list"]}
          selected={connection}
          setSelected={setConnection}
        />
      </div>
      <div
        className={`${
          connection === "list" ? "" : "hidden"
        } container mx-auto px-4 py-8`}
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(projects)
            .sort((a, b) => {
              const parseDate = (dateStr: string) => {
                const [month, year] = dateStr.split(" ").slice(-2);
                return new Date(`${month} 1, ${year}`);
              };
              return (
                parseDate(b[1].date).getTime() - parseDate(a[1].date).getTime()
              );
            })
            .map(([key, project], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video relative">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                    <p className="text-sm text-gray-500">{project.date}</p>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 text-xs rounded-lg text-white ${
                          {
                            a: "bg-blue-700/80",
                            b: "bg-green-700/80",
                            c: "bg-purple-700/80",
                            d: "bg-orange-700/80",
                            e: "bg-pink-700/80",
                            f: "bg-indigo-700/80",
                            g: "bg-teal-700/80",
                            h: "bg-red-700/80",
                            i: "bg-yellow-700/80",
                            j: "bg-cyan-700/80",
                            k: "bg-lime-700/80",
                            l: "bg-violet-700/80",
                            m: "bg-rose-700/80",
                            n: "bg-emerald-700/80",
                            o: "bg-sky-700/80",
                            p: "bg-amber-700/80",
                            q: "bg-fuchsia-700/80",
                            r: "bg-blue-800/80",
                            s: "bg-green-800/80",
                            t: "bg-purple-800/80",
                            u: "bg-orange-800/80",
                            v: "bg-pink-800/80",
                            w: "bg-indigo-800/80",
                            x: "bg-teal-800/80",
                            y: "bg-red-800/80",
                            z: "bg-cyan-800/80",
                          }[tech.toLowerCase()[0]] || "bg-gray-700/80"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`projects/${key}`}
                      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                    >
                      View Project
                      <div>
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
