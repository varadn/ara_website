import Image from "next/image";

interface PersonCardProps {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  projects?: string[];
  website?: string;
}

export default function PersonCard({
  name,
  title,
  description,
  imageSrc,
  imageAlt = "Photo of a person", 
  projects,
  website,
}: PersonCardProps) { 
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
            <Image
            src={imageSrc}
            alt={imageAlt}
            width={160}
            height={160} 
            className="rounded-lg object-cover"
            />
        </div>

      <div className="text-left">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 mb-2">{title}</p>
            <p className="text-gray-700">{description}</p>

            {/* Projects Section */} 
            {projects && projects.length > 0 && (
              <div className="mt-4 mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2"> 
                  Projects:
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {projects.map((project, i) => (
                    <li key={i}>{project}</li> 
                  ))}
                </ul>
              </div>
            )}

          {/*Travel to website Button*/}
          {website && (
            <a
              href={website} 
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-block mt-2 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition"
            > 
              Visit Personal Website 
            </a>
          )}
        </div>
    </div>
  );
}
