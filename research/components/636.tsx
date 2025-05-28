import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Protected Branch Admin Enforced
     *
     * @title Protected Branch Admin Enforced
    */
    export interface protected_branch_admin_enforced {
        url: string & tags.Format<"uri">;
        enabled: boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.protected_branch_admin_enforced;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const domain: string = React.useMemo<string>(() => {
    try {
      return new URL(value.url).host;
    } catch {
      return value.url;
    }
  }, [value.url]);
  const statusText = value.enabled ? "Enabled" : "Disabled";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full w-full md:w-80">
      <h3 className="text-lg font-medium text-gray-800">Protected Branch</h3>
      <div className="mt-2 flex items-center text-gray-700">
        <LucideReact.Link size={16} className="mr-2 text-gray-500" aria-label="Branch URL" />
        <span className="truncate whitespace-nowrap overflow-hidden">{domain}</span>
      </div>
      <div className="mt-1 flex items-center text-gray-700">
        {value.enabled ? (
          <LucideReact.CheckCircle size={16} className="text-green-500 mr-2" aria-label="Enabled" />
        ) : (
          <LucideReact.XCircle size={16} className="text-red-500 mr-2" aria-label="Disabled" />
        )}
        <span className="font-medium">{statusText}</span>
      </div>
    </div>
  );
}
