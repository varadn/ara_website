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
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50"> 
        <div className="max-w-full mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <Image 
                    src="/logo.png" 
                    alt="ARA Lab Logo"
                    width={50}
                    height={50}
                    className="h-12 w-auto"
                />
                <h1 className="text-2xl font-bold text-slate-900">UMass Lowell Robotics</h1>
            </Link>
            <ul className="flex space-x-6 text-sm font-medium">
                {routes
                    .map((route) => (
                        <Link
                        key={route.key}
                        href={route.path}
                        className={clsx('text-slate-600 hover:text-slate-900 cursor-pointer transition-colors', {
                            'bg-blue-100 px-3 py-1 rounded-md hover:bg-blue-200 text-blue-900': pathname === route.path,
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
                        className={clsx('text-slate-600 hover:text-slate-900 cursor-pointer transition-colors', {
                            'bg-blue-100 px-3 py-1 rounded-md hover:bg-blue-200 text-blue-900': pathname === route.path,
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
                    className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                    onClick={handleLogout}>
                        Sign out
                    </button>
                ) : (
                    <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-semibold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition">
                        Login
                    </Link>
                )}
            
            </div>
        </div>

        {/*weather date and time*/}
                <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between items-center text-sm text-slate-600">
                    <div className="flex items-center space-x-6">
                        {/* Weather */}
                        {loading ? (
                            <div className="text-slate-400">Loading weather...</div>
                        ) : weather ? (
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">{weather.location}:</span>
                            <span>{weather.temp}°F</span>
                            <span className="text-slate-400">-</span>
                            <span>{weather.condition}</span>
                        </div>
                        ) : (
                            <div className="text-slate-400">Weather unavailable!</div>
                        )}
                    </div>
                    
                    {/*date and time*/}
                    <div className="flex items-center space-x-4">
                        <span>{currentDate}</span>
                        <span className="text-slate-400">-</span>
                        <span className="font-mono font-medium">{currentTime}</span>
                    </div>
                </div>
            </div>
    </nav>
    )
}