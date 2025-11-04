"use client";

import React, { useState, useEffect } from 'react';
import { Person } from "@/utils/types";
import PersonCard from "@/components/PersonCard";

export default function PeoplePage() {
    const [labMembers, setLabMembers] = useState<Person[]>([]);
    const [alumni, setAlumni] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPeople = async () => {
            try {
                const response = await fetch('/api/people'); // Replace with your API endpoint
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

        getPeople();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <main className="flex-grow mt-24 flex flex-col items-center text-center px-6">
                <section className="w-full max-w-5xl text-center bg-white shadow-md rounded-2xl p-8 mb-16">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">
                      ARA Lab People
                    </h1>

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