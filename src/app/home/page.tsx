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
            <div className="absolute -top-20 -right-32 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-3xl pointer-events-none transform rotate-45"></div>
            <div className="absolute -bottom-32 -left-40 w-full h-96 bg-black opacity-[0.05] rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="absolute top-32 right-16 w-32 h-32 border-4 border-white opacity-10 rounded-3xl transform rotate-12 pointer-events-none"></div>
            <div className="absolute bottom-40 left-20 w-40 h-40 border-4 border-white opacity-10 rounded-full transform -rotate-12 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h1 className="text-8xl sm:text-9xl font-black mb-6 text-white tracking-tighter drop-shadow-lg leading-none">
                ARA Lab
              </h1>
              <p className="text-3xl sm:text-4xl text-blue-100 max-w-3xl font-black tracking-wide mb-8">
                Assistive Robots & Accessibility 
              </p>
              <div className="flex justify-center gap-4 mb-8">
                <div className="h-2 w-16 bg-white opacity-70 rounded-full"></div>
                <div className="h-2 w-16 bg-rose-300 opacity-70 rounded-full"></div>
                <div className="h-2 w-16 bg-white opacity-70 rounded-full"></div>
              </div>
            </div>
        </section> 

        {/*Section for showing off projects on mainpage*/}
        <section className="w-full max-w-6xl px-6 py-24">
            <div className="mb-20">
              <h2 className="text-6xl font-black mb-6 text-slate-900 tracking-tight">
                Featured Projects
              </h2>
              <div className="flex gap-3 mb-4">
                <div className="h-3 w-48 bg-blue-600 rounded-full"></div>
                <div className="h-3 w-24 bg-rose-500 rounded-full"></div>
              </div>
              <p className="text-lg text-slate-600 max-w-2xl">
                Cutting-edge research pushing the boundaries of assistive technology
              </p>
            </div>

            <div className="space-y-16">
            { loading ? ( 
                    <div className="text-center py-16">
                        <div className="inline-block animate-spin mb-4">
                            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                        </div>
                        <p className="text-slate-500 italic text-lg">Loading projects..</p>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-16 pop-content">
                        <p className="text-slate-500 text-lg font-bold">No projects yet</p>
                    </div>
                ) : (projects.map((project, index) => (
                        <div key={index} className="card-lift">
                            <ProjectCard
                                title={project.title} 
                                description={project.description}
                                imageSrc={project.imageSrc}
                                imageAlt={project.imageAlt}
                            />
                        </div>
                )))}
            </div>
        </section>
        </main>
    </div>
    );
}