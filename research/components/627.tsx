import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Check Dependabot security updates
   *
   * @title Check Dependabot security updates
   */
  export type check_automated_security_fixes = {
    /**
     * Whether Dependabot security updates are enabled for the repository.
     */
    enabled: boolean;
    /**
     * Whether Dependabot security updates are paused for the repository.
     */
    paused: boolean;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.check_automated_security_fixes;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusLabel = value.paused
    ? "Paused"
    : value.enabled
      ? "Enabled"
      : "Disabled";

  const statusIcon = value.paused ? (
    <LucideReact.Clock
      size={20}
      className="text-amber-500"
      aria-label="Paused"
    />
  ) : value.enabled ? (
    <LucideReact.CheckCircle
      size={20}
      className="text-green-500"
      aria-label="Enabled"
    />
  ) : (
    <LucideReact.XCircle
      size={20}
      className="text-red-500"
      aria-label="Disabled"
    />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-xs p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900">
        Dependabot Security Updates
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Automated security updates for this repository.
      </p>
      <div className="mt-4 flex items-center gap-2">
        {statusIcon}
        <span className="text-sm font-medium text-gray-900">{statusLabel}</span>
      </div>
    </div>
  );
}
