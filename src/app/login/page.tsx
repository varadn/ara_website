"use client";
import React, {useState} from 'react';
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/client';
import { FormattedMessage } from "react-intl";

export default function LoginPage() {
    const [loginInfo, setLoginInfo] = useState({email: "", password: ""})
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const supabaseAuth = createClient();

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
          }))
    };

    const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setLoading(true);

        const { data, error } = await supabaseAuth.auth.signInWithPassword(loginInfo)

        if (error) {
            switch(error.code){
                case "invalid_credentials": {
                    setErrorMsg("Invalid email or password.");
                    break;
                }
                case "validation_failed": {
                    setErrorMsg("Please enter an email and password.");
                    break;
                }
                default: {
                    setErrorMsg("Something went wrong while trying to sign-in. Please try again later.");
                    break;
                }
                    
            }
            setLoading(false);
        }
        else if (data) {
            setLoading(false);
            redirect('/')
        }
    }

    return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <main className="flex-grow mt-48 flex flex-col items-center text-center px-6 pb-20">
        <section className="w-full max-w-2xl">
            <div className="bg-white shadow-lg rounded-2xl p-10 mb-16 modern-card border-l-4 border-l-blue-600 comic-outline">
                <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tight uppercase">
                <FormattedMessage id="login" />
                </h1>
                <div className="flex gap-3 mb-8 justify-center">
                  <div className="h-3 w-40 bg-blue-600 rounded-full"></div>
                  <div className="h-3 w-20 bg-rose-500 rounded-full"></div>
                </div>

                <form className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                        <label 
                            htmlFor="email" 
                            className="text-gray-700 font-semibold text-left"
                        >
                            <FormattedMessage id="email" />
                        </label>
                        <input 
                            type="email"
                            id="email" 
                            name="email"
                            onChange={handleInput}
                            className="border-2 border-slate-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label 
                            htmlFor="password" 
                            className="text-gray-700 font-semibold text-left"
                        >
                            <FormattedMessage id="password" />
                        </label>
                        <input
                            type="password"
                            id="password" 
                            name="password"
                            onChange={handleInput}
                            className="border-2 border-slate-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-black enabled:hover:shadow-lg enabled:hover:from-blue-700 enabled:hover:to-blue-800 enabled:transition-all disabled:opacity-50 disabled:text-slate-400 uppercase tracking-wide text-lg" 
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? <FormattedMessage id="login.wait" /> : <FormattedMessage id="login" />}
                    </button>

                    {errorMsg.length !== 0 && 
                        <p className="text-red-600 font-bold text-lg">{errorMsg}</p>}
                    </form>
            </div>
        </section>
        </main>
    </div>
    );
}
