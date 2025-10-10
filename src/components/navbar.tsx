'use client'
import { routes } from "./routes"
import Link from 'next/link';
import { usePathname } from "next/navigation";
import clsx from 'clsx'

export default function Navbar() {
    const pathname = usePathname();

    return(
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-10"> 
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700">Umass Lowell Robotics Research</h1>
            <ul className="flex space-x-6 text-sm font-medium">
                {routes.map((route) => (
                    <Link
                      key={route.key}
                      href={route.path}
                      className={clsx('hover:text-gray-600 cursor-pointer transition-colors', {
                        'bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300': pathname === route.path,
                      })}
                    >
                        <li>{route.name}</li>
                    </Link>
                ))}
            </ul>   
        </div>
    </nav>
    )
}