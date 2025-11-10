import Image from "next/image";
import { convertGoogleDriveUrl } from '@/utils/helpers';

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
    <div className="modern-card bg-white flex flex-col sm:flex-row items-center sm:items-start gap-6 border-l-4 border-l-rose-500">
        <div className="flex-shrink-0 w-full sm:w-40">
            <Image
            src={convertGoogleDriveUrl(imageSrc)}
            alt={imageAlt}
            width={160}
            height={160} 
            className="rounded-lg object-cover w-full h-40 sm:w-40 sm:h-40"
            />
        </div>

      <div className="text-left flex-1">
        <h2 className="text-2xl font-bold text-slate-900">{name}</h2>
        <p className="text-base text-blue-600 font-semibold mb-3">{title}</p>
        <p className="text-slate-700 mb-4 leading-relaxed">{description}</p>

        {/* Projects Section */} 
        {projects && projects.length > 0 && (
          <div className="mb-4 bg-slate-50 p-3 rounded-lg">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Projects:
            </h3>
            <ul className="text-slate-700 text-sm space-y-1">
              {projects.map((project, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                  {project}
                </li> 
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
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          > 
            Visit Website 
          </a>
        )}
      </div>
    </div>
  );
}
