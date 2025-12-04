import Image from "next/image";
import { convertGoogleDriveUrl } from '@/utils/helpers';
import Link from "next/link";
import { Project } from "@/utils/types";

interface PersonCardProps {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  projects?: Project[];
  website?: string;
  isEditing?: boolean;
  handlEdit?: () => void;
  handleDelete?: () => void;
}

export default function PersonCard({
  name,
  title,
  description,
  imageSrc,
  imageAlt = "Photo of a person", 
  projects,
  website,
  isEditing,
  handlEdit,
  handleDelete,
}: PersonCardProps) { 
  return (
    <div className="modern-card bg-white flex flex-col sm:flex-row items-center sm:items-start gap-6 border-l-4 border-l-rose-500 card-lift">
        <div className="flex-shrink-0 w-full sm:w-40 relative">
            <div className="absolute -inset-3 bg-black opacity-20 rounded-lg blur-md"></div>
            <Image
            src={convertGoogleDriveUrl(imageSrc)}
            alt={imageAlt}
            width={160}
            height={160} 
            className="rounded-lg object-cover w-full h-40 sm:w-40 sm:h-40 relative z-10 border-4 border-slate-900"
            />
        </div>

      <div className="text-left flex-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{name}</h2>
        <p className="text-base font-black text-rose-600 mb-4 uppercase tracking-wide">{title}</p>
        <p className="text-slate-700 mb-4 leading-relaxed font-medium">{description}</p>

        {/* Projects Section */} 
        {projects && projects.length > 0 && (
          <div className="mb-4 bg-slate-100 p-4 rounded-lg border-2 border-slate-300">
            <h3 className="text-sm font-black text-slate-900 mb-3 uppercase">
              Projects
            </h3>
            <ul className="text-slate-700 text-sm space-y-2">
              {projects.map((project, i) => (
                <li key={i} className="flex items-center font-semibold">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  <Link href={`/projects#${project.id}`}>{project.title}</Link>
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
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 font-black rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide text-sm !text-white"
          > 
            Visit Website 
          </a>
        )}

      {/* Edit and Delete Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-2">
          <button 
          onClick={handlEdit}
          className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Edit Person?
          </button> 
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Delete Person?
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
