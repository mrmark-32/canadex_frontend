"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";

type PortfolioItem = {
  title: string;
  client: string;
  project_date: string;
  image: string | null;
  short_description: string;
  description: string;
  technologies: string[];
};

export default function PortfolioDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/portfolio/${slug}/`)
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="py-32 text-center">Loading project...</div>;
  if (!project) notFound();

  return (
    <div className="min-h-screen">
      <nav className="bg-white dark:bg-gray-900 py-4 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/portfolio" className="text-red-600 hover:underline">← Back to Portfolio</Link>
        </div>
      </nav>

      <div className="relative h-[600px]">
        <img 
          src={project.image || "https://picsum.photos/1200/600"} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-6xl font-bold">{project.title}</h1>
          {project.client && <p className="text-2xl mt-4">Client: {project.client}</p>}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <div 
              className="prose dark:prose-invert text-lg"
              dangerouslySetInnerHTML={{ __html: project.description || "" }}
            />
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-6">Project Details</h3>
            {project.project_date && (
              <p><strong>Date:</strong> {project.project_date}</p>
            )}
            
            {project.technologies.length > 0 && (
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}