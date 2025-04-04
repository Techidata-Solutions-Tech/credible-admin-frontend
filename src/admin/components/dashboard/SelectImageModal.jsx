import React, { useEffect, useState } from 'react';
import SelectImage from './SelectImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelectImageModal = ({ setImage }) => {
    const [images, setImages] = useState([]);
    const [activeTab, setActiveTab] = useState('gallery');
    const [selectedFile, setSelectedFile] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/images`, {
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
        formData.append('image', selectedFile);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/upload-image`, {
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
            } else {
                toast.error("Upload failed");
            }
        } catch (error) {
            toast.error("Error uploading image");
        }
    };

    return (
        <div>
            <button
            type='button'
                onClick={() => document.getElementById('view_image').showModal()}
                className="flex items-center justify-between border border-gray-300 bg-white text-gray-600 px-4 py-2 rounded-md shadow-sm w-[280px]"
            >
                <span>Choose File</span>
                <span className="border-l pl-3 ml-3 text-blue-500 font-medium">Browse</span>
            </button>



            <dialog id="view_image" className="modal">
                <div className="modal-box bg-white max-w-[72%] max-h-[25rem] overflow-y-auto p-5 rounded-lg shadow-lg">
                    <h3 className="font-bold text-lg pb-5">Choose Image</h3>
                    <div className="flex border-b mb-5">
                        <button
                        type='button'
                            className={`p-2 w-1/2 ${activeTab === 'gallery' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                            onClick={() => setActiveTab('gallery')}
                        >
                            Choose Image From Gallery
                        </button>
                        <button
                        type='button'
                            className={`p-2 w-1/2 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                            onClick={() => setActiveTab('upload')}
                        >
                            Upload New Image
                        </button>
                    </div>

                    {activeTab === 'gallery' ? (
                        <SelectImage images={images} setImage={setImage} />
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <input
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                className="p-2 border rounded w-full"
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

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn bg-red-500 text-white">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <ToastContainer />
        </div>
    );
};

export default SelectImageModal;
