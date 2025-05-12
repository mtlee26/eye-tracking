import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImage(URL.createObjectURL(file));  // display image
        }
    };

  const handleUpload = () => {
    if (image) {
      // Upload image to server
        router.push('/login');  // redirect to login page
    } else {
      alert('Please select an image to upload');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#1e1f25] p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-2 text-[#e2e2e9]">Register</h1>
        <p className="text-md text-center mb-6 text-[#adc6ff]">Please choose an image that fully shows your face</p>

        {/* File input */}
        <label
          htmlFor="file-input"
          className="block w-full text-md text-[#112f60] bg-[#adc6ff] rounded-lg cursor-pointer mb-4 py-2 text-center hover:bg-[#2b4678] hover:text-[#d8e2ff] transition"
        >
          Choose File
        </label>
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden" 
        />

        {/* Display image */}
        {image && (
          <div className="mb-4">
            <img src={image} alt="Picked image" className="w-full h-auto rounded-lg shadow-sm" />
          </div>
        )}

        <button
          onClick={handleUpload}
          className={`w-full py-2 rounded-lg text-[#112f60] bg-[#adc6ff] hover:bg-[#2b4678] hover:text-[#d8e2ff] transition ${!image ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={!image}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
