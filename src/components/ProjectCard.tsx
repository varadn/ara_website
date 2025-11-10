import Image from "next/image";
import { convertGoogleDriveUrl } from "@/utils/helpers";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string; 
  imageAlt?: string;
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt = "Image of a project",
}: ProjectCardProps) {
  return (
    <div className="modern-card bg-white flex flex-col sm:flex-row items-center sm:items-start gap-8 border-l-4 border-l-blue-600">
        <div className="w-full sm:w-2/5">
            <Image
            src={convertGoogleDriveUrl(imageSrc)} 
            alt={imageAlt}
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-64 sm:h-56"
            />
        </div> 

      <div className="w-full sm:w-3/5 text-left">
        <h3 className="font-black text-3xl text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-700 leading-relaxed text-base">{description}</p>
      </div>
    </div>
  );
}
