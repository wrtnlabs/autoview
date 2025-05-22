import React from "react";
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
  const truncate = (str: string, maxChars: number): string => {
    if (str.length <= maxChars) return str;
    const half = Math.floor(maxChars / 2);
    return `${str.slice(0, half)}…${str.slice(-half)}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm text-center text-gray-500">
        No runner applications available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {value.map((runner, idx) => {
        const { os, architecture, filename, download_url, temp_download_token, sha256_checksum } = runner;
        const displayUrl = truncate(download_url, 60);

        return (
          <div
            key={`${os}-${architecture}-${idx}`}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-2"
          >
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">
                {os}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">
                {architecture}
              </span>
              {temp_download_token && (
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                  Auth Required
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-900 truncate">{filename}</p>
            <p className="text-xs text-blue-600 break-all">{displayUrl}</p>
            {sha256_checksum && (
              <p className="text-xs text-gray-500">
                SHA256: <span className="font-mono">{truncate(sha256_checksum, 64)}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
