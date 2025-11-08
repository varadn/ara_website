"use client";

import React, { useState, useEffect } from 'react';
import { Person } from "@/utils/types";
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
            const response = await fetch('/api/people'); //Replace with your API endpoint
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

        try { 
            const response = await fetch('/api/people', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPerson),
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
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <main className="flex-grow mt-40 flex flex-col items-center text-center px-6">
                <section className="w-full max-w-5xl text-center bg-white shadow-md rounded-2xl p-8 mb-16">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">
                      ARA Lab People
                    </h1>

                    {/* Add Person Form - Only visible when user is logged in */}
                    {user && (
                        <form
                            onSubmit={handleAddPerson}
                            className="w-full max-w-2xl mx-auto text-left bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                Add New Person
                            </h2>

                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Name *"
                                    value={newPerson.name}
                                    onChange={(e) =>
                                        setNewPerson({ ...newPerson, name: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Title *"
                                    value={newPerson.title}
                                    onChange={(e) =>
                                        setNewPerson({ ...newPerson, title: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                    required
                                />

                                <textarea
                                    placeholder="Description"
                                    value={newPerson.description}
                                    onChange={(e) =>
                                        setNewPerson({ ...newPerson, description: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-300"
                                />

                                <input
                                    type="text"
                                    placeholder="Image URL (for google drive images set share to allow anyone to access with link)"
                                    value={newPerson.image}
                                    onChange={(e) =>
                                        setNewPerson({ ...newPerson, image: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                />

                                <input
                                    type="text"
                                    placeholder="Image Alt Text"
                                    value={newPerson.image_alt}
                                    onChange={(e) =>
                                        setNewPerson({ ...newPerson, image_alt: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                />

                                <input
                                    type="url"
                                    placeholder="Website URL"
                                    value={newPerson.website}
                                    onChange={(e) =>
                                        setNewPerson({ ...newPerson, website: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                />

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        checked={newPerson.active}
                                        onChange={(e) =>
                                            setNewPerson({ ...newPerson, active: e.target.checked })
                                        }
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="active" className="text-sm text-gray-700">
                                        Current Lab Member
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-blue-500 transition"
                            >
                                Add Person
                            </button>
                        </form>
                    )}


                    {/*All current members*/}
                    <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                      Current Lab Members
                    </h2>
                      <div className="space-y-10"> 
                          { loading ? ( 
                                <p className="text-gray-500 italic">Loading lab members...</p>
                            ) : labMembers.length === 0 ? (
                                <p className="text-gray-500 italic">No lab members : (</p>
                            ) : ( labMembers.map((person, index) => (
                                    <PersonCard 
                                        key={index}
                                        name={person.name}  
                                        title={person.title}
                                        description={person.description}
                                        imageSrc={person.imageSrc} 
                                        imageAlt={person.imageAlt} 
                                        projects={person.projects}
                                        website={person.website} 
                                    />
                                )))}
                      </div>
                    </div>

                    {/*All alumni members*/}
                    <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                    Alumni Lab Members
                    </h2>
                        <div className="space-y-10">
                        { loading ? ( 
                            <p className="text-gray-500 italic">Loading alumni...</p>
                        ) : alumni.length === 0 ? (
                            <p className="text-gray-500 italic">No alumni :(</p>
                        ) : ( alumni.map((person, index) => (
                            <PersonCard 
                                key={index}
                                name={person.name}  
                                title={person.title}
                                description={person.description}
                                imageSrc={person.imageSrc} 
                                imageAlt={person.imageAlt} 
                                projects={person.projects}
                                website={person.website} 
                            />
                            )))}
                    </div>
                </div>
                </section>
            </main>
        </div>  
    )
}