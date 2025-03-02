import React, { useEffect, useState } from 'react'
import SelectImage from './SelectImage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SelectImageModal = ({setImage}) => {
    const [images, setImages] = useState([]);
       useEffect(()=>{
          const fetchImages = async () => {
              try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/images`);
                const result = await response.json();
                setImages(result.data)
              } catch (error) {
                // console.error("Error fetching categories:", error);
                toast.error("Failed to fetch images");
              }
            };
        
            fetchImages();
      },[])
  return (
    <div>
      <dialog id="view_image" className="modal">
        <div className="modal-box bg-white max-w-[1200px]">
          <h3 className="font-bold text-lg pb-5">Select an Image</h3>
          <SelectImage images={images} setImage={setImage} />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-red-500 text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
       < ToastContainer/>
    </div>
  )
}

export default SelectImageModal