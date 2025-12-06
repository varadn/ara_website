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
import { createClient } from '@/utils/supabase/client';
import { FormattedMessage } from "react-intl";
import LangSwitcher from "./LangSwitcher";


export default function Navbar() {
    const pathname = usePathname();

    const {session, user} = useAuth();

    const [currentTime, setCurrentTime] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const supabaseAuth = createClient()

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
            const { error } = await supabaseAuth.auth.signOut();

            if (error) {
                console.error('Error signing out:', error.message);
            } else {
                redirect('/');
            }
        }

    return(
    <nav className="w-full bg-white shadow-lg fixed top-0 left-0 z-50 border-b-4 border-b-blue-600" role="navigation" aria-label="Main navigation"> 
        <div className="max-w-full mx-auto px-4 sm:px-6 py-3 sm:py-4">
            {/*desktop nav I have to do 2 seperate looks because mobile looks weird with the 3rd party api weather bar*/}
            <div className="hidden lg:flex items-center w-full">
            <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group" aria-label="ARA Lab home">
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
            </div>

            <div className="flex-1 flex transform space-x-4 text-sm font-black uppercase tracking-wide" >
                <ul className="flex-1 flex justify-center space-x-4  transform translate-x-18" role="menubar" aria-label="Main menu">
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
                    <li><FormattedMessage id={route.name} /></li>
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
                    <li><FormattedMessage id={route.name} /></li>
                    </Link>
                ))}
                </ul>
            </div>

            <div className="flex-shrink-0 flex space-x-4 items-center ml-8">

            {/* Authentication Buttons */}
            {user ? (
            <button
                className="px-6 py-2 text-sm font-black bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide border-2 border-blue-800"
                onClick={handleLogout}
                aria-label="Sign out">
                <FormattedMessage id="signOut" />
            </button>
            ) : (
            <Link
                href="/login"
                className="px-6 py-2 text-sm font-black text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all uppercase tracking-wide hover:scale-105 transform"
                aria-label="Sign in">
                <FormattedMessage id="signIn" />
            </Link>
            )}

            {/* Language Switcher */}
            <LangSwitcher />
            </div>
            </div>

        {/*Mobile nav*/}
        <div className="lg:hidden">
            <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2" aria-label="ARA Lab home">
                    <Image 
                    src="/logo.png" 
                    alt="ARA Lab Logo" 
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                    />
                    <span className="text-lg font-black text-slate-900">ARA LAB</span>
                </Link>

                <div className="flex items-center space-x-3"> 
                    <LangSwitcher />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}  
                    >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                    </button>
                </div> 
            </div>

            {/*Menu dropdown for mobile :) this was the only way I could think of getting this to work on a small screen*/}
            {mobileMenuOpen && (
            <div className="mt-4 pb-4 border-t-2 border-slate-200">
                <ul className="space-y-2 mt-4">
                    {routes.map((route) => ( 
                        <li key={route.key}>
                            <Link
                                href={route.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={clsx('block px-4 py-3 rounded-lg font-bold uppercase text-sm transition-all', {
                                    'bg-blue-100 text-blue-900 border-l-4 border-blue-600': pathname === route.path,
                                    'text-slate-700 hover:bg-slate-100': pathname !== route.path,
                                })}
                            >
                                <FormattedMessage id={route.name} />
                            </Link>
                        </li>
                    ))}
                    {user && protectedRotues.map((route) => (
                        <li key={route.key}> 
                            <Link
                                href={route.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={clsx('block px-4 py-3 rounded-lg font-bold uppercase text-sm transition-all', {
                                    'bg-rose-100 text-rose-900 border-l-4 border-rose-600': pathname === route.path,
                                    'text-slate-700 hover:bg-slate-100': pathname !== route.path,
                                })}
                            >
                                <FormattedMessage id={route.name} />
                            </Link>
                        </li>
                    ))} 
                </ul>

                <div className="mt-4 pt-4 border-t border-slate-200">
                    {user ? (
                        <button
                            className="w-full px-4 py-3 text-sm font-black bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg uppercase tracking-wide"
                            onClick={handleLogout}
                        >
                            <FormattedMessage id="signOut" />
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full px-4 py-3 text-center text-sm font-black text-blue-600 border-2 border-blue-600 rounded-lg uppercase tracking-wide"
                        >
                            <FormattedMessage id="signIn" />
                        </Link>
                    )}
                </div> 
            </div>
            )} 
        </div>

        {/*weather date and time*/}
                <div className="mt-3 pt-3 border-t-2 border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-xs sm:text-sm text-slate-700 font-bold" role="region" aria-label="Current weather and time information">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        {/* Weather */}
                        {loading ? (
                            <div className="text-slate-400 font-semibold" aria-busy="true">Loading weather...</div>
                        ) : weather ? (
                        <div className="flex items-center space-x-2" aria-label={`Weather in ${weather.location}: ${weather.temp}°F, ${weather.condition}`}>
                            <span className="font-black">{weather.location}:</span>
                            <span className="font-bold" aria-label={`Temperature: ${weather.temp}°F`}>{weather.temp}°F</span>
                            <span className="text-slate-400">-</span>
                            <span className="font-semibold">{weather.condition}</span>
                        </div>
                        ) : (
                            <div className="text-slate-400">Weather unavailable!</div>
                        )}
                    </div>
                    
                    {/*date and time*/}
                    <div className="flex items-center space-x-2 sm:space-x-4" aria-label={`Current date and time: ${currentDate} at ${currentTime}`}>
                        <span className="font-bold">{currentDate}</span>
                        <span className="text-slate-400">-</span>
                        <span className="font-mono font-black">{currentTime}</span>
                    </div>
                </div>
            </div>
    </nav>
    )
}