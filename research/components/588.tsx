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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants
  const totalCount = value.length;
  const hasItems = totalCount > 0;

  // 2. JSX structure
  return (
    <div className="space-y-4">
      {/* Header with total count */}
      <div className="flex items-center text-xl font-semibold text-gray-700">
        <LucideReact.DownloadCloud size={24} className="mr-2 text-blue-500" />
        <span>Runner Applications ({totalCount})</span>
      </div>

      {/* Empty state */}
      {!hasItems ? (
        <div className="flex items-center justify-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No runner applications available.</span>
        </div>
      ) : (
        /* List of runner_application cards */
        value.map((runner, idx) => {
          // Shortened SHA-256 checksum
          const checksum = runner.sha256_checksum
            ? `${runner.sha256_checksum.slice(0, 8)}…${runner.sha256_checksum.slice(-8)}`
            : null;

          return (
            <div
              key={`${runner.os}-${runner.architecture}-${idx}`}
              className="p-4 bg-white rounded-lg shadow-md"
            >
              {/* OS / Architecture */}
              <div className="flex items-center gap-2 mb-2">
                <LucideReact.Computer size={20} className="text-gray-500" />
                <span className="text-lg font-medium text-gray-800">
                  {runner.os} / {runner.architecture}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-1 text-sm text-gray-600">
                {/* Filename */}
                <div className="flex items-center gap-2">
                  <LucideReact.FileText size={16} className="text-gray-400" />
                  <span className="truncate">{runner.filename}</span>
                </div>

                {/* Temporary download token */}
                {runner.temp_download_token && (
                  <div className="flex items-center gap-2">
                    <LucideReact.Key size={16} className="text-gray-400" />
                    <span className="font-mono">{runner.temp_download_token}</span>
                  </div>
                )}

                {/* Download URL */}
                <div className="flex items-center gap-2">
                  <LucideReact.Link size={16} className="text-gray-400" />
                  <span className="break-all">{runner.download_url}</span>
                </div>

                {/* SHA-256 checksum */}
                {checksum && (
                  <div className="flex items-center gap-2">
                    <LucideReact.Hash size={16} className="text-gray-400" />
                    <span className="font-mono">{checksum}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
