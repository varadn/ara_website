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
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {/*All the content  */}
        <main className="flex-grow mt-30 flex flex-col items-center text-center px-6">
        {/*"hero" part of page */} 
        <section className="flex flex-col items-center justify-center text-center w-full
            h-[90vh] bg-gradient-to-b from-white to-gray-100">
            <h1 className="text-7xl sm:text-8xl font-extrabold mb-6 text-gray-900 tracking-tight">
            ARA Lab Home
            </h1>
        <p className="text-2xl sm:text-3xl text-gray-600 max-w-2xl">
            Assistive Robots & Accessibility 
        </p>
        </section> 

        {/*Section for showing off projects on mainpage*/}
        <section className="w-full max-w-5xl text-left bg-white shadow-md rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
            Projects
            </h3>

            {/*Project form for logged in people*/}
            {user && (
                <form
                    onSubmit={handleAddProject}
                    className="w-full mx-auto text-left bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm"
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Add New Project
                    </h2>

                    <div className="space-y-3"> 
                        <input
                            type="text"
                            placeholder="Project Title *" 
                            value={newProject.title} 
                            onChange={(e) =>
                                setNewProject({ ...newProject, title: e.target.value }) 
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                            required
                        />

                        <textarea
                            placeholder="Project Description *" 
                            value={newProject.description}
                            onChange={(e) => 
                                setNewProject({ ...newProject, description: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-300"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Image URL (for google drive images set share to allow anyone to access with link)"
                            value={newProject.image} 
                            onChange={(e) =>
                                setNewProject({ ...newProject, image: e.target.value })
                            } 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                        />

                        <input
                            type="text"
                            placeholder="Image Alt Text"
                            value={newProject.image_alt}
                            onChange={(e) =>
                                setNewProject({ ...newProject, image_alt: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-blue-500 transition"
                    >
                        Add Project
                    </button>
                </form>
            )}

            <div className="space-y-8">
            { loading ? ( 
                    <p className="text-gray-500 italic">Loading projects..</p>
                ) : projects.length === 0 ? (
                    <p className="text-gray-500 italic">No projects : (</p>
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