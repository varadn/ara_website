"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { WikiEntry } from "@/utils/types";
import WikiEntryCard from "@/components/WikiArticleCard";
import { useAuth } from "@/contexts/AuthContext";
import { notFound } from 'next/navigation'

export default function WikiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState<WikiEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });

  const {session, user} = useAuth();

  if (!user || !session) {
        notFound();
  }
    
  //getting wiki article from supabase
  useEffect(() => {
    const fetchEntries = async () => {
    setLoading(true); 
    const { data, error } = await supabase
      .from("wikiArticles")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error("Error loading wiki articles:", error);
    else setEntries(data || []);

    setLoading(false);
    };

    fetchEntries();
  }, []);

  //adds a new entry/article to supabase
  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const { data, error } = await supabase
      .from("wikiArticles")
      .insert([{ articleName: newEntry.title, Content: newEntry.content }])
      .select();

    if (error) {
      console.error("Error adding wiki article:", error);
      return; 
    }

    setEntries([...(data ?? []), ...entries]);
    setNewEntry({ title: "", content: "" });
  };

  const filteredEntries = entries.filter((entry) =>
    entry.articleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <main className="flex-grow mt-48 flex flex-col items-center px-6 pb-20">
          <section className="w-full max-w-5xl">
            {/* Header Section */}
            <div className="mb-20">
              <h1 className="text-6xl sm:text-7xl font-black mb-6 text-slate-900 tracking-tight uppercase"> 
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
            {user && (
              <form
                onSubmit={handleAddEntry} 
                className="w-full modern-card bg-white mb-16 border-l-4 border-l-blue-600 comic-outline"
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
                    ))
                  )}
              </div>
            </div>
          </section>
      </main>
    </div>
  );
}
