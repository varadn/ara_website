import Image from "next/image";

import PersonCard from "@/components/PersonCard";

const currentLabMembers = [
  {
    name: "Ethan Kittell",
    title: "The boss",

    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A eaque fugit similique. Unde iste quam perferendis natus vel soluta sapiente facere ratione cum expedita, consectetur, magnam eos excepturi deleniti quis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus illum officia commodi aspernatur ipsam consequatur fuga, ex maxime magni dolore quas dolorum, hic voluptatibus pariatur perferendis. Facere a sequi ad?",
    imageSrc: "/me.jpg",
    imageAlt: "Ethan Kittell portrait",
    projects: ["Robot project #1", "Some other robot project type stuff lol"],
    website: "https://ethankittell.com",
  },
  {
    name: "Varad",
    title: "Grad research person",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi at facere pariatur necessitatibus, inventore odit aliquam dignissimos consequatur veritatis beatae magnam enim amet neque, asperiores esse nam cum et dolores.",
    imageSrc: "/anotherPic.jpg",
    imageAlt: "Varad portrait",
    projects: ["ARA Lab stuff"], 
  },
  {
    name: "Dan",
    title: "The goat engineer", 
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque numquam corporis nisi minima fuga quisquam quo possimus et nulla nemo error nihil voluptates, excepturi placeat obcaecati nesciunt sunt similique enim?",
    imageSrc: "/rageBait.jpg",
    imageAlt: "Dan portrait",
    projects: ["This website"],
    website: "https://danIsTheGOAT.com",
  },
];

const alumni = [
  {
    name: "Ryhan", 
    title: "Grad from Umass lowell",
    description: 
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imageSrc: "/something.jpg", 
    imageAlt: "Ryhan protrait", 
    projects: ["First ARA robot"], 
    website: "https://google.com",
  },
  {
    name: "Xander",
    title: "Alum from Umass Lowell", 
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imageSrc: "/blahblahblahgfiuheiohfuihwihuowaweiawe.jpg",
    imageAlt: "Xander protrait",
    projects: ["First ARA robot"], 
  },
];

export default function People() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <main className="flex-grow mt-24 flex flex-col items-center text-center px-6">
                <section className="w-full max-w-5xl text-center bg-white shadow-md rounded-2xl p-8 mb-16">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">
                      ARA Lab People
                    </h1>

                    {/*All current members*/}
                    <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                      Current Lab Members
                    </h2>
                      <div className="space-y-10"> 
                          {currentLabMembers.map((person, index) => (
                          <PersonCard 
                              key={index} 
                              name={person.name} 
                              title={person.title} 
                              description={person.description}
                              imageSrc={person.imageSrc}
                              imageAlt={person.imageAlt}
                              projects={person.projects}
                              website={person.website}  
                          />
                          ))}
                      </div>
                    </div>


                    {/*All alumni members*/}
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                        Alumni Lab Members
                      </h2>
                          <div className="space-y-10"> 
                            {alumni.map((person, index) => (
                              <PersonCard 
                                key={index}
                                name={person.name}  
                                title={person.title}
                                description={person.description}
                                imageSrc={person.imageSrc} 
                                imageAlt={person.imageAlt} 
                                projects={person.projects}
                                website={person.website} 
                              />
                            ))}
                          </div>
                    </div>
                </section>
            </main>
        </div>  
    )
}