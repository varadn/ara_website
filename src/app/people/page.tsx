import Image from "next/image";

export default function People() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <main className="flex-grow mt-24 flex flex-col items-center text-center px-6">
                <section className="w-full max-w-5xl text-center bg-white shadow-md rounded-2xl p-8 mb-16">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">ARA Lab People</h1>

                    <div className="space-y-10">
                    {/*Placeholder guy*/} 
                    <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-100 rounded-xl p-6 shadow-sm">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6"> 
                        <Image
                        src="/me.jpg" 
                        alt="placeholder text be like"
                        width={160} 
                        height={160}
                        className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="text-left">
                        <h2 className="text-xl font-semibold text-gray-800">Ethan Kittell</h2>
                        <p className="text-sm text-gray-600 mb-2">The boss</p>
                        <p className="text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. A eaque fugit similique.
                        Unde iste quam perferendis natus vel soluta sapiente facere ratione cum expedita, consectetur, magnam eos excepturi deleniti quis!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus illum officia commodi aspernatur ipsam consequatur 
                        fuga, ex maxime magni dolore quas dolorum, hic voluptatibus pariatur perferendis. Facere a sequi ad?
                        </p>
                    </div>
                    </div>

                    {/*Another placeholder guy*/}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-100 rounded-xl p-6 shadow-sm">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                        <Image
                        src="/anotherPic.jpg"
                        alt="fr alt text"
                        width={160}
                        height={160}
                        className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="text-left">
                        <h2 className="text-xl font-semibold text-gray-800">Varad</h2>
                        <p className="text-sm text-gray-600 mb-2">Grad research person</p>
                        <p className="text-gray-700">
                        lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quasi at facere pariatur necessitatibus, inventore odit aliquam dignissimos consequatur 
                        veritatis beatae magnam enim amet neque, asperiores esse nam cum et dolores.
                        </p>
                    </div>
                    </div>

                    {/*Another placeholder*/}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-100 rounded-xl p-6 shadow-sm">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                        <Image
                        src="/rageBait.jpg" 
                        alt="this is someAlt text"
                        width={160} 
                        height={160}
                        className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="text-left">
                        <h2 className="text-xl font-semibold text-gray-800">Dan</h2>
                        <p className="text-sm text-gray-600 mb-2">The goat engineer</p> 
                        <p className="text-gray-700">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque numquam corporis nisi minima 
                        fuga quisquam quo possimus et nulla nemo error nihil voluptates, excepturi placeat obcaecati nesciunt sunt similique enim?
                        veritatis beatae magnam enim amet neque, asperiores esse nam cum et dolores. 
                        </p>
                    </div>
                    </div>
                </div>
                </section>
            </main>
        </div>  
    )
}