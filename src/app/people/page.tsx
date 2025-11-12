"use client";

import React, { useState, useEffect } from 'react';
import { Person, PostAction } from "@/utils/types";
import PersonCard from "@/components/PersonCard";
import { useAuth } from "@/contexts/AuthContext";

export default function PeoplePage() {
    const { user } = useAuth();
    const [labMembers, setLabMembers] = useState<Person[]>([]);
    const [alumni, setAlumni] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newPerson, setNewPerson] = useState({
        name: '',
        title: '',
        description: '',
        image: '',
        image_alt: '', 
        website: '',
        active: true
    });

        

    const getPeople = async () => { 
        try {
            const response = await fetch('/api/people');
            if (!response.ok) {
                throw new Error('Failed to fetch users'); 
            }
            const data: Person[] = (await response.json())['data'].map((item: any) => {
                return {
                    name: item.name,
                    title: item.title,
                    description: item.description, 
                    imageSrc: item.image,
                    imageAlt: item.image_alt,
                    website: item.website,
                    projects: item.projects.map((project: any) => project.title),
                    active: item.active
                }
            });

        const lab: Person[] = data.filter((person) => person.active); 
        setLabMembers(lab)
        
        const alum: Person[] = data.filter((person) => !person.active);
        setAlumni(alum)
            
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
 
    useEffect(() => {
        getPeople();
    }, []);

    const handleAddPerson = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newPerson.name.trim() || !newPerson.title.trim()) {
            alert('Name and title are required!');
            return;
        }

        const personData = {
            ...newPerson,
            image: newPerson.image.trim() || '/placeholder.jpg',
            image_alt: newPerson.image_alt.trim() || newPerson.name,
            action: PostAction.Create
        };

        try { 
            const response = await fetch('/api/people', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(personData),
            });

            if (!response.ok) {
                throw new Error('Failed to add person');
            }

            //Reset form
            setNewPerson({
                name: '',
                title: '',
                description: '', 
                image: '',
                image_alt: '',
                website: '',
                active: true
            });

            //Refresh the people list
            await getPeople();
            
            alert('Person added successfully!');
        } catch (err: any) {
            console.error('Error adding person:', err);
            alert('Failed to add person. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <main className="flex-grow mt-48 flex flex-col items-center px-6 pb-20">
                <section className="w-full max-w-5xl">
                    {/* Header Section */}
                    <div className="mb-20">
                        <h1 className="text-6xl sm:text-7xl font-black mb-6 text-slate-900 tracking-tight uppercase">
                            Our Team
                        </h1>
                        <div className="flex gap-3 mb-6">
                            <div className="h-3 w-40 bg-blue-600 rounded-full"></div>
                            <div className="h-3 w-20 bg-rose-500 rounded-full"></div>
                        </div>
                        <p className="text-xl text-slate-600 font-bold">
                            Meet the brilliant minds behind ARA Lab
                        </p>
                    </div>

                    {/*Adding a person form*/}
                    {user && (
                        <form
                            onSubmit={handleAddPerson}
                            className="w-full modern-card bg-white mb-16 border-l-4 border-l-rose-500 comic-outline"
                        >
                            <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight uppercase">
                                Add New Team Member
                            </h2>

                            <div className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name *"
                                        value={newPerson.name}
                                        onChange={(e) =>
                                            setNewPerson({ ...newPerson, name: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                        required
                                    />

                                    <input
                                        type="text"
                                        placeholder="Title/Role *"
                                        value={newPerson.title}
                                        onChange={(e) =>
                                            setNewPerson({ ...newPerson, title: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                        required
                                    />
                                </div>

                                <textarea
                                    placeholder="Bio/Description"
                                    value={newPerson.description}
                                    onChange={(e) =>
                                        setNewPerson({ ...newPerson, description: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none"
                                />

                                <input
                                    type="text"
                                    placeholder="Profile Image URL"
                                    value={newPerson.image}
                                    onChange={(e) =>
                                        setNewPerson({ ...newPerson, image: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
                                />

                                <input
                                    type="text"
                                    placeholder="Image Alt Text"
                                    value={newPerson.image_alt}
                                    onChange={(e) =>
                                        setNewPerson({ ...newPerson, image_alt: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
                                />

                                <input
                                    type="url"
                                    placeholder="Personal Website (optional)"
                                    value={newPerson.website}
                                    onChange={(e) =>
                                        setNewPerson({ ...newPerson, website: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
                                />

                                <div className="flex items-center space-x-3 bg-slate-100 p-4 rounded-lg border-2 border-slate-300">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        checked={newPerson.active}
                                        onChange={(e) =>
                                            setNewPerson({ ...newPerson, active: e.target.checked })
                                        }
                                        className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                                    />
                                    <label htmlFor="active" className="text-sm font-bold text-slate-900 cursor-pointer uppercase">
                                        Currently Active Member
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:shadow-lg hover:from-rose-600 hover:to-rose-700 transition-all uppercase tracking-wide text-lg"
                            >
                                Add Member
                            </button>
                        </form>
                    )}


                    {/*All current members*/}
                    <div className="mb-20">
                    <h2 className="text-4xl font-black text-slate-900 mb-10 tracking-tight uppercase">
                      Current Lab Members
                    </h2>
                      <div className="space-y-8"> 
                          { loading ? ( 
                                <div className="text-center py-16">
                                    <div className="inline-block animate-spin mb-4">
                                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                                    </div>
                                    <p className="text-slate-500 italic text-lg font-bold">Loading team members...</p>
                                </div>
                            ) : labMembers.length === 0 ? (
                                <div className="text-center py-16 pop-content">
                                    <p className="text-slate-700 text-lg font-bold p-8">No active members yet</p>
                                </div>
                            ) : ( labMembers.map((person, index) => (
                                    <div key={index} className="card-lift">
                                        <PersonCard 
                                            name={person.name}  
                                            title={person.title}
                                            description={person.description}
                                            imageSrc={person.imageSrc} 
                                            imageAlt={person.imageAlt} 
                                            projects={person.projects}
                                            website={person.website} 
                                        />
                                    </div>
                                )))}
                      </div>
                    </div>

                    {/*All alumni members*/}
                    <div>
                    <h2 className="text-4xl font-black text-slate-900 mb-10 tracking-tight uppercase">
                    Alumni
                    </h2>
                        <div className="space-y-8">
                        { loading ? ( 
                            <div className="text-center py-16">
                                <div className="inline-block animate-spin mb-4">
                                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                                </div>
                                <p className="text-slate-500 italic text-lg font-bold">Loading alumni...</p>
                            </div>
                        ) : alumni.length === 0 ? (
                            <div className="text-center py-16 pop-content">
                                <p className="text-slate-700 text-lg font-bold p-8">No alumni yet</p>
                            </div>
                        ) : ( alumni.map((person, index) => (
                            <div key={index} className="card-lift">
                                <PersonCard 
                                    name={person.name}  
                                    title={person.title}
                                    description={person.description}
                                    imageSrc={person.imageSrc} 
                                    imageAlt={person.imageAlt} 
                                    projects={person.projects}
                                    website={person.website} 
                                />
                            </div>
                            )))}
                    </div>
                </div>
                </section>
            </main>
        </div>  
    )
}