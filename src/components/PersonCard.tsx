import Image from "next/image";

interface PersonCardProps {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function PersonCard({
  name,
  title,
  description,
  imageSrc,
  imageAlt = "Photo of a person", 
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
      </div>
    </div>
  );
}
