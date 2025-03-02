export default function ImageGallery({ images }) {
    return (
      <div className="grid grid-cols-6 gap-4">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Image ${index + 1}`} className="w-full h-auto" />
        ))}
      </div>
    );
}
  