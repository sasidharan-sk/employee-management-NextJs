import React from "react";
import Image from "next/image";
import { IoIosCamera } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  imageUploadSchema,
  AddEmployeeImageSchema,
} from "@/forms-schema/image-upload-schema"; // Zod schema for validation
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "react-toastify";
import useEmployeeImageUpload from "@/customhooks/employees/useEmployeeImageUpload";
import { ImageUploadRequest } from "@/types/employee/upload-image-request";
import maleImg from "@/public/MaleEmployee.svg";
import femaleImg from "@/public/femaleEmployee.svg";

export default function ImageUpload({
  empId,
  url,
  gender,
}: {
  empId: string;
  url: string;
  gender: string;
}) {
  const profileImg =
    url !== "" ? encodeURI(url) : gender === "Male" ? maleImg : femaleImg;
  const { mutate, isPending } = useEmployeeImageUpload();
  const {
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm<AddEmployeeImageSchema>({
    resolver: zodResolver(imageUploadSchema),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setValue("File", file);
        setValue("FileName", file.name);
        setValue("EmpId", empId);
        const isValid = await trigger(["File", "FileName", "EmpId"]);
        if (isValid) {
          handleSubmit(onSubmit)();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: AddEmployeeImageSchema) => {
    const imageUploadRequest: ImageUploadRequest = {
      EmpId: data.EmpId,
      File: data.File,
      FileName: data.FileName,
      FileDescription: data.FileDescription || "",
    };
    mutate(imageUploadRequest, {
      onSuccess: () => {
        toast.success("Image uploaded successfully");
      },
      onError: (error) => {
        toast.error(`${error}`);
      },
    });
    reset();
  };

  return (
    <form className="flex flex-col items-center">
      {/* Image Upload Section */}
      <div className="relative p-[1px] bg-[#fdfdfd] w-14 h-14 rounded-full border-2 border-gray-400">
        {/* Spinner or Image */}
        {isPending ? (
          <div className="flex items-center justify-center w-full h-full">
            {/* Spinner (customize as needed) */}
            <div className="animate-spin w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <Image
            id={empId}
            className="dark:invert rounded-full object-cover h-[100%] w-[100%]"
            src={profileImg}
            alt="Employee Manager Logo"
            width={100}
            height={100}
            priority
          />
        )}

        {/* Camera Icon to Trigger File Upload */}
        <Label
          htmlFor={`file-upload-${empId}`}
          className="absolute -top-1 left-9 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center cursor-pointer border-2 border-white shadow-lg"
        >
          <IoIosCamera size={14} />
        </Label>
        <Input
          id={`file-upload-${empId}`}
          accept="image/*"
          type="file"
          onChange={(e) => {
            console.log("from menu dropdown", empId);
            handleFileChange(e);
          }}
          className="hidden"
          hidden
        />
      </div>

      {/* Error Message for File Upload */}
      {errors.File?.message && (
        <p className="text-red-500 w-auto text-wrap text-center">
          {errors.File.message}
        </p>
      )}
    </form>
  );
}
