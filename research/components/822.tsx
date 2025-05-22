import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposPrivateVulnerabilityReporting.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isEnabled = value.enabled;
  const statusText = isEnabled ? "Enabled" : "Disabled";
  const StatusIcon = isEnabled ? LucideReact.CheckCircle : LucideReact.XCircle;
  const statusColor = isEnabled ? "text-green-500" : "text-red-500";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4 flex items-start space-x-4">
      {/* Icon container */}
      <div className="flex-shrink-0">
        <StatusIcon
          size={28}
          className={statusColor}
          strokeWidth={2}
          aria-label={`Private vulnerability reporting is ${statusText.toLowerCase()}`}
        />
      </div>
      {/* Textual information */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">
          Private Vulnerability Reporting
        </h3>
        <p
          className={`mt-1 text-sm font-medium ${statusColor} flex items-center gap-1`}
        >
          <StatusIcon size={16} className={statusColor} strokeWidth={2} />
          <span>{statusText}</span>
        </p>
      </div>
    </div>
  );
}
