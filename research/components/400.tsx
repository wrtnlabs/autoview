import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Runner Application
     *
     * @title Runner Application
    */
    export interface runner_application {
        os: string;
        architecture: string;
        download_url: string;
        filename: string;
        /**
         * A short lived bearer token used to download the runner, if needed.
        */
        temp_download_token?: string;
        sha256_checksum?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.runner_application[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const runners = value;
  const count = runners.length;

  // Handle empty state
  if (count === 0) {
    return (
      <div className="flex items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        <span>No runner downloads available.</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Available Runner Downloads ({count})
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {runners.map((app, idx) => (
          <div key={idx} className="p-4 bg-white rounded-lg shadow">
            {/* OS and Architecture */}
            <div className="flex items-center gap-2 mb-2">
              <LucideReact.Computer size={20} className="text-gray-500" />
              <span className="font-medium text-gray-800">{app.os}</span>
              <span className="ml-auto flex items-center text-gray-600 text-sm">
                <LucideReact.Cpu size={14} className="mr-1" />
                {app.architecture}
              </span>
            </div>
            {/* Filename */}
            <div className="flex items-center text-gray-700 text-sm mb-1">
              <LucideReact.FileText size={16} className="text-indigo-500 mr-2" />
              <span className="truncate">{app.filename}</span>
            </div>
            {/* Download URL */}
            <div className="flex items-start text-gray-700 text-sm mb-1">
              <LucideReact.Link size={16} className="text-gray-400 mt-0.5 mr-2" />
              <span className="break-all">{app.download_url}</span>
            </div>
            {/* SHA-256 Checksum */}
            {app.sha256_checksum && (
              <div className="flex items-center text-gray-700 text-sm">
                <LucideReact.Hash size={16} className="text-gray-400 mr-2" />
                <span className="font-mono text-xs break-all">
                  {app.sha256_checksum}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
