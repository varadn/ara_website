import Image from "next/image";
import { convertGoogleDriveUrl } from '@/utils/helpers';
import { useAuth } from '@/contexts/AuthContext';

interface NewsCardProps {
  id: number;
  title: string; 
  location: string;
  date: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  writtenBy: string;
  onDelete?: () => void;
}

export default function NewsCard({
  title,
  location,
  date,
  description, 
  imageSrc,
  imageAlt = "News image",
  writtenBy,
  onDelete
}: NewsCardProps) {
  const { user } = useAuth();

    let dateLocation: string = date;

    if (location){
      dateLocation = date + " — " + location
    }

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
            <Image
            src={convertGoogleDriveUrl(imageSrc)}
            alt={imageAlt}
            width={300}
            height={200}
            className="rounded-lg object-cover"
            />
        </div> 

      <div className="text-left relative w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}</h2>
        <p className="text-md text-gray-600 mb-2 font-semibold">{dateLocation}</p>
        <p className="text-sm text-gray-600 mb-2 font-semibold">Author: {writtenBy}</p>
        <p className="text-gray-700">{description}</p>
        {user && onDelete && (
          <button
            onClick={onDelete}
            className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
