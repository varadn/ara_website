export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <main className="flex-grow mt-48 flex flex-col items-center text-center px-6 pb-20">
                <section className="w-full max-w-2xl">
                    {/* Header */}
                    <div className="mb-16">
                        <h1 className="text-6xl sm:text-7xl font-black mb-6 text-slate-900 tracking-tight uppercase">
                            Get In Touch
                        </h1>
                        <div className="flex gap-3 mb-6 justify-center">
                            <div className="h-3 w-40 bg-blue-600 rounded-full"></div>
                            <div className="h-3 w-20 bg-rose-500 rounded-full"></div>
                        </div>
                        <p className="text-xl text-slate-600 font-bold">
                            We'd love to hear from you!
                        </p>
                    </div>

                    {/* Contact Form */}
                    <form className="modern-card bg-white border-l-4 border-l-blue-600 comic-outline">
                        <div className="space-y-5">
                            {/*Inputs for the first and last name of person who wants to contact the ARA lab*/}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    type="text" 
                                    placeholder="First Name"
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name" 
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />
                            </div>

                            {/*Contacting person's email*/}
                            <input
                            type="email"
                            placeholder="Your Email Address"
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                            />

                            {/*Contact message*/}
                            <textarea
                            placeholder="Tell us what's on your mind..."
                            rows={6} 
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none font-medium"
                            ></textarea>
                        </div>

                        {/*Button to submit the form*/}
                        <button
                        type="submit"
                        className="mt-8 w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide text-lg"
                        >
                        Send Message
                        </button> 
                    </form>
                </section>
            </main>
        </div>  
    )
}