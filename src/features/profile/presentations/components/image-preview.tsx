// components/ImagePreview.tsx
import React from "react";
import { LoaderCircle, Upload } from "lucide-react";

interface ImagePreviewProps {
  imagePreview: string | null;
  uploadProgress: number | null;
  onClick: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imagePreview,
  uploadProgress,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 cursor-pointer hover:bg-card-custom p-1"
  >
    {uploadProgress !== null ? (
      <div className="flex flex-col items-center justify-center">
        <LoaderCircle className="w-5 h-5 animate-spin" />
        <span>{Math.round(uploadProgress)}%</span>
      </div>
    ) : (
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
    )}
  </div>
);
