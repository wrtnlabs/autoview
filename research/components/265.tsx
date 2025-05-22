import React from "react";
export namespace AutoViewInputSubTypes {
    export type RecordingResponse = {
        signedUrl?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.RecordingResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { signedUrl } = value;
  const hasRecording = Boolean(signedUrl);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {hasRecording ? (
        <video
          src={signedUrl}
          controls
          className="w-full rounded-md bg-black aspect-video"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md">
          <span className="text-gray-500">No recording available</span>
        </div>
      )}
    </div>
  );
}
