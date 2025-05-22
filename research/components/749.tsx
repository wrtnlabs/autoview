import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Short Blob
     *
     * @title Short Blob
    */
    export type short_blob = {
        url: string;
        sha: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.short_blob;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isImage = /\.(png|jpe?g|gif|webp)$/i.test(value.url);
  const fileName = value.url.split('/').pop() || value.url;
  const shaShort = value.sha.slice(0, 8);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {isImage ? (
        <img
          src={value.url}
          alt={fileName}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-100">
          <span className="text-6xl">📄</span>
        </div>
      )}
      <div className="p-4">
        <h3
          className="text-lg font-semibold text-gray-800 truncate"
          title={fileName}
        >
          {fileName}
        </h3>
        <p
          className="mt-2 text-sm text-gray-600 break-all truncate"
          title={value.url}
        >
          {value.url}
        </p>
        <div className="mt-3 flex items-baseline">
          <span className="text-xs font-medium text-gray-500">SHA:</span>
          <code
            className="ml-1 text-xs font-mono text-gray-700 bg-gray-100 px-1 rounded"
            title={value.sha}
          >
            {shaShort}...
          </code>
        </div>
      </div>
    </div>
  );
}
