import Image from "next/image";
import ProjectCard from "@/components/ProjectCard"

const projects = [
  {
    title: "Ethan's Lorem Ipsum Robot", 
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quod fugiat non vero aut rem eos aliquid libero, atque explicabo voluptate pariatur quis inventore esse iusto aspernatur magnam ab excepturi?",
    imageSrc: "/AraLabPic.jpg", 
    imageAlt: "Ethan's robot project",
  },

  {
    title: "Varad's robot that can teach me how to use Next.js",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quod fugiat non vero aut rem eos aliquid libero, atque explicabo voluptate pariatur quis inventore esse iusto aspernatur magnam ab excepturi? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas facere totam, itaque officiis, dolorum reprehenderit ab doloribus, sunt ullam accusantium sit.",
    imageSrc: "/AraLabPic.jpg",
    imageAlt: "Varad's robot project",
  },
  {
    title: "Dan the Goat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quod fugiat non vero aut rem eos aliquid libero, atque explicabo voluptate pariatur quis inventore esse iusto aspernatur magnam ab excepturi?",
    imageSrc: "/AraLabPic.jpg",
    imageAlt: "Dan's project robot", 
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/*All the content  */}
      <main className="flex-grow mt-24 flex flex-col items-center text-center px-6">
        {/*"hero" part of page */} 
        <section className="flex flex-col items-center justify-center text-center w-full
         h-[90vh] bg-gradient-to-b from-white to-gray-100">
          <h1 className="text-7xl sm:text-8xl font-extrabold mb-6 text-gray-900 tracking-tight">
            ARA Lab Home
          </h1>
        <p className="text-2xl sm:text-3xl text-gray-600 max-w-2xl">
          Assistive Robots & Accessibility 
        </p>
      </section> 

        {/*Section for showing off projects on mainpage*/}
        <section className="w-full max-w-5xl text-left bg-white shadow-md rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
            Projects
          </h3>

           <div className="space-y-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title} 
                description={project.description}
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}