"use client";

import React, { useState, useEffect, useRef } from 'react';
import NewsCard from "@/components/NewsCard";
import { News } from '@/utils/types';
import { convertDateToText } from '@/utils/convertToDateString';
import { useAuth } from "@/contexts/AuthContext";

export default function NewsPage() {
    const { user } = useAuth();
    const [newsItems, setNewsItems] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [newArticle, setNewArticle] = useState({
        title: '',
        date: '',
        location: '',
        image: '',
        image_alt: '',
        description: ''
    })

    const editFormRef = useRef<HTMLFormElement>(null);
    
    const getNews = async () => {
        try {
            const response = await fetch('/api/news');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data: News[] = (await response.json())['data'].map((item: any) => {
                return {
                    id: item.id,
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

    useEffect(() => {
        if (editingNews && editFormRef.current) {
            editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const firstInput = editFormRef.current.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 300);
            }
        }
    }, [editingNews]);

    const handleAddArticle = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newArticle.title.trim() || !newArticle.date.trim() || !newArticle.description.trim()) {
            alert('Title, date, and description are required!');
            return;
        }

        const articleData = {
            ...newArticle,
            image: newArticle.image.trim() || '/placeholder.jpg',
            image_alt: newArticle.image_alt.trim() || newArticle.title,

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

    const handleEditArticle = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!editingNews) return;

        const newsData = {
            id: editingNews.id, 
            title: editingNews.title,
            date: editingNews.date,
            location: editingNews.location,
            image: editingNews.imageSrc || '/placeholder.jpg',
            image_alt: editingNews.imageAlt || editingNews.title,
            description: editingNews.description
        };

        try {
            const response = await fetch('/api/news', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newsData),
            });

            if (!response.ok) {
                throw new Error('Failed to update news article'); 
            }

            setEditingNews(null);
            await getNews();
            alert('News article updated successfully!');
        } catch (err: any) {
            console.error('Error updating news article:', err);
            alert('Failed to update news article. Please try again.');
        }
    };

    const handleDeleteArticle = async (id: number) => {
        if (!confirm('Are you sure you want to delete this news article?')) {
            return;
        } 

        try {
            const response = await fetch(`/api/news?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete news article'); 
            }

            await getNews();
            alert('News article deleted successfully!');
        } catch (err: any) {
            console.error('Error deleting news article:', err); 
            alert('Failed to delete news article. Please try again.');
        }
    };

    const startEdit = (news: News) => {
        setEditingNews({ ...news });
    };

    const cancelEdit = () => {
        setEditingNews(null); 
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
                    {user && !editingNews && (
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
                    {/*Edit Article Form :)*/}
                    {user && editingNews && (
                        <form
                            ref={editFormRef}
                            onSubmit={handleEditArticle}
                            className="w-full modern-card bg-blue-50 mb-16 border-l-4 border-l-rose-500 comic-outline"
                        >
                            <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight uppercase">
                                Edit Article
                            </h2> 

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Article Title *"
                                    value={editingNews.title}
                                    onChange={(e) =>
                                        setEditingNews({ ...editingNews, title: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                    required
                                />

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        type="date" 
                                        value={editingNews.date}
                                        onChange={(e) =>
                                            setEditingNews({ ...editingNews, date: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
                                        required
                                    />

                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={editingNews.location}
                                        onChange={(e) =>
                                            setEditingNews({ ...editingNews, location: e.target.value })
                                        }
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
                                    />
                                </div>

                                <textarea
                                    placeholder="Description *"
                                    value={editingNews.description} 
                                    onChange={(e) =>
                                        setEditingNews({ ...editingNews, description: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none"
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={editingNews.imageSrc}
                                    onChange={(e) =>
                                        setEditingNews({ ...editingNews, imageSrc: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
                                />

                                <input
                                    type="text"
                                    placeholder="Image Alt Text"
                                    value={editingNews.imageAlt}
                                    onChange={(e) =>
                                        setEditingNews({ ...editingNews, imageAlt: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white"
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
                        ) : newsItems.length === 0 ? (
                            <div className="text-center py-16 pop-content">
                                <p className="text-slate-700 text-lg font-bold p-8">No news yet</p>
                            </div>
                        ) : (newsItems.map((item) => (
                                <div key={item.id} className="card-lift">
                                    <NewsCard 
                                        title={item.title}
                                        location={item.location}
                                        date={item.date}
                                        description={item.description}
                                        imageSrc={item.imageSrc} 
                                        imageAlt={item.imageAlt}
                                    />
                                {user && (
                                    <div className="flex justify-end space-x-2 mt-3">
                                        <button
                                            onClick={() => startEdit(item)}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition uppercase"
                                        >
                                            Edit
                                        </button> 
                                        <button
                                            onClick={() => handleDeleteArticle(item.id!)}
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