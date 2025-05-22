import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Runner Application
   *
   * @title Runner Application
   */
  export type runner_application = {
    os: string;
    architecture: string;
    download_url: string;
    filename: string;
    /**
     * A short lived bearer token used to download the runner, if needed.
     */
    temp_download_token?: string;
    sha256_checksum?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.runner_application[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} className="flex-shrink-0" />
        <span className="ml-2 text-sm">No runner applications available</span>
      </div>
    );
  }

  // 2. Sort runners by OS then architecture for consistent display
  const sortedRunners = [...value].sort((a, b) => {
    const osCompare = a.os.localeCompare(b.os);
    return osCompare !== 0
      ? osCompare
      : a.architecture.localeCompare(b.architecture);
  });

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="space-y-4">
      {sortedRunners.map((runner, idx) => (
        <div
          key={`${runner.os}-${runner.architecture}-${idx}`}
          className="flex flex-col sm:flex-row sm:justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          {/* Left section: OS / Architecture and Filename */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <LucideReact.Cpu size={20} className="text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">
                {runner.os} / {runner.architecture}
              </h3>
            </div>
            <p className="mt-1 text-sm text-gray-700 truncate">
              {runner.filename}
            </p>
          </div>

          {/* Right section: Download URL and optional checksum */}
          <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <LucideReact.Link
                size={16}
                className="text-gray-400 flex-shrink-0"
              />
              <code className="break-all">{runner.download_url}</code>
            </div>
            {runner.sha256_checksum && (
              <div className="flex items-center gap-2">
                <LucideReact.Hash
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                />
                <span className="font-mono truncate">
                  {runner.sha256_checksum}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
