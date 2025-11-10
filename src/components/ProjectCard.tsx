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
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-full sm:w-1/3">
            <Image
            src={convertGoogleDriveUrl(imageSrc)} 
            alt={imageAlt}
            width={400}
            height={300}
            className="rounded-xl object-cover w-full h-auto shadow-sm"
            />
        </div> 

      <div className="w-full sm:w-2/3 text-left">
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
