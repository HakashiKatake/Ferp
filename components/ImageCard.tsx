import React from 'react'
import { Download, Clock } from "lucide-react";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
import { Image } from '@/types'

dayjs.extend(relativeTime)

interface ImageCardProps {
    image: Image;
    onDownload: (url: string, title: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({image, onDownload}) => {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <figure className="aspect-video relative">
                <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
                    <Clock size={16} className="mr-1" />
                    {dayjs(image.createdAt).fromNow()}
                </div>
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg font-bold">{image.title}</h2>
                <p className="text-sm text-base-content opacity-70 mb-4">
                    {image.description}
                </p>
                <div className="flex justify-end">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onDownload(image.url, image.title)}
                    >
                        <Download size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageCard