import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelectMultipleMedia = ({ formData, setFormData }) => {
    const [media, setMedia] = useState([]);
    const [activeTab, setActiveTab] = useState('gallery');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedGalleryMedia, setSelectedGalleryMedia] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mediaType, setMediaType] = useState('images');

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const type = mediaType === 'images' ? 'IMAGE' : 'VIDEO';
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/admin/media?type=${type}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`, 
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const result = await response.json();
                setMedia(result.data);
            } catch (error) {
                toast.error("Failed to fetch media");
            }
        };
        
        if (isModalOpen) {
            fetchMedia();
        }
    }, [isModalOpen, mediaType]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            toast.error("Please select files to upload");
            return;
        }

        const formDataUpload = new FormData();
        selectedFiles.forEach(file => formDataUpload.append('media', file));
        formDataUpload.append('type', mediaType === 'images' ? 'IMAGE' : 'VIDEO');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/upload-media`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataUpload
            });
    
            const result = await response.json();
    
            if (result && result.imageUrl) { 
                toast.success("Media uploaded successfully");
    setIsModalOpen(false);
                setFormData((prev) => ({
                    ...prev,
                    imageAndVideo: {
                        ...prev.imageAndVideo,
                        [mediaType]: [...(prev.imageAndVideo?.[mediaType] || []), result.imageUrl]
                    }
                }));
    
                setSelectedFiles([]);
                const type = mediaType === 'images' ? 'IMAGE' : 'VIDEO';
                const refreshResponse = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/admin/media?type=${type}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`, 
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const refreshResult = await refreshResponse.json();
                setMedia(refreshResult.data);
            } else {
                toast.error("Upload failed");
            }
        } catch (error) {
            toast.error("Error uploading media");
        }
    };

    const handleGallerySelect = (mediaUrl) => {
        if (selectedGalleryMedia.includes(mediaUrl)) {
            setSelectedGalleryMedia(selectedGalleryMedia.filter(item => item !== mediaUrl));
        } else {
            setSelectedGalleryMedia([...selectedGalleryMedia, mediaUrl]);
        }
    };

const handleAddGalleryMedia = () => {
    if (selectedGalleryMedia.length === 0) {
        toast.error("No media selected!");
        return;
    }

    setFormData((prev) => ({
        ...prev,
        imageAndVideo: {
            ...prev.imageAndVideo,
            [mediaType]: [...(prev.imageAndVideo?.[mediaType] || []), ...selectedGalleryMedia]
        }
    }));

    toast.success("Gallery media added successfully");
    setSelectedGalleryMedia([]);
    setIsModalOpen(false);
};

    const removeMediaItem = (type, index) => {
        setFormData(prev => {
            const updatedMedia = [...prev.imageAndVideo[type]];
            updatedMedia.splice(index, 1);
            
            return {
                ...prev,
                imageAndVideo: {
                    ...prev.imageAndVideo,
                    [type]: updatedMedia
                }
            };
        });
        
        toast.success(`${type === 'images' ? 'Image' : 'Video'} removed successfully`);
    };

    return (
        <div className="bg-gray-100 p-5">
            <div className="flex gap-4 mb-4">
                <button type='button'
                    onClick={() => {
                        setMediaType('images');
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add or Select Images
                </button>
                
                <button type='button'
                    onClick={() => {
                        setMediaType('videos');
                        setIsModalOpen(true);
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Add or Select Videos
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-[90%] max-w-4xl p-8 rounded-lg shadow-lg">
                        <h3 className="font-bold text-lg mb-5">Choose {mediaType === 'images' ? 'Images' : 'Videos'}</h3>

                        <div className="flex border-b mb-5">
                            <button type='button'
                                className={`p-2 w-1/2 ${activeTab === 'gallery' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                                onClick={() => setActiveTab('gallery')}>
                                Choose from Gallery
                            </button>
                            <button type='button'
                                className={`p-2 w-1/2 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                                onClick={() => setActiveTab('upload')}>
                                Upload New {mediaType === 'images' ? 'Images' : 'Videos'}
                            </button>
                        </div>

                        {activeTab === 'gallery' ? (
                            <div>
                                <div className="max-h-[20rem] grid grid-cols-3 gap-4 overflow-y-auto">
                                    {media?.map((item, index) => (
                                        <div key={index}
                                            className={`p-2 border rounded-lg cursor-pointer ${selectedGalleryMedia.includes(item) ? 'border-blue-500' : ''}`}
                                            onClick={() => handleGallerySelect(item)}>
                                            {mediaType === 'images' ? (
                                                <img src={item} alt="Gallery" className="w-full h-32 object-cover" />
                                            ) : (
                                                <video className="w-full h-32 object-cover">
                                                    <source src={item} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button 
                                        type='button'
                                        onClick={handleAddGalleryMedia}
                                        className="bg-green-500 text-white px-4 py-2 rounded">
                                        Add Selected {mediaType === 'images' ? 'Images' : 'Videos'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4">
                                <input
                                    type="file"
                                    multiple
                                    accept={mediaType === 'images' ? 'image/*' : 'video/*'}
                                    onChange={handleFileChange}
                                    className="p-2 border rounded w-full"
                                />
                                <button 
                                    type='button'
                                    onClick={handleUpload}
                                    className="bg-blue-500 text-white p-2 rounded w-full">
                                    Upload {mediaType === 'images' ? 'Images' : 'Videos'}
                                </button>
                            </div>
                        )}

                        <div className="flex justify-end mt-4">
                            <button
                                type='button'
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="mt-4">
                <h3 className="font-bold mb-2">Selected Images:</h3>
                <div className="flex flex-wrap gap-2">
                    {formData.imageAndVideo.images.map((img, index) => (
                        <div key={`img-${index}`} className="relative group">
                            <img src={img} alt={`img-${index}`} className="w-32 h-32 object-cover rounded" />
                            <button
                                type="button"
                                onClick={() => removeMediaItem('images', index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={`Remove image ${index + 1}`}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-4">
                <h3 className="font-bold mb-2">Selected Videos:</h3>
                <div className="flex flex-wrap gap-2">
                    {formData.imageAndVideo.videos.map((video, index) => (
                        <div key={`vid-${index}`} className="relative group">
                            <video className="w-32 h-32 object-cover rounded" controls>
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <button
                                type="button"
                                onClick={() => removeMediaItem('videos', index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={`Remove video ${index + 1}`}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
            <ToastContainer autoClose={3000} closeButton={true}/>
        </div>
    );
};

export default SelectMultipleMedia;