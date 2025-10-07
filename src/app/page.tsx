"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-10"> 
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Umass Lowell Robotics Research</h1>
          <ul className="flex space-x-6 text-sm font-medium">
          <li className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 cursor-pointer transition-colors">
            Projects 
          </li>
          <li className="hover:text-gray-600 cursor-pointer transition-colors">
            People
          </li>
          <li className="hover:text-gray-600 cursor-pointer transition-colors">
            News 
          </li>
          <li className="hover:text-gray-600 cursor-pointer transition-colors">
            Contact
          </li> 
          </ul>
        </div>
      </nav>

      {/*All the content  */}
      <main className="flex-grow mt-24 flex flex-col items-center text-center px-6">
        {/*"hero" part of page */} 
        <section className="flex flex-col items-center justify-center text-center w-full
         h-[90vh] bg-gradient-to-b from-white to-gray-100">
          <h1 className="text-7xl sm:text-8xl font-extrabold mb-6 text-gray-900 tracking-tight">
            ARA Lab 
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
            {/*First place holder*/}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-full sm:w-1/3">
              <Image
                src="/AraLabPic.jpg" /*Using these jpgs as placeholder till we get real project pics*/
                alt="Me when I put alt text: ;)"
                width={400}
                height={300}
                className="rounded-xl object-cover w-full h-auto shadow-sm"
                /> 
              </div>
              <div className="w-full sm:w-2/3">
                <h4 className="font-bold text-lg mb-2">Ethan's Lorem Ipsum Robot</h4>
                <p className="text-gray-600">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Voluptas quod fugiat non vero aut rem eos aliquid libero, 
                  atque explicabo voluptate pariatur quis inventore esse iusto aspernatur magnam ab excepturi?
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Voluptas quod fugiat non vero aut rem eos aliquid libero, 
                  atque explicabo voluptate pariatur quis inventore esse iusto aspernatur magnam ab excepturi?
                </p>
              </div>
            </div> 

            {/* Second project placeholder*/}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-full sm:w-1/3">
                <Image
                  src="/AraLabPic.jpg"
                  alt="Me when I put alt text: ;)"
                  width={400}
                  height={300}
                  className="rounded-xl object-cover w-full h-auto shadow-sm"
                />
              </div>
              <div className="w-full sm:w-2/3">
                <h4 className="font-bold text-lg mb-2">Varad's Robot that can teach me how to use Next.js</h4>
                <p className="text-gray-600">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Voluptas quod fugiat non vero aut rem eos aliquid libero, 
                  atque explicabo voluptate pariatur quis inventore esse iusto aspernatur magnam ab excepturi?
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Voluptas quod fugiat non vero aut rem eos aliquid libero, 
                  atque explicabo voluptate pariatur quis inventore esse iusto aspernatur magnam ab excepturi?
                  lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                  Voluptas cupiditate officia expedita reiciendis blanditiis! Nam distinctio alias commodi incidunt, 
                  porro sapiente consequatur ipsa vel veniam odit eveniet, odio quas molestias!
                </p>
              </div>
            </div>

            {/* Third dummy project*/}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-full sm:w-1/3">
                <Image
                  src="/AraLabPic.jpg"
                  alt="Me when I put alt text: ;)"
                  width={400} 
                  height={300}
                  className="rounded-xl object-cover w-full h-auto shadow-sm"
                />
              </div>
              <div className="w-full sm:w-2/3">
                <h4 className="font-bold text-lg mb-2">Dan the Goat</h4>
                <p className="text-gray-600">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  Voluptas quod fugiat non vero aut rem eos aliquid libero, 
                  atque explicabo voluptate pariatur quis inventore esse iusto aspernatur magnam ab excepturi?
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/*Footer for social media links eventually */}
      <footer className="w-full bg-gray-100 text-center py-6 text-sm text-gray-500">
       Put social media stuff down here *placeholder for now* 
      </footer>
    </div>
  );
}
