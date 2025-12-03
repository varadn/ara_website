"use client";

import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/utils/types';
import { useAuth } from "@/contexts/AuthContext";
import { FormattedMessage } from "react-intl";

export default function NewsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isInitialEdit, setIsInitialEdit] = useState(false); //Have to add this to fix stupid focus issue
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: '',
        image_alt: ''
    });


    const editFormRef = useRef<HTMLFormElement>(null);
    
    const getProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data: Project[] = (await response.json())['data'].map((item: any) => {
                return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    imageSrc: item.image,
                    imageAlt: item.image_alt,
                    dateCreated: new Date(item.date_created)
                }
            }).sort((a: Project, b: Project) => 
                b.dateCreated.getTime() - a.dateCreated.getTime()
            );

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

    useEffect(() => {
            if (editingProject && editFormRef.current && isInitialEdit) {
                editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                //focus to first input field
                const firstInput = editFormRef.current.querySelector('input');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 300);
                }
                setIsInitialEdit(false); //reset flag after focus
            }
        }, [editingProject, isInitialEdit]);  


        const handleAddProject = async (e: React.FormEvent) => {
            e.preventDefault();
            
            if (!newProject.title.trim() || !newProject.description.trim()) {
                alert('Title and description are required!');
                return;
            }

            const projectData = {
                ...newProject,
                image: newProject.image.trim() || '/placeholder.jpg',
                image_alt: newProject.image_alt.trim() || newProject.title,
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

        const handleEditProject = async (e: React.FormEvent) => {
            e.preventDefault();
            
            if (!editingProject) return;
    
            const projectData = {
                id: editingProject.id, 
                title: editingProject.title,
                description: editingProject.description,
                image: editingProject.imageSrc || '/placeholder.jpg',
                image_alt: editingProject.imageAlt || editingProject.title
            };
    
            try {
                const response = await fetch('/api/projects', {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(projectData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update project'); 
                }
    
                setEditingProject(null);
                await getProjects();
                alert('Project updated successfully!');
            } catch (err: any) {
                console.error('Error updating project:', err);
                alert('Failed to update project. Please try again.');
            }
        };
    
        const handleDeleteProject = async (id: number) => {
            if (!confirm('Are you sure you want to delete this project?')) {
                return;
            } 
    
            try {
                const response = await fetch(`/api/projects?id=${id}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    throw new Error('Failed to delete project'); 
                }
    
                await getProjects();
                alert('Project deleted successfully!');
            } catch (err: any) {
                console.error('Error deleting project:', err); 
                alert('Failed to delete project. Please try again.');
            }
        };
    
        const startEdit = (project: Project) => {
            setEditingProject({ ...project });
            setIsInitialEdit(true);//set flag when starting to edit
        };
    
        const cancelEdit = () => {
            setEditingProject(null); 
        };


    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <main className="flex-grow mt-48 flex flex-col items-center px-6 pb-20">
                <section className="w-full max-w-4xl">
                    {/* Header Section */}
                    <div className="mb-20">
                        <h1 className="text-6xl sm:text-7xl font-black mb-6 text-slate-900 tracking-tight uppercase">
                            <FormattedMessage id="project.title" />
                        </h1>
                        <div className="flex gap-3 mb-6">
                            <div className="h-3 w-40 bg-blue-600 rounded-full"></div>
                            <div className="h-3 w-20 bg-rose-500 rounded-full"></div>
                        </div>
                        <p className="text-xl text-slate-600 font-bold">
                            <FormattedMessage id="project.headline" />
                        </p>
                    </div>

                    {user && !editingProject && (
                        <form
                            onSubmit={handleAddProject}
                            className="w-full modern-card bg-white mb-16 border-l-4 border-l-blue-600 comic-outline"
                        >
                            <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight uppercase">
                                Add New Project
                            </h2>

                            <div className="space-y-4"> 
                                <input
                                    type="text"
                                    placeholder="Project Title *" 
                                    value={newProject.title} 
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, title: e.target.value }) 
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                    required
                                />

                                <textarea
                                    placeholder="Project Description *" 
                                    value={newProject.description}
                                    onChange={(e) => 
                                        setNewProject({ ...newProject, description: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none font-semibold"
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Image URL (Google Drive link)"
                                    value={newProject.image} 
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, image: e.target.value })
                                    } 
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />

                                <input
                                    type="text"
                                    placeholder="Image Alt Text"
                                    value={newProject.image_alt}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, image_alt: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide text-lg"
                            >
                                Add Project
                            </button>
                        </form>
                    )}

                    {/*Edit the Project Form*/}
                    {user && editingProject && (
                        <form
                            ref={editFormRef} 
                            onSubmit={handleEditProject}
                            className="w-full modern-card bg-blue-50 mb-16 border-l-4 border-l-rose-500 comic-outline"
                        >
                            <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight uppercase">
                                Edit Project
                            </h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Project Title *"
                                    value={editingProject.title} 
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, title: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                    required
                                />

                                <textarea
                                    placeholder="Project Description *"
                                    value={editingProject.description} 
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, description: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none font-semibold"
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={editingProject.imageSrc}
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, imageSrc: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />

                                <input
                                    type="text"
                                    placeholder="Image Alt Text"
                                    value={editingProject.imageAlt} 
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, imageAlt: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />
                            </div>

                            <div className="flex space-x-3 mt-8">
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide text-lg"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="px-8 py-4 bg-slate-500 text-white font-black rounded-lg hover:bg-slate-600 transition-all uppercase tracking-wide text-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="space-y-8">
                        { loading ? ( 
                            <div className="text-center py-16">
                                <div className="inline-block animate-spin mb-4">
                                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                                </div>
                                <p className="text-slate-500 italic text-lg font-bold">Loading news..</p>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="text-center py-16 pop-content">
                                <p className="text-slate-700 text-lg font-bold">No projects yet</p>
                            </div>
                        ) : (projects.map((project, index) => (
                                <div key={project.id} className="card-lift">
                                    <ProjectCard
                                        title={project.title} 
                                        description={project.description}
                                        imageSrc={project.imageSrc}
                                        imageAlt={project.imageAlt}
                                    />
                            {user && (
                                <div className="flex justify-end space-x-2 mt-3">
                                    <button
                                        onClick={() => startEdit(project)}
                                        className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition uppercase"
                                    >
                                        Edit
                                    </button> 
                                    <button
                                        onClick={() => handleDeleteProject(project.id!)}
                                        className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition uppercase"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                            </div>
                        )))}
                    </div>
                </section>
            </main>
        </div>  
    )
}