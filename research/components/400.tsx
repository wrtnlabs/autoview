import * as LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const truncate = (str: string, front = 30, back = 10): string =>
    str.length > front + back
      ? `${str.slice(0, front)}…${str.slice(-back)}`
      : str;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No runner applications available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((runner, idx) => {
        const { os, architecture, filename, download_url, sha256_checksum } =
          runner;
        const formattedUrl = truncate(download_url, 30, 10);
        const formattedChecksum = sha256_checksum
          ? truncate(sha256_checksum, 8, 8)
          : "";

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              {/* Left: OS & Architecture */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1 text-gray-700">
                  <LucideReact.Server size={16} />
                  <span className="font-medium">{os}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                  <LucideReact.Cpu size={16} />
                  <span className="font-medium">{architecture}</span>
                </div>
              </div>
              {/* Right: filename, url, checksum */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3 sm:mt-0">
                <div className="flex items-center gap-1 text-gray-700">
                  <LucideReact.FileText size={16} />
                  <span className="font-medium truncate" title={filename}>
                    {filename}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-700 max-w-xs">
                  <LucideReact.Link size={16} />
                  <span className="truncate text-sm" title={download_url}>
                    {formattedUrl}
                  </span>
                </div>
                {sha256_checksum && (
                  <div className="flex items-center gap-1 text-gray-700 max-w-xs">
                    <LucideReact.ShieldCheck size={16} />
                    <span
                      className="font-mono text-sm truncate"
                      title={sha256_checksum}
                    >
                      {formattedChecksum}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
