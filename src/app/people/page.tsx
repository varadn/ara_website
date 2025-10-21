import Image from "next/image";

import PersonCard from "@/components/PersonCard";

const people = [
  {
    name: "Ethan Kittell",
    title: "The boss",

    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A eaque fugit similique. Unde iste quam perferendis natus vel soluta sapiente facere ratione cum expedita, consectetur, magnam eos excepturi deleniti quis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus illum officia commodi aspernatur ipsam consequatur fuga, ex maxime magni dolore quas dolorum, hic voluptatibus pariatur perferendis. Facere a sequi ad?",
    imageSrc: "/me.jpg",
    imageAlt: "Ethan Kittell portrait",
  },
  {
    name: "Varad",
    title: "Grad research person",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi at facere pariatur necessitatibus, inventore odit aliquam dignissimos consequatur veritatis beatae magnam enim amet neque, asperiores esse nam cum et dolores.",
    imageSrc: "/anotherPic.jpg",
    imageAlt: "Varad portrait",
  },
  {
    name: "Dan",
    title: "The goat engineer", 
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque numquam corporis nisi minima fuga quisquam quo possimus et nulla nemo error nihil voluptates, excepturi placeat obcaecati nesciunt sunt similique enim?",
    imageSrc: "/rageBait.jpg",
    imageAlt: "Dan portrait",
  },
];

export default function People() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <main className="flex-grow mt-24 flex flex-col items-center text-center px-6">
                <section className="w-full max-w-5xl text-center bg-white shadow-md rounded-2xl p-8 mb-16">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">ARA Lab People</h1>

                    <div className="space-y-10">
                        {people.map((person, index) => (
                        <PersonCard 
                            key={index}
                            name={person.name} 
                            title={person.title}
                            description={person.description}
                            imageSrc={person.imageSrc}
                            imageAlt={person.imageAlt} 
                        />
                        ))}
                    </div>
                </section>
            </main>
        </div>  
    )
}