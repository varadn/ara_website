import Image from "next/image";
import { convertGoogleDriveUrl } from '@/utils/helpers';

interface NewsCardProps {
  title: string; 
  location: string;
  date: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  isEditing?: boolean;
  handlEdit?: () => void;
  handleDelete?: () => void;
}

export default function NewsCard({
  title,
  location,
  date,
  description, 
  imageSrc,
  imageAlt = "News image",
  isEditing,
  handlEdit,
  handleDelete,
}: NewsCardProps) {

    let dateLocation: string = date;

    if (location){
      dateLocation = date + " — " + location
    }

  return (
    <div className="modern-card bg-white flex flex-col sm:flex-row items-center sm:items-start gap-6 border-l-4 border-l-blue-600 card-lift">
        <div className="flex-shrink-0 w-full sm:w-1/3 relative">
            <div className="absolute -inset-3 bg-black opacity-20 rounded-lg blur-md"></div>
            <Image
            src={convertGoogleDriveUrl(imageSrc)}
            alt={imageAlt}
            width={300}
            height={200}
            className="rounded-lg object-cover w-full h-48 sm:h-40 relative z-10 border-4 border-slate-900"
            />
        </div> 

      <div className="text-left flex-1">
        <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight uppercase">{title}</h2>
        <p className="text-sm font-black text-slate-600 mb-4 uppercase">
          {dateLocation}
        </p>
        <p className="text-slate-700 leading-relaxed font-medium">{description}</p>
      </div>

      {/* Edit and Delete Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-2 mt-4">
          <button 
          onClick={handlEdit}
          className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Edit
          </button> 
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
