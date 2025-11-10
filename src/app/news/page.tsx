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
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <main className="flex-grow mt-48 flex flex-col items-center px-6 pb-20">
                <section className="w-full max-w-4xl">
                    {/* Header Section */}
                    <div className="mb-20">
                        <h1 className="text-6xl sm:text-7xl font-black mb-6 text-slate-900 tracking-tight uppercase">
                            News & Events
                        </h1>
                        <div className="flex gap-3 mb-6">
                            <div className="h-3 w-40 bg-blue-600 rounded-full"></div>
                            <div className="h-3 w-20 bg-rose-500 rounded-full"></div>
                        </div>
                        <p className="text-xl text-slate-600 font-bold">
                            Stay updated with the latest from ARA Lab
                        </p>
                    </div>

                    {/*Adding more Article Form*/}
                    {user && (
                        <form
                            onSubmit={handleAddArticle}
                            className="w-full modern-card bg-white mb-16 border-l-4 border-l-blue-600 comic-outline"
                        >
                        <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight uppercase">
                            Add New Article
                        </h2>

                        <div className="space-y-4">
                            <input
                                type="text" 
                                placeholder="Article Title *" 
                                value={newArticle.title}
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, title: e.target.value })
                                }
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                required
                            />

                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    placeholder="Date *"
                                    value={newArticle.date}
                                    onChange={(e) =>
                                        setNewArticle({ ...newArticle, date: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
                                    required
                                />

                                <input
                                    type="text"  
                                    placeholder="Location"
                                    value={newArticle.location}
                                    onChange={(e) =>
                                        setNewArticle({ ...newArticle, location: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
                                />
                            </div>

                            <textarea
                                placeholder="Description *"
                                value={newArticle.description}
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, description: e.target.value })
                                }
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none"
                                required
                            />

                            <input
                                type="text" 
                                placeholder="Image URL (for google drive images set share to allow anyone to access with link)"
                                value={newArticle.image} 
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, image: e.target.value })
                                }
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
                            />

                            <input
                                type="text"
                                placeholder="Image Alt Text" 
                                value={newArticle.image_alt}
                                onChange={(e) =>
                                    setNewArticle({ ...newArticle, image_alt: e.target.value })
                                }
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
                            />

                        </div> 

                        <button
                            type="submit"
                            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide text-lg"
                        >
                            Publish Article
                        </button>
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
                        ) : newsItems.length === 0 ? (
                            <div className="text-center py-16 pop-content">
                                <p className="text-slate-700 text-lg font-bold p-8">No news yet</p>
                            </div>
                        ) : (newsItems.map((item, index) => (
                                <div key={index} className="card-lift">
                                    <NewsCard 
                                        title={item.title}
                                        location={item.location}
                                        date={item.date}
                                        description={item.description}
                                        imageSrc={item.imageSrc} 
                                        imageAlt={item.imageAlt}
                                    />
                                </div>
                        )))}
                    </div>
                </section>
            </main>
        </div>  
    )
}