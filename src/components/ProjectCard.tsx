import Image from "next/image";
import { convertGoogleDriveUrl } from "@/utils/helpers";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string; 
  imageAlt?: string;
  isEditing?: boolean;
  handlEdit?: () => void;
  handleDelete?: () => void;
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt = "Image of a project",
  isEditing,
  handlEdit,
  handleDelete,
}: ProjectCardProps) {
  return (
    <div className="modern-card bg-white relative flex flex-col sm:flex-row items-center sm:items-start gap-6 border-l-4 border-l-blue-600 card-lift w-full" role="article" aria-label={`Project: ${title}`}>
        <div className="flex-shrink-0 w-full sm:w-1/3 relative">
            <div className="absolute -inset-3 bg-black opacity-20 rounded-lg blur-md"></div>
            <Image
            src={convertGoogleDriveUrl(imageSrc)} 
            alt={imageAlt}
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-48 sm:h-40 relative z-10 border-4 border-slate-900"
            />
        </div> 

      <div className="w-full sm:w-3/5 text-left">
        <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight uppercase" id={`project-${title}`}>
          {title}
        </h3>
        <div className="h-1 w-20 bg-rose-500 rounded-full mb-6"></div>
        <p className="text-slate-700 leading-relaxed font-medium">{description}</p>
      </div>

      {/* Edit and Delete Buttons */}
      {isEditing && (
        <div className="absolute right-4 bottom-4 flex space-x-2 z-20" role="toolbar" aria-label={`Edit or delete ${title}`}>
          <button 
            onClick={handlEdit}
            className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
            aria-label={`Edit ${title}`}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
            aria-label={`Delete ${title}`}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
