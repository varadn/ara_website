"use client";

import React, { useState, useEffect } from 'react';
import NewsCard from "@/components/NewsCard";
import { News } from '@/utils/types';

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
];

export default function NewsPage() {




    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <main className="flex-grow mt-24 flex flex-col items-center text-center px-6">
                <section className="w-full max-w-5xl text-center bg-white shadow-md rounded-2xl p-8 mb-16">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">ARA Lab recent News/events/activities</h1>
                    <div className="space-y-10">
                        {newsItems.map((item, index) => (
                        <NewsCard 
                            key={index}
                            title={item.title}
                            date={item.date}
                            description={item.description}
                            imageSrc={item.imageSrc} 
                            imageAlt={item.imageAlt}
                        />
                        ))}
                    </div>
                </section>
            </main>
        </div>  
    )
}