import { useState } from "react";
import Image from "next/image";
import defaultImg from "@/public/defaultEmployee.svg";
import { IoIosCamera } from "react-icons/io";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>(""); // State for filename

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string); // Set the image preview URL
        setFileName(file.name);
      };
      reader.readAsDataURL(file); // Read file as data URL for preview
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Image Upload Section */}
      <div className="relative p-2 bg-[#fdfdfd] w-14  h-14 rounded-full border">
        {/* Image Display */}
        <Image
          className="dark:invert rounded-full"
          src={selectedImage || defaultImg} // Display selected image or default
          alt="Employee Manager Logo"
          width={40}
          height={40}
          priority
        />

        <Label
          htmlFor="file-upload"
          className="absolute -top-1 left-9 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer border-2 border-white shadow-lg"
        >
          <IoIosCamera size={16} />
        </Label>
        <Input
          id="file-upload"
          accept="image/*"
          onChange={handleFileChange}
          type="file"
          hidden
          className="hidden"
        />
      </div>
    </div>
  );
}
