import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Permission check result for a given devcontainer config.
     *
     * @title Codespaces Permissions Check
    */
    export interface codespaces_permissions_check_for_devcontainer {
        /**
         * Whether the user has accepted the permissions defined by the devcontainer config
        */
        accepted: boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.codespaces_permissions_check_for_devcontainer;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { accepted } = value;
  const statusText = accepted ? 'Permissions Accepted' : 'Permissions Not Accepted';
  const IconComponent = accepted ? LucideReact.CheckCircle : LucideReact.XCircle;
  const iconColor = accepted ? 'text-green-500' : 'text-red-500';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <IconComponent
        className={iconColor}
        size={24}
        strokeWidth={2}
        aria-label={statusText}
      />
      <span className="ml-3 text-gray-900 font-semibold">{statusText}</span>
    </div>
  );
}
