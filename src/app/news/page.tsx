"use client";

import React, { useState, useEffect } from 'react';
import NewsCard from "@/components/NewsCard";
import { News } from '@/utils/types';
import { convertDateToText } from '@/utils/convertToDateString';

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
    const [newsItems, setNewsItems] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getNews = async () => {
            try {
                const response = await fetch('/api/news'); // Replace with your API endpoint
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
                        writtenBy: item.people[0].name
                    }
                });

                setNewsItems(data)
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getNews();
    }, []);


    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <main className="flex-grow mt-24 flex flex-col items-center text-center px-6">
                <section className="w-full max-w-5xl text-center bg-white shadow-md rounded-2xl p-8 mb-16">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">ARA Lab recent News/events/activities</h1>
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
                                    writtenBy={item.writtenBy}
                                />
                        )))}
                    </div>
                </section>
            </main>
        </div>  
    )
}