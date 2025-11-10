"use client";

import React, { useState, useEffect } from 'react';
import NewsCard from "@/components/NewsCard";
import { News } from '@/utils/types';
import { convertDateToText } from '@/utils/convertToDateString';
import { useAuth } from "@/contexts/AuthContext";

/* COMMENTING THIS OUT FOR NOW 
const newsItems = [
  {
    title: "ARA Lab open house!",
    date: "October 11, 2025 — Somewhere on Umass Lowell",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure consequuntur minus fugit alias at sunt beatae! Commodi, placeat suscipit alias hic aliquam ducimus deserunt, porro eum asperiores, inventore sint maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dolorem pariatur consequuntur ad nam eveniet, facere quidem placeat asperiores magnam ullam error odit non explicabo recusandae? Neque porro dicta praesentium.",
    imageSrc: "/placeholder.jpg",
    imageAlt: "ARA Lab open house", 
  },

  {
    title: "New Robotics Project!",
    date: "October 11, 2025 — Somewhere on Umass Lowell",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure consequuntur minus fugit alias at sunt beatae! Commodi, placeat suscipit alias hic aliquam ducimus deserunt, porro eum asperiores, inventore sint maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dolorem pariatur consequuntur ad nam eveniet, facere quidem placeat asperiores magnam ullam error odit non explicabo recusandae? Neque porro dicta praesentium.",
    imageSrc: "/placeholder.jpg",
    imageAlt: "New robotics project image", 
  },
  {
    title: "Some other event",
    date: "October 11, 2025 — Somewhere on Umass Lowell",  
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure consequuntur minus fugit alias at sunt beatae! Commodi, placeat suscipit alias hic aliquam ducimus deserunt, porro eum asperiores, inventore sint maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dolorem pariatur consequuntur ad nam eveniet, facere quidem placeat asperiores magnam ullam error odit non explicabo recusandae? Neque porro dicta praesentium.",
    imageSrc: "/placeholder.jpg",

    imageAlt: "Event photo", 
  },
];*/

export default function NewsPage() {
    const { user, session } = useAuth();
    const [newsItems, setNewsItems] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newArticle, setNewArticle] = useState({
        title: '',
        date: '',
        location: '',
        image: '',
        image_alt: '',
        description: ''
    })

    
    const getNews = async () => {
        try {
            const response = await fetch('/api/news');
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            
            const responseData = await response.json();
            if (!responseData.data) {
                throw new Error('No data in response');
            }

            const data: News[] = responseData.data.map((item: any) => {
                return {
                    id: item.id,
                    title: item.title,
                    date: convertDateToText(item.date),
                    location: item.location || '',
                    imageSrc: item.image || '',
                    imageAlt: item.image_alt || '',
                    description: item.description || '',
                    writtenBy: item.people?.[0]?.name || 'No Author'
                }
            });

            setNewsItems(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    const handleDeleteArticle = async (id: number) => {
        if (!confirm('Are you sure you want to delete this article?')) {
            return;
        }

        try {
            console.log('Attempting to delete article:', id);
            const response = await fetch(`/api/news?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            console.log('Delete response:', { status: response.status, data });
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete article');
            }

            // Optimistically update the UI
            setNewsItems(prevItems => prevItems.filter(item => item.id !== id));
            
            // Double check the deletion worked by fetching latest data
            const checkResponse = await fetch('/api/news');
            const checkData = await checkResponse.json();
            
            if (checkData.data.some((item: any) => item.id === id)) {
                // If article still exists, refresh the list and show error
                await getNews();
                throw new Error('Article appears to still exist after deletion');
            }

            alert('Article deleted successfully!');
        } catch (err: any) {
            console.error('Delete error:', err);
            alert(err.message || 'Failed to delete article. Please try again.');
        }
    };

    const handleAddArticle = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newArticle.title.trim() || !newArticle.date.trim() || !newArticle.description.trim()) {
            alert('Title, date, and description are required!');
            return;
        }

        try {
            const response = await fetch('/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle),
            });

            if (!response.ok) {
                throw new Error('Failed to add article');
            }

            // Reset form
            setNewArticle({
                title: '',
                date: '',
                location: '',
                image: '',
                image_alt: '',
                description: ''
            });

            // Refresh the news list
            await getNews();
            
            alert('Article added successfully!');
        } catch (err: any) {
            console.error('Error adding article:', err);
            alert('Failed to add article. Please try again.');
        }
    };




    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <main className="flex-grow mt-40 flex flex-col items-center text-center px-6">
                <section className="w-full max-w-5xl text-center bg-white shadow-md rounded-2xl p-8 mb-16">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">ARA Lab recent News/events/activities</h1>

                    {/*Adding more Article Form*/}
                    {user && (
                        <form
                            onSubmit={handleAddArticle}
                            className="w-full max-w-2xl mx-auto text-left bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm"
                        >
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Add New Article
                        </h2>

                        <div className="space-y-3">
                            <input
                                type="text" 
                                placeholder="Title *" 
                                value={newArticle.title}
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, title: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                required
                            />

                            <input
                                type="date"
                                placeholder="Date *"
                                value={newArticle.date}
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, date: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                required
                            />

                            <input
                                type="text"  
                                placeholder="Location"
                                value={newArticle.location}
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, location: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                            />

                            <textarea
                                placeholder="Description *"
                                value={newArticle.description}
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, description: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-300"
                                required
                            />

                            <input
                                type="text" 
                                placeholder="Image URL (Google Drive link)"
                                value={newArticle.image} 
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, image: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                            />

                            <input
                                type="text"
                                placeholder="Image Alt Text" 
                                value={newArticle.image_alt}
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, image_alt: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                            />

                        </div> 

                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-blue-500 transition"
                        >
                            Add Article
                        </button>
                        </form>
                    )}


                    <div className="space-y-10">
                        { loading ? ( 
                            <p className="text-gray-500 italic">Loading news..</p>
                        ) : newsItems.length === 0 ? (
                            <p className="text-gray-500 italic">No news : (</p>
                        ) : (newsItems.map((item, index) => (
                                <NewsCard 
                                    key={index}
                                    id={item.id}
                                    title={item.title}
                                    location={item.location}
                                    date={item.date}
                                    description={item.description}
                                    imageSrc={item.imageSrc} 
                                    imageAlt={item.imageAlt}
                                    writtenBy={item.writtenBy || 'No Author'}
                                    onDelete={user ? () => handleDeleteArticle(item.id) : undefined}
                                />
                        )))}
                    </div>
                </section>
            </main>
        </div>  
    )
}