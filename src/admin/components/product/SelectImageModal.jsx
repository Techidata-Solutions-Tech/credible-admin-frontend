import React, { useEffect, useState, useRef } from 'react';
import SelectImage from './SelectImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelectImageModal = ({ setImage }) => {
    const [images, setImages] = useState([]);
    const [activeTab, setActiveTab] = useState('gallery');
    const [selectedFile, setSelectedFile] = useState(null);
    const [key, setKey] = useState(Date.now()); 
    const token = localStorage.getItem('token');
    const dialogRef = useRef(null);
    const fileInputRef = useRef(null);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/media?type=IMAGE`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                setImages(result.data);
            } catch (error) {
                toast.error("Failed to fetch images");
            }
        };
        fetchImages();
    }, []);

 

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append('media', selectedFile);
        formData.append('type', "IMAGE");

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/upload-media`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });
            const result = await response.json();
            if (result) {
                toast.success("Image uploaded successfully");
                setImage(result.imageUrl);
                closeModal();
            } else {
                toast.error("Upload failed");
            }
        } catch (error) {
            toast.error("Error uploading image");
        }
    };
    const openModal = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
                setSelectedFile(null);
            }
        }
    };

    const closeModal = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
                setSelectedFile(null);
            }
        }
    };

    return (
        <div>
            <button
                type='button'
                onClick={openModal}
                className="flex items-center justify-between border border-gray-300 bg-white text-gray-600 px-4 py-2 rounded-md shadow-sm w-[280px]"
            >
                <span>Choose File</span>
                <span className="border-l pl-3 ml-3 text-blue-500 font-medium">Browse</span>
            </button>

            <dialog ref={dialogRef} id="view_image" className="modal">
                <div className="modal-box bg-white max-w-[72%] min-h-[25rem] overflow-y-auto p-5 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center pb-5">
                        <h3 className="font-bold text-lg">Choose Image</h3>
                        <button 
                            onClick={closeModal}
                            className="btn btn-sm btn-circle"
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="flex border-b mb-5">
                        <button
                            type='button'
                            className={`p-2 w-1/2 ${activeTab === 'gallery' ? 'border-2 bg-gray-100 border-blue-500 font-bold' : ''}`}
                            onClick={() => setActiveTab('gallery')}
                        >
                            Choose Image From Gallery
                        </button>
                        <button
                            type='button'
                            className={`p-2 w-1/2 ${activeTab === 'upload' ? 'border-2 border-blue-500 bg-gray-100 font-bold' : ''}`}
                            onClick={() => {
                                setActiveTab('upload');
                                setKey(Date.now());
                            }}
                        >
                            Upload New Image
                        </button>
                    </div>

                 <div className='overflow-y-auto max-h-[60vh] p-2'>
                 {activeTab === 'gallery' ? (
                        <SelectImage 
                            images={images} 
                            setImage={(img) => {
                                setImage(img);
                                closeModal();
                            }} 
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            key={activeTab} 
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setSelectedFile(e.target.files[0]);
                                }
                            }}
                            className="p-2 border rounded w-full"
                            onClick={(e) => e.stopPropagation()} 
                        />
                        <button
                            type='button'
                            onClick={handleUpload}
                            className="btn bg-blue-500 text-white p-2 rounded w-full"
                        >
                            Upload
                        </button>
                    </div>
                    )}
                 </div>
                </div>
            </dialog>

            <ToastContainer />
        </div>
    );
};

export default SelectImageModal;
