import React from "react";

interface WikiEntry {
  id: number;
  title: string;
  content: string; 
  date: string; 
}

interface WikiEntryCardProps { 
  entry: WikiEntry;
}

export default function WikiEntryCard({ entry }: WikiEntryCardProps) {
  return ( 
    <div className="text-left border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition">
        <h3 className="font-bold text-lg mb-1 text-gray-900 break-words whitespace-pre-wrap">{entry.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{entry.date}</p>
        <p className="text-gray-700 leading-relaxed break-words whitespace-pre-wrap">{entry.content}</p> 

    </div>
  );
}
