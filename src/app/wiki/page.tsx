"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { WikiEntry } from "@/utils/types";
import WikiEntryCard from "@/components/WikiArticleCard";
import { useAuth } from "@/contexts/AuthContext";
import { notFound } from 'next/navigation'

export default function WikiPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState<WikiEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState<WikiEntry | null>(null);
  const [isInitialEdit, setIsInitialEdit] = useState(false); //Have to add this to fix stupid focus issue
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });

  const editFormRef = useRef<HTMLFormElement>(null); 

    
  //getting wiki article from supabase
  const getArticles = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/wiki');
      if (!response.ok) {
        throw new Error('Failed to fetch wiki articles');
      }
      
      const result = await response.json();
      setEntries(result.data || []);
    } catch (error) {
      console.error("Error loading wiki articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    if (editingEntry && editFormRef.current && isInitialEdit) {
      editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = editFormRef.current.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 300);
      }
      setIsInitialEdit(false); //reset flag after focus
    }
  }, [editingEntry, isInitialEdit]);

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    try {
      const response = await fetch('/api/wiki', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newEntry.title,
          content: newEntry.content
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add wiki article');
      }

      setNewEntry({ title: "", content: "" });
      await getArticles();
      alert('Article added successfully!');
    } catch (error) {
      console.error("Error adding wiki article:", error);
      alert('Failed to add article. Please try again.');
    }
  };

  const handleEditEntry = async (e: React.FormEvent) => {
    e.preventDefault();
        
        if (!editingEntry) return;

        const personData = {
            id: editingEntry.id, 
            articleName: editingEntry.articleName,
            Content: editingEntry.Content
        };

        try {
            const response = await fetch('/api/wiki', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(personData),
            });

            if (!response.ok) {
                throw new Error('Failed to update article'); 
            }

            setEditingEntry(null);
            await getArticles();
            alert('Article updated successfully!');
        } catch (err: any) {
            console.error('Error updating article:', err);
            alert('Failed to update article. Please try again.');
        }
  };

  const handleDeleteEntry = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) {
            return;
        } 

        try {
            const response = await fetch(`/api/wiki?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete article'); 
            }

            await getArticles();
            alert('Article deleted successfully!');
        } catch (err: any) {
            console.error('Error deleting article:', err); 
            alert('Failed to delete article. Please try again.');
        }
  };

  const startEdit = (article: WikiEntry) => {
      setEditingEntry({ ...article });
      setIsInitialEdit(true);//set flag when starting to edit
  };

  const cancelEdit = () => {
      setEditingEntry(null); 
  };
  
  const filteredEntries = entries.filter((entry) =>
    entry.articleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <main className="flex-grow mt-48 flex flex-col items-center px-6 pb-20" role="main">
          <section className="w-full max-w-5xl" role="region" aria-labelledby="wiki-title">
            {/* Header Section */}
            <div className="mb-20">
              <h1 className="text-6xl sm:text-7xl font-black mb-6 text-slate-900 tracking-tight uppercase" id="wiki-title"> 
                ARA Lab Wiki
              </h1>
              <div className="flex gap-3 mb-6">
                <div className="h-3 w-40 bg-blue-600 rounded-full"></div>
                <div className="h-3 w-20 bg-rose-500 rounded-full"></div>
              </div>
              <p className="text-xl text-slate-600 font-bold">
                Collaborative knowledge base for the lab
              </p>
            </div>

            {/*Entry for an article - Only visible when user is logged in*/}
            {user && !editingEntry &&(
              <form
                onSubmit={handleAddEntry} 
                className="w-full modern-card bg-white mb-16 border-l-4 border-l-blue-600 comic-outline"
                role="form"
                aria-label="Add new wiki article form"
              > 
                <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight uppercase">
                  Add New Wiki Article
                </h2>

                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Article title *"
                    value={newEntry.title}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                    required
                  />
                  <textarea
                    placeholder="Article content *"
                    value={newEntry.content}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, content: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none font-semibold"
                    required
                  />
                </div>

                <button
                  type="submit" 
                  className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide text-lg"
                >
                  Add Article
                </button>
              </form>
            )}

            {/*Edit Article Form*/}
            {user && editingEntry && (
              <form
                ref={editFormRef}
                onSubmit={handleEditEntry}
                className="w-full modern-card bg-blue-50 mb-16 border-l-4 border-l-rose-500 comic-outline"
              >
                <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight uppercase">
                  Edit Wiki Article
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Article title *"
                    value={editingEntry.articleName}
                    onChange={(e) =>
                      setEditingEntry({ ...editingEntry, articleName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                    required
                  />
                  <textarea
                    placeholder="Article content *"
                    value={editingEntry.Content}
                    onChange={(e) =>
                      setEditingEntry({ ...editingEntry, Content: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none font-semibold"
                    required
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



            {/*Search and all wiki articles*/}
            <div>
              {/*search for articles*/}
              <input
                type="text"
                placeholder="Search wiki articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 mb-8 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
              />
     
              {/*All the wiki articles using the component */} 
              <div className="space-y-8">
                  {loading ? (
                    <div className="text-center py-16">
                      <div className="inline-block animate-spin mb-4">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                      </div>
                      <p className="text-slate-500 italic text-lg font-bold">Loading articles...</p>
                    </div>
                    ) : filteredEntries.length === 0 ? (
                      <div className="text-center py-16 pop-content">
                        <p className="text-slate-700 text-lg font-bold p-8">No articles found</p>
                      </div>
                    ) : (
                    filteredEntries.map((entry) => (
                      <div key={entry.id} className="relative">
                      <WikiEntryCard
                          key={entry.id}
                          entry={{
                            id: entry.id, 
                            title: entry.articleName,
                            content: entry.Content,
                            date: new Date(entry.created_at).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric", 
                              year: "numeric",
                            }),
                          }}
                      />
                      {user && (
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          onClick={() => startEdit(entry)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition uppercase"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition uppercase"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    </div>
                    ))
                  )}
              </div>
            </div>
          </section>
      </main>
    </div>
  );
}
