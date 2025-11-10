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
    const { user } = useAuth();
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
                throw new Error('Failed to fetch users');
            }
            const data: News[] = (await response.json())['data'].map((item: any) => {
                return {
                    title: item.title,
                    date: convertDateToText(item.date),
                    location: item.location,
                    imageSrc: item.image,
                    imageAlt: item.image_alt,
                    description: item.description,
                }
            });

            setNewsItems(data)
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    const handleAddArticle = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newArticle.title.trim() || !newArticle.date.trim() || !newArticle.description.trim()) {
            alert('Title, date, and description are required!');
            return;
        }

        const articleData = {
            ...newArticle,
            image: newArticle.image.trim() || '/placeholder.jpg',
            image_alt: newArticle.image_alt.trim() || newArticle.title
        };

        try {
            const response = await fetch('/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData),
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
                                placeholder="Image URL (for google drive images set share to allow anyone to access with link)"
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
                                    title={item.title}
                                    location={item.location}
                                    date={item.date}
                                    description={item.description}
                                    imageSrc={item.imageSrc} 
                                    imageAlt={item.imageAlt}
                                />
                        )))}
                    </div>
                </section>
            </main>
        </div>  
    )
}