import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposPrivateVulnerabilityReporting {
        export interface GetResponse {
            /**
             * Whether or not private vulnerability reporting is enabled for the repository.
            */
            enabled: boolean;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposPrivateVulnerabilityReporting.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isEnabled = value.enabled;
  const statusText = isEnabled ? 'Enabled' : 'Disabled';
  const statusColor = isEnabled ? 'text-green-600' : 'text-red-600';
  const statusIcon = isEnabled
    ? <LucideReact.CheckCircle className="text-green-500" size={16} />
    : <LucideReact.XCircle className="text-red-500" size={16} />;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
      <LucideReact.Shield className="text-indigo-500" size={24} />
      <div className="ml-3 flex-1">
        <h3 className="text-base font-semibold text-gray-900">Private Vulnerability Reporting</h3>
        <p className="mt-1 text-sm text-gray-500">
          {`Reporting is currently ${statusText.toLowerCase()}.`}
        </p>
      </div>
      <div className="ml-4 flex items-center space-x-1">
        {statusIcon}
        <span className={`text-sm font-medium ${statusColor}`}>{statusText}</span>
      </div>
    </div>
  );
}
