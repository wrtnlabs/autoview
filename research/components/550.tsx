import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Team Membership
     *
     * @title Team Membership
    */
    export interface team_membership {
        url: string & tags.Format<"uri">;
        /**
         * The role of the user in the team.
        */
        role: "member" | "maintainer";
        /**
         * The state of the user's membership in the team.
        */
        state: "active" | "pending";
    }
}
export type AutoViewInput = AutoViewInputSubTypes.team_membership;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Extract hostname for a cleaner URL display.
  let hostname: string;
  try {
    hostname = new URL(value.url).hostname;
  } catch {
    hostname = value.url;
  }
  const roleLabel = value.role === "maintainer" ? "Maintainer" : "Member";
  const stateLabel = value.state === "active" ? "Active" : "Pending";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* URL Display */}
      <div className="flex items-center gap-2 text-gray-700 truncate">
        <LucideReact.Link size={16} className="text-gray-400" aria-hidden="true" />
        <span title={value.url} className="truncate">{hostname}</span>
      </div>

      {/* Role Badge */}
      <div>
        <span
          className={
            value.role === "maintainer"
              ? "inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-sm font-medium"
              : "inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-medium"
          }
        >
          {value.role === "maintainer" ? (
            <LucideReact.Star size={16} className="mr-1" aria-hidden="true" />
          ) : (
            <LucideReact.User size={16} className="mr-1" aria-hidden="true" />
          )}
          {roleLabel}
        </span>
      </div>

      {/* State Indicator */}
      <div className="flex items-center gap-1 text-sm font-medium">
        {value.state === "active" ? (
          <LucideReact.CheckCircle size={16} className="text-green-500" aria-label="Active" />
        ) : (
          <LucideReact.Clock size={16} className="text-amber-500" aria-label="Pending" />
        )}
        <span className={value.state === "active" ? "text-green-600" : "text-amber-600"}>
          {stateLabel}
        </span>
      </div>
    </div>
  );
}
