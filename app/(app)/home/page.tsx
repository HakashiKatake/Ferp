"use client"
import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import Link from 'next/link'
import VideoCard from '@/components/VideoCard'
import ImageCard from '@/components/ImageCard'
import { Video, Image } from '@/types'
import { motion } from 'framer-motion'
import { Video as VideoIcon, Image as ImageIcon, LogOut, ArrowRight, Upload, Zap, Star } from 'lucide-react'
import { SignOutButton } from "@clerk/nextjs"

function Home() {
    const [videos, setVideos] = useState<Video[]>([])
    const [images, setImages] = useState<Image[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState('videos')

    const fetchVideos = useCallback(async () => {
        try {
            const response = await axios.get("/api/videos")
            if(Array.isArray(response.data)) {
                setVideos(response.data)
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            console.log(error);
            setError("Failed to fetch videos")
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchImages = useCallback(async () => {
        try {
            const response = await axios.get("/api/images")
            if(Array.isArray(response.data)) {
                setImages(response.data)
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            console.log(error);
            setError("Failed to fetch images")
        }
    }, [])

    useEffect(() => {
        Promise.all([fetchVideos(), fetchImages()])
            .finally(() => setLoading(false))
    }, [fetchVideos, fetchImages])

    const handleDownload = useCallback((url: string, title: string) => {
        return () => {
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", title);
            link.setAttribute("target", "_blank");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    }

    if(loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-300 to-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-100">
            {/* Enhanced Navbar */}
            <div className="navbar bg-base-200/30 backdrop-blur-lg sticky top-0 z-50 shadow-lg">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Media Gallery
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex gap-2">
                    <Link href="/video-upload" className="btn btn-ghost btn-sm">
                        <VideoIcon className="w-5 h-5 mr-2" />
                        Upload Video
                    </Link>
                    <Link href="/social-share" className="btn btn-ghost btn-sm">
                        <ImageIcon className="w-5 h-5 mr-2" />
                        Social Share
                    </Link>
                </div>
                <div className="navbar-end gap-4">
                    <div className="form-control">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="input input-bordered input-sm input-primary bg-base-200/50 backdrop-blur-sm w-24 md:w-auto" 
                        />
                    </div>
                    <SignOutButton>
                        <button className="btn btn-ghost btn-sm text-error">
                            <LogOut className="w-5 h-5 mr-2" />
                            Sign Out
                        </button>
                    </SignOutButton>
                </div>
            </div>

            <div className="container mx-auto p-4 md:p-8">
                {/* Enhanced Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="tabs tabs-boxed bg-base-200/30 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
                        <a 
                            className={`tab tab-lg transition-all duration-300 ${activeTab === 'videos' ? 'tab-active bg-primary text-primary-content shadow-lg' : 'hover:text-primary'}`}
                            onClick={() => setActiveTab('videos')}
                        >
                            <VideoIcon className="w-5 h-5 mr-2" />
                            Videos
                        </a>
                        <a 
                            className={`tab tab-lg transition-all duration-300 ${activeTab === 'images' ? 'tab-active bg-primary text-primary-content shadow-lg' : 'hover:text-primary'}`}
                            onClick={() => setActiveTab('images')}
                        >
                            <ImageIcon className="w-5 h-5 mr-2" />
                            Images
                        </a>
                    </div>
                </div>

                {/* Enhanced Content Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {activeTab === 'videos' && (
                        videos.length === 0 ? (
                            <div className="col-span-full">
                                <div className="alert alert-info bg-base-200/50 backdrop-blur-sm shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>No videos available. Upload your first video!</span>
                                    <Link href="/video-upload" className="btn btn-primary btn-sm">Upload Now</Link>
                                </div>
                            </div>
                        ) : (
                            videos.map((video) => (
                                <motion.div
                                    key={video.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="card bg-base-200/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                                >
                                    <VideoCard video={video} onDownload={handleDownload} />
                                </motion.div>
                            ))
                        )
                    )}

                    {activeTab === 'images' && (
                        images.length === 0 ? (
                            <div className="col-span-full">
                                <div className="alert alert-info bg-base-200/50 backdrop-blur-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>No images available</span>
                                </div>
                            </div>
                        ) : (
                            images.map((image) => (
                                <motion.div
                                    key={image.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="card bg-base-200/30 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                                >
                                    <ImageCard image={image} onDownload={handleDownload} />
                                </motion.div>
                            ))
                        )
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default Home