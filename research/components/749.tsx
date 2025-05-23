import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Short Blob
     *
     * @title Short Blob
    */
    export interface short_blob {
        url: string;
        sha: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.short_blob;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { url, sha } = value;
  // Derive file name from URL
  const segments = url.split("/");
  const rawName = segments[segments.length - 1] || url;
  const fileName = rawName.split("?")[0];
  // Truncate SHA for display
  const truncatedSha = sha.length > 8 ? `${sha.slice(0, 8)}…` : sha;
  // Determine if the URL likely points to an image
  const isImage = /\.(jpe?g|png|gif|webp|svg)$/i.test(url);
  // Manage image load errors
  const [imgError, setImgError] = React.useState<boolean>(false);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Preview: image or generic file icon */}
      {isImage && !imgError ? (
        <img
          src={url}
          alt={fileName}
          onError={() => setImgError(true)}
          className="w-16 h-16 object-cover rounded-md bg-gray-100"
        />
      ) : (
        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-md">
          <LucideReact.FileText size={32} className="text-gray-400" />
        </div>
      )}

      {/* File information */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <LucideReact.Folder size={16} className="text-gray-500" />
          <span
            className="text-sm font-medium text-gray-900 truncate"
            title={fileName}
          >
            {fileName}
          </span>
        </div>
        <div className="mt-1 flex items-center text-xs text-gray-500">
          <LucideReact.Hash size={14} className="mr-1 text-gray-400" />
          <span className="font-mono truncate" title={sha}>
            {truncatedSha}
          </span>
        </div>
      </div>
    </div>
  );
}
