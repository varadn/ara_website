"use client";
import React, {useState} from 'react';
import { supabase } from '@/utils/supabase/supabaseClient';
import { redirect } from 'next/navigation'

export default function LoginPage() {
    const [loginInfo, setLoginInfo] = useState({email: "", password: ""})
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)

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

        const { data, error } = await supabase.auth.signInWithPassword(loginInfo)

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
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        <main className="flex-grow mt-40 flex flex-col items-center text-center px-6">
        <section className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-10 mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Login
            </h1>

            <form className="flex flex-col space-y-6">
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleInput}
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInput}
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button
                    type="submit"
                    className="bg-gray-800 text-white py-3 rounded-md font-medium enabled:hover:bg-blue-500 enabled:transition-colors disabled:opacity-50 disabled:text-neutral-500" 
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Signing in, please wait..." : "Sign in"}
                </button>
                {errorMsg.length !== 0 && 
                  <p className="text-red-700">{errorMsg}</p>}
            </form>
        </section>
        </main>
    </div>
    );
}
