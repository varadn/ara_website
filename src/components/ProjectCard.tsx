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
    <div className="modern-card bg-white flex flex-col sm:flex-row items-center sm:items-start gap-8 border-l-4 border-l-blue-600 card-lift">
        <div className="w-full sm:w-2/5 relative">
            <div className="absolute -inset-2 bg-black opacity-20 rounded-xl blur-md"></div>
            <Image
            src={convertGoogleDriveUrl(imageSrc)} 
            alt={imageAlt}
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-64 sm:h-56 relative z-10 border-4 border-slate-900"
            />
        </div> 

      <div className="w-full sm:w-3/5 text-left">
        <h3 className="font-black text-4xl text-slate-900 mb-4 tracking-tight uppercase">
          {title}
        </h3>
        <div className="h-1 w-20 bg-rose-500 rounded-full mb-6"></div>
        <p className="text-slate-700 leading-relaxed text-lg">{description}</p>
      </div>
    </div>
  );
}
