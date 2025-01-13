"use client"
import React, {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Image as ImageIcon, LogOut } from 'lucide-react'
import { SignOutButton } from "@clerk/nextjs"

function VideoUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isUploading, setIsUploading] = useState(false)

    const router = useRouter()
    //max file size of 60 mb

    const MAX_FILE_SIZE = 70 * 1024 * 1024

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            //TODO: add notification
            alert("File size too large")
            return;
        }

        setIsUploading(true)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("originalSize", file.size.toString());

        try {
            const response = await (await axios.post("/api/video-upload", formData))
            

            // check for 200 response
            
            

            router.push("/")
        } catch (error) {
            console.log(error)
            // notification for failure
        } finally{
            setIsUploading(false)
        }

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
                    <Link href="/social-share" className="btn btn-ghost">
                        <ImageIcon className="w-5 h-5 mr-2" />
                        Social Share
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
                className="container mx-auto p-4 max-w-2xl"
            >
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Upload Video
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card bg-base-200/30 backdrop-blur-sm shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-base-content/5"
                >
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Title</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input input-bordered w-full bg-base-200/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Description</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="textarea textarea-bordered w-full bg-base-200/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Video File</span>
                                </label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="file-input file-input-bordered file-input-primary w-full bg-base-200/50 backdrop-blur-sm"
                                    required
                                />
                            </div>
                            <div className="card-actions justify-end mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Uploading...
                                        </>
                                    ) : (
                                        "Upload Video"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default VideoUpload