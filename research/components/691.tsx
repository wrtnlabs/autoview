import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Permission check result for a given devcontainer config.
   *
   * @title Codespaces Permissions Check
   */
  export type codespaces_permissions_check_for_devcontainer = {
    /**
     * Whether the user has accepted the permissions defined by the devcontainer config
     */
    accepted: boolean;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.codespaces_permissions_check_for_devcontainer;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const accepted = value.accepted;
  const statusText = accepted
    ? "Permissions Accepted"
    : "Permissions Not Accepted";
  const StatusIcon = accepted ? LucideReact.CheckCircle : LucideReact.XCircle;
  const statusColor = accepted ? "text-green-500" : "text-red-500";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Display a simple card with a heading and a status indicator.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm">
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        Codespaces Permissions Check
      </h3>
      <div
        className="flex items-center space-x-2"
        role="status"
        aria-label={statusText}
      >
        <StatusIcon
          className={statusColor}
          size={20}
          strokeWidth={2}
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-gray-900">{statusText}</span>
      </div>
    </div>
  );
}
