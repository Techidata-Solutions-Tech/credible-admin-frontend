import { useState } from "react";

export default function ImageGallery({ images ,setImage}) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (src) => {
        setSelectedImage(src);
        setImage(src)
        document.getElementById('view_image').close()
    };

    return (
        <div>
            <div className="grid grid-cols-6 gap-4">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Image ${index + 1}`}
                        className={`w-full h-auto cursor-pointer ${selectedImage === src ? "border-4 border-blue-500" : ""}`}
                        onClick={() => handleImageSelect(src)}
                    />
                ))}
            </div>
            
        </div>
    );
}
