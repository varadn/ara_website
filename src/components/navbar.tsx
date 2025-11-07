'use client'
import { routes } from "./routes"
import Link from 'next/link';
import { usePathname } from "next/navigation";
import clsx from 'clsx'
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase/supabaseClient";
import { redirect } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname();

    const {session, user} = useAuth();

    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault()
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Error signing out:', error.message);
            } else {
                redirect('/');
            }
        }

    return(
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-10"> 
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700">Umass Lowell Robotics Research</h1>
            <ul className="flex space-x-6 text-sm font-medium">
                {routes.map((route) => (
                    <Link
                      key={route.key}
                      href={route.path}
                      className={clsx('text-gray-500 hover:text-gray-900 cursor-pointer transition-colors', {
                        'bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 text-gray-900': pathname === route.path,
                      })}
                    >
                        <li>{route.name}</li>
                    </Link>
                ))}
            </ul>  
            {/*All the authentication buttons we need*/}
            <div className="flex space-x-3">
            {user ? (
                <button
                className="px-4 py-2 text-sm font-semibold bg-gray-800 text-white border border-gray-300 rounded-md hover:bg-gray-700 transition"
                onClick={handleLogout}>
                    Sign out
                </button>
            ) : (
                <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                    Login
                </Link>
            )}
            
            </div>
        </div>
    </nav>
    )
}