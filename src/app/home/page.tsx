"use client";

import React, { useState, useEffect } from 'react';
import { Project } from '@/utils/types';
import ProjectCard from "@/components/ProjectCard"
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
        const { user } = useAuth();
        const [projects, setProjects] = useState<Project[]>([]);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
        const [newProject, setNewProject] = useState({
            title: '',
            description: '',
            image: '',
            image_alt: ''
        });
    
        
        const getProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data: Project[] = (await response.json())['data'].map((item: any) => {
                    return {
                        title: item.title,
                        description: item.description,
                        imageSrc: item.image,
                        imageAlt: item.image_alt
                    }
                });

                setProjects(data)
                
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
          useEffect(() => {
            getProjects();
        }, []);  


        const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newProject.title.trim() || !newProject.description.trim()) {
            alert('Title and description are required!');
            return;
        }

        const projectData = {
            ...newProject,
            image: newProject.image.trim() || '/placeholder.jpg',
            image_alt: newProject.image_alt.trim() || newProject.title
        };

        try {
            const response = await fetch('/api/projects', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) { 
                throw new Error('Failed to add project');
            }

            //Resets form
            setNewProject({
                title: '',
                description: '',
                image: '',
                image_alt: ''
            });

            //Refreshs the projects list :D
            await getProjects();
            
            alert('Project added successfully!'); 
        } catch (err: any) {
            console.error('Error adding project:', err);
            alert('Failed to add project. Please try again.'); 
        }
    };

    return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
        {/*All the content  */}
        <main className="flex-grow flex flex-col items-center text-center">
        {/*"hero" part of page */} 
        <section className="flex flex-col items-center justify-center text-center w-full
            h-screen gradient-primary relative overflow-hidden">
            {/* Decorative elements - contained within section */}
            <div className="absolute inset-0 top-20 right-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute inset-0 bottom-40 left-10 w-96 h-96 bg-black opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <h1 className="text-7xl sm:text-8xl font-black mb-6 text-white tracking-tight drop-shadow-lg">
                ARA Lab
              </h1>
              <p className="text-2xl sm:text-3xl text-blue-100 max-w-2xl font-light">
                Assistive Robots & Accessibility 
              </p>
              <div className="mt-8 h-1 w-24 bg-white mx-auto opacity-60"></div>
            </div>
        </section> 

        {/*Section for showing off projects on mainpage*/}
        <section className="w-full max-w-6xl px-6 py-20">
            <div className="mb-16">
              <h2 className="text-5xl font-black mb-4 text-slate-900">
                Featured Projects
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-rose-500"></div>
            </div>

            <div className="space-y-12">
            { loading ? ( 
                    <p className="text-slate-500 italic text-lg">Loading projects..</p>
                ) : projects.length === 0 ? (
                    <p className="text-slate-500 italic text-lg">No projects yet</p>
                ) : (projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title} 
                            description={project.description}
                            imageSrc={project.imageSrc}
                            imageAlt={project.imageAlt}
                        />
                )))}
            </div>
        </section>
        </main>
    </div>
    );
}