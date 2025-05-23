import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface RecordingResponse {
        signedUrl?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.RecordingResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Truncate the signed URL for better display if it's too long.
  const signedUrl = value.signedUrl?.trim();
  const displayUrl =
    signedUrl && signedUrl.length > 60
      ? `${signedUrl.slice(0, 30)}…${signedUrl.slice(-15)}`
      : signedUrl;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Use semantic HTML and icons to clearly convey presence or absence of a recording URL.
  return (
    <div className="w-full max-w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {signedUrl ? (
        <div className="flex items-center space-x-2">
          <LucideReact.Link size={20} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
          <span
            className="text-sm text-blue-600 break-all truncate"
            title={signedUrl}
          >
            {displayUrl}
          </span>
        </div>
      ) : (
        <div className="flex items-center space-x-2 text-gray-500">
          <LucideReact.AlertCircle size={20} className="flex-shrink-0" aria-hidden="true" />
          <span className="text-sm">No recording available</span>
        </div>
      )}
    </div>
  );
}
