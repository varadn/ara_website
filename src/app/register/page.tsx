export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <main className="flex-grow mt-24 flex flex-col items-center text-center px-6">
        <section className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-10 mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Register Here
          </h1>

            <form className="flex flex-col space-y-6">
                <input
                    type="text"
                    placeholder="Your Full Name"
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input 
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                /> 
                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button
                    type="submit"
                    className="bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
                >
                Create Account
                </button>
            </form>
        </section>
      </main>
    </div>
  );
}
