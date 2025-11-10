import Image from "next/image";
import { convertGoogleDriveUrl } from '@/utils/helpers';

interface NewsCardProps {
  title: string; 
  location: string;
  date: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function NewsCard({
  title,
  location,
  date,
  description, 
  imageSrc,
  imageAlt = "News image",
}: NewsCardProps) {

    let dateLocation: string = date;

    if (location){
      dateLocation = date + " — " + location
    }

  return (
    <div className="modern-card bg-white flex flex-col sm:flex-row items-center sm:items-start gap-6 border-l-4 border-l-blue-600">
        <div className="flex-shrink-0 w-full sm:w-1/3">
            <Image
            src={convertGoogleDriveUrl(imageSrc)}
            alt={imageAlt}
            width={300}
            height={200}
            className="rounded-lg object-cover w-full h-48 sm:h-40"
            />
        </div> 

      <div className="text-left flex-1">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-sm text-slate-500 mb-4 font-medium flex items-center">
          📅 {dateLocation}
        </p>
        <p className="text-slate-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
