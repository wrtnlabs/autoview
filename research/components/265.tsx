import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type RecordingResponse = {
    signedUrl?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.RecordingResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const recordingUrl = value.signedUrl;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!recordingUrl) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <LucideReact.AlertCircle size={48} className="text-gray-400 mb-2" />
        <span className="text-gray-500 text-sm">Recording unavailable</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
        <video
          src={recordingUrl}
          controls
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
