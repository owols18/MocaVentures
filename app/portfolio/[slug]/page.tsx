import { getPublishedProjects } from "../../../data/projects";

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export default function ProjectPage() {
  return null;
}
