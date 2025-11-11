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
    <div className="text-left border-2 border-slate-300 rounded-lg p-8 bg-white modern-card border-l-4 border-l-rose-500 shadow-md hover:shadow-lg transition comic-outline">
        <h3 className="font-black text-3xl mb-3 text-slate-900 break-words whitespace-pre-wrap tracking-tight uppercase">{entry.title}</h3>
        <p className="text-sm text-slate-500 mb-4 font-bold uppercase">{entry.date}</p>
        <p className="text-slate-700 leading-relaxed break-words whitespace-pre-wrap font-semibold">{entry.content}</p> 

    </div>
  );
}
