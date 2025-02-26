// components/ImagePreview.tsx
import React from "react";
import { Upload } from "lucide-react";

interface ImagePreviewProps {
  imagePreview: string | null;
  onClick: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imagePreview,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 cursor-pointer hover:bg-card-custom p-1"
  >
    <>
      {!imagePreview && <Upload className="w-6 h-6 text-primary" />}
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded"
        />
      )}
    </>
  </div>
);
