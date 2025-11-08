export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
            <main className="flex-grow mt-32 flex flex-col items-center text-center px-6">
                <section className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-10 mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">
                        Contact Us
                    </h1>
                    <form className="flex flex-col space-y-6">
                        {/*Inputs for the first and last name of person who wants to contact the ARA lab*/}
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            <input
                                type="text" 
                                placeholder="First Name"
                                className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            <input
                                type="text"
                                placeholder="Last Name" 
                                className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            </div>

                        {/*Contacting person's email*/}
                        <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />

                        {/*Contact message*/}
                        <textarea
                        placeholder="Put your message here :D"
                        rows={5} 
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                        ></textarea>

                        {/*Button to submit the form*/}
                        <button
                        type="submit"
                        className="bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-blue-500 transition-colors"
                        >Submit
                        </button> 
                    </form>
                </section>
            </main>
        </div>  
    )
}