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
  const runnerApps = Array.isArray(value) ? value : [];
  const totalCount = runnerApps.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {totalCount === 0 ? (
        <div className="text-center text-gray-500">No runner applications available.</div>
      ) : (
        <>
          <header className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Runner Applications ({totalCount})
            </h2>
          </header>
          <ul className="space-y-4">
            {runnerApps.map((app) => (
              <li
                key={app.download_url}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-md font-medium text-gray-900 truncate"
                      title={app.filename}
                    >
                      {app.filename}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">OS:</span> {app.os}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Arch:</span> {app.architecture}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 md:ml-4">
                    <p
                      className="text-sm text-blue-600 break-all"
                      title={app.download_url}
                    >
                      <span className="font-semibold">URL:</span> {app.download_url}
                    </p>
                  </div>
                </div>
                {app.sha256_checksum && (
                  <div className="mt-2">
                    <span className="text-xs font-mono text-gray-500">
                      SHA-256: {app.sha256_checksum}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
