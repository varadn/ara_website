"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { WikiEntry } from "@/utils/types";
import WikiEntryCard from "@/components/WikiArticleCard";

export default function WikiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState<WikiEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });
    
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
    
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <main className="flex-grow mt-40 flex flex-col items-center text-center px-6">
          <section className="w-full max-w-5xl text-center bg-white shadow-md rounded-2xl p-8 mb-16">
            <h1 className="text-3xl font-bold mb-8 text-gray-800"> 
              ARA Lab Wiki
            </h1>

            {/*search for articles*/}
            <input
              type="text"
              placeholder="Search wiki articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-2xl px-4 py-2 mb-10 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/*Entry for an article*/}
            
            <form
              onSubmit={handleAddEntry} 
              className="w-full max-w-2xl mx-auto text-left bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm"
            > 
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Append new wiki article
              </h2>


              <input 
                type="text"
                placeholder="Article title"
                value={newEntry.title}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, title: e.target.value })
                }
                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
              />
                <textarea
                  placeholder="Wiki article content"
                  value={newEntry.content}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, content: e.target.value })
                  }
                  className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="submit" 
                  className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-blue-500 transition"
                >
                Add Entry
              </button>
            </form>
 
              {/*All the wiki articles using the component */} 
              <div className="space-y-10">
                  {loading ? (
                    <p className="text-gray-500 italic">Loading articles...</p>
                    ) : filteredEntries.length === 0 ? (
                      <p className="text-gray-500 italic">No articles found.</p>
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
            </section>
      </main>
    </div>
  );
}
