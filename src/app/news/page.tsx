import Image from "next/image";

export default function News() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <main className="flex-grow mt-24 flex flex-col items-center text-center px-6">
                <section className="w-full max-w-5xl text-center bg-white shadow-md rounded-2xl p-8 mb-16">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">ARA Lab recent News/events/activities</h1>
                    <div className="space-y-10">
                        {/*news*/}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-100 rounded-xl p-6 shadow-sm">
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                            <Image
                            src="/placeholder.jpg" 
                            alt="Some robotics project news" 
                            width={300}
                            height={200}
                            className="rounded-lg object-cover"
                            />
                        </div>
                        <div className="text-left">
                            <h2 className="text-xl font-semibold text-gray-800 mb-1"> 
                            ARA Lab open house!
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                            October 11, 2025 — Somewhere on Umass Lowell
                            </p>
                            <p className="text-gray-700">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure consequuntur minus
                            fugit alias at sunt beatae! Commodi, placeat suscipit alias hic aliquam ducimus deserunt, porro eum asperiores, inventore sint maxime.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dolorem pariatur consequuntur ad nam eveniet, 
                            facere quidem placeat asperiores magnam ullam error odit non explicabo recusandae? Neque porro dicta praesentium.
                            </p>
                        </div>
                        </div>

                        {/*some news #2*/}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-100 rounded-xl p-6 shadow-sm">
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                            <Image
                            src="/placeholder.jpg"
                            alt="some more news image"
                            width={300}
                            height={200}
                            className="rounded-lg object-cover"
                            /> 
                        </div>
                        <div className="text-left">
                            <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            New Robotics Project!
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                            October 11, 2025 — Somewhere on Umass Lowell
                            </p>
                            <p className="text-gray-700">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure consequuntur minus
                            fugit alias at sunt beatae! Commodi, placeat suscipit alias hic aliquam ducimus deserunt, porro eum asperiores, inventore sint maxime.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dolorem pariatur consequuntur ad nam eveniet, 
                            facere quidem placeat asperiores magnam ullam error odit non explicabo recusandae? Neque porro dicta praesentium.
                            </p>
                        </div>
                        </div>

                        {/*some news #3*/}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-100 rounded-xl p-6 shadow-sm">
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                            <Image 
                            src="/placeholder.jpg"
                            alt="Another news image"
                            width={300}
                            height={200}
                            className="rounded-lg object-cover"
                            />
                        </div>
                        <div className="text-left">
                            <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            Some other event
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                            October 11, 2025 — Somewhere on Umass Lowell 
                            </p>
                            <p className="text-gray-700">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure consequuntur minus
                            fugit alias at sunt beatae! Commodi, placeat suscipit alias hic aliquam ducimus deserunt, porro eum asperiores, inventore sint maxime.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, dolorem pariatur consequuntur ad nam eveniet, 
                            facere quidem placeat asperiores magnam ullam error odit non explicabo recusandae? Neque porro dicta praesentium.
                            </p>
                        </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>  
    )
}