export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <main className="flex-grow mt-32 flex flex-col items-center text-center px-6 pb-20">
                <section className="w-full max-w-2xl">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-5xl sm:text-6xl font-black mb-4 text-slate-900">
                            Get In Touch
                        </h1>
                        <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-rose-500 rounded-full mx-auto"></div>
                        <p className="text-lg text-slate-600 mt-4">
                            We'd love to hear from you!
                        </p>
                    </div>

                    {/* Contact Form */}
                    <form className="modern-card bg-white border-l-4 border-l-blue-600">
                        <div className="space-y-5">
                            {/*Inputs for the first and last name of person who wants to contact the ARA lab*/}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    type="text" 
                                    placeholder="First Name"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name" 
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                                />
                            </div>

                            {/*Contacting person's email*/}
                            <input
                            type="email"
                            placeholder="Your Email Address"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                            />

                            {/*Contact message*/}
                            <textarea
                            placeholder="Tell us what's on your mind..."
                            rows={6} 
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white resize-none transition-all"
                            ></textarea>
                        </div>

                        {/*Button to submit the form*/}
                        <button
                        type="submit"
                        className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                        >
                        Send Message
                        </button> 
                    </form>
                </section>
            </main>
        </div>  
    )
}