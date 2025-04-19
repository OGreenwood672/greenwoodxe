"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import projects from "./projects.json";
import { useTheme } from "next-themes";

// Define types for the graph data
interface Node extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  href: string;
  image: string;
}

// Define extended Link interface with strength
interface Link {
  source: number;
  target: number;
  strength: number;
}

// Function to generate links between nodes based on shared tags
function generateLinks(projects: Record<string, any>): Link[] {
  const links: Link[] = [];
  const entries = Object.entries(projects);

  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [key1, proj1] = entries[i];
      const [key2, proj2] = entries[j];

      // Count shared tags
      const sharedTags = proj1.tags.filter((tag: string) =>
        proj2.tags.includes(tag)
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
function generateNodes(projects: Record<string, any>): Node[] {
  return Object.entries(projects).map(([key, project], index) => ({
    id: index + 1,
    name: project.name,
    href: "projects/" + key,
    image: project.image,
  }));
}

const graphData = {
  nodes: generateNodes(projects),
  links: generateLinks(projects),
};

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = useTheme().resolvedTheme === "dark" ? "#ffffff" : "#000000";

  useEffect(() => {
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
        .attr("width", 40)
        .attr("height", 40);
    });

    const simulation = d3
      .forceSimulation(graphData.nodes)
      .force(
        "link",
        d3
          .forceLink(graphData.links)
          .id((d: any) => d.id)
          .strength((d: Link) => d.strength)
        //   .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-2000))
      .force(
        "center",
        d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
      )
      .force("collision", d3.forceCollide().radius(50))
      .force("x", d3.forceX().strength(0.1))
      .force("y", d3.forceY().strength(0.1));

    const links = svg
      .append("g")
      .selectAll("line")
      .data(graphData.links)
      .join("line")
      .style("stroke", "#999999");

    const nodes = svg
      .append("g")
      .selectAll("g")
      .data(graphData.nodes)
      .join("g");

    nodes
      .append("circle")
      .attr("r", 20)
      .style("fill", (d: Node) => `url(#image-${d.id})`)
      .style("cursor", "pointer")
      .on("click", (event: any, d: Node) => {
        window.location.href = d.href;
      });

    nodes
      .append("text")
      .text((d: Node) => d.name)
      .attr("dy", 40)
      .style("text-anchor", "middle")
      .style("fill", theme);

    simulation.on("tick", () => {
      links
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
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
  }, [theme]);

  return (
    <div
      className="overflow-hidden fixed inset-0 z-10"
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
      }}
    />
  );
}
