"use client";

import React, { useState, useEffect } from 'react';
import { Project } from '@/utils/types';
import ProjectCard from "@/components/ProjectCard"

export default function HomePage() {
        const [projects, setProjects] = useState<Project[]>([]);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
    
        useEffect(() => {
            const getProjects = async () => {
                try {
                    const response = await fetch('/api/projects'); // Replace with your API endpoint
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
    
            getProjects();
        }, []);


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