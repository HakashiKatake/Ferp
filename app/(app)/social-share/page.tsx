"use client"

import React, {useState, useEffect, useRef} from 'react'
import { CldImage } from 'next-cloudinary';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Video, LogOut } from 'lucide-react';
import { SignOutButton } from "@clerk/nextjs";

const socialFormats = {
    "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
    "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
    "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
    "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
    "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
  };

  type SocialFormat = keyof typeof socialFormats;

  export default function SocialShare() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
    const [isUploading, setIsUploading] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);


    useEffect(() => {
        if(uploadedImage){
            setIsTransforming(true);
        }
    }, [selectedFormat, uploadedImage])

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: formData
            })

            if(!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            setUploadedImage(data.publicId);


        } catch (error) {
            console.log(error)
            alert("Failed to upload image");
        } finally{
            setIsUploading(false);
        }
    };

    const handleDownload = () => {
        if(!imageRef.current) return;

        fetch(imageRef.current.src)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        })
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-100">
          {/* Navbar */}
          <div className="navbar bg-base-200/30 backdrop-blur-lg sticky top-0 z-50 shadow-lg mb-8">
            <div className="navbar-start">
              <Link href="/" className="btn btn-ghost">
                <Home className="w-5 h-5 mr-2" />
                Home
              </Link>
            </div>
            <div className="navbar-center">
              <Link href="/video-upload" className="btn btn-ghost">
                <Video className="w-5 h-5 mr-2" />
                Video Upload
              </Link>
            </div>
            <div className="navbar-end">
              <SignOutButton>
                <button className="btn btn-ghost text-error">
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
    
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto p-4 max-w-4xl"
          >
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Social Media Image Creator
            </h1>
    
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card bg-base-200/30 backdrop-blur-sm shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-base-content/5"
            >
              <div className="card-body">
                <h2 className="card-title mb-4 text-2xl">Upload an Image</h2>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Choose an image file</span>
                  </label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="file-input file-input-bordered file-input-primary w-full bg-base-200/50 backdrop-blur-sm"
                  />
                </div>
    
                {isUploading && (
                  <div className="mt-4">
                    <progress className="progress progress-primary w-full"></progress>
                  </div>
                )}
    
                {uploadedImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6"
                  >
                    <h2 className="card-title mb-4">Select Social Media Format</h2>
                    <div className="form-control">
                      <select
                        className="select select-bordered w-full bg-base-200/50 backdrop-blur-sm"
                        value={selectedFormat}
                        onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
                      >
                        {Object.keys(socialFormats).map((format) => (
                          <option key={format} value={format}>
                            {format}
                          </option>
                        ))}
                      </select>
                    </div>
    
                    <div className="mt-6 relative">
                      <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                      <div className="flex justify-center">
                        {isTransforming && (
                          <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10 backdrop-blur-sm">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                          </div>
                        )}
                        <div className="rounded-lg overflow-hidden shadow-lg">
                          <CldImage
                            width={socialFormats[selectedFormat].width}
                            height={socialFormats[selectedFormat].height}
                            src={uploadedImage}
                            sizes="100vw"
                            alt="transformed image"
                            crop="fill"
                            aspectRatio={socialFormats[selectedFormat].aspectRatio}
                            gravity='auto'
                            ref={imageRef}
                            onLoad={() => setIsTransforming(false)}
                          />
                        </div>
                      </div>
                    </div>
    
                    <div className="card-actions justify-end mt-6">
                      <button 
                        className="btn btn-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                        onClick={handleDownload}
                      >
                        Download for {selectedFormat}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      );
}