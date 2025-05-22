import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposPrivateVulnerabilityReporting {
        export type GetResponse = {
            /**
             * Whether or not private vulnerability reporting is enabled for the repository.
            */
            enabled: boolean;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposPrivateVulnerabilityReporting.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isEnabled = value.enabled;
  const statusText = isEnabled ? "Enabled" : "Disabled";
  const statusClasses = isEnabled
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
  const statusIcon = isEnabled ? (
    <svg
      className="w-4 h-4 mr-1"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg
      className="w-4 h-4 mr-1"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-xs mx-auto">
      <h2 className="text-sm font-medium text-gray-700 mb-2 truncate">
        Private Vulnerability Reporting
      </h2>
      <span
        className={`inline-flex items-center px-2 py-0.5 text-sm font-semibold rounded-full ${statusClasses}`}
      >
        {statusIcon}
        {statusText}
      </span>
    </div>
  );
}
