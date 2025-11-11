'use client'
import { routes, protectedRotues } from "./routes"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import clsx from 'clsx'
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase/supabaseClient";
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react';
import { WeatherData } from '@/utils/types';
import { weatherCodes } from "@/utils/weatherCodes";


export default function Navbar() {
    const pathname = usePathname();

    const {session, user} = useAuth();

    const [currentTime, setCurrentTime] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    //Update time every second
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
            }));
            setCurrentDate(now.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
            }));
        };
        
        updateTime();
        const interval = setInterval(updateTime, 1000);
        
        return () => clearInterval(interval);
    }, []);

    //Fetch weather data
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                //Using Open-Meteo API (free no API key needed)
                //Coordinates for Lowell
                const lat = 42.6334;
                const lon = -71.3162;
                
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/New_York`
                );
                
                const data = await response.json();
                
                setWeather({
                    temp: Math.round(data.current.temperature_2m),
                    condition: weatherCodes[data.current.weather_code] || 'Unknown',
                    location: 'Lowell, MA'
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather:', error);
                setLoading(false);
            }
        };

        fetchWeather();
        //refreshing weather
        const interval = setInterval(fetchWeather, 600000);
        
        return () => clearInterval(interval);
    }, []);

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
    <nav className="w-full bg-white shadow-lg fixed top-0 left-0 z-50 border-b-4 border-b-blue-600"> 
        <div className="max-w-full mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
                <Image 
                    src="/logo.png" 
                    alt="ARA Lab Logo"
                    width={50}
                    height={50}
                    className="h-12 w-auto group-hover:scale-110 transition-transform"
                />
                <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                    {/* ARA LAB */}
                    </h1>
            </Link>
            <ul className="flex space-x-6 text-sm font-black uppercase tracking-wide">
                {routes
                    .map((route) => (
                        <Link
                        key={route.key}
                        href={route.path}
                        className={clsx('px-4 py-2 rounded-lg transition-all transform hover:scale-105', {
                            'bg-blue-100 text-blue-900 border-2 border-blue-600': pathname === route.path,
                            'text-slate-700 hover:bg-slate-100': pathname !== route.path,
                        })}
                        >
                            <li>{route.name}</li>
                        </Link>
                    ))}
                {user && 
                protectedRotues
                    .map((route) => (
                        <Link
                        key={route.key}
                        href={route.path}
                        className={clsx('px-4 py-2 rounded-lg transition-all transform hover:scale-105', {
                            'bg-rose-100 text-rose-900 border-2 border-rose-600': pathname === route.path,
                            'text-slate-700 hover:bg-slate-100': pathname !== route.path,
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
                    className="px-6 py-2 text-sm font-black bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide border-2 border-blue-800"
                    onClick={handleLogout}>
                        Sign out
                    </button>
                ) : (
                    <Link
                    href="/login"
                    className="px-6 py-2 text-sm font-black text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all uppercase tracking-wide hover:scale-105 transform">
                        Login
                    </Link>
                )}
            
            </div>
        </div>

        {/*weather date and time*/}
                <div className="mt-3 pt-3 border-t-2 border-slate-300 flex justify-between items-center text-sm text-slate-700 font-bold">
                    <div className="flex items-center space-x-6">
                        {/* Weather */}
                        {loading ? (
                            <div className="text-slate-400 font-semibold">Loading weather...</div>
                        ) : weather ? (
                        <div className="flex items-center space-x-2">
                            <span className="font-black">{weather.location}:</span>
                            <span className="font-bold">{weather.temp}°F</span>
                            <span className="text-slate-400">-</span>
                            <span className="font-semibold">{weather.condition}</span>
                        </div>
                        ) : (
                            <div className="text-slate-400">Weather unavailable!</div>
                        )}
                    </div>
                    
                    {/*date and time*/}
                    <div className="flex items-center space-x-4">
                        <span className="font-bold">{currentDate}</span>
                        <span className="text-slate-400">-</span>
                        <span className="font-mono font-black">{currentTime}</span>
                    </div>
                </div>
            </div>
    </nav>
    )
}