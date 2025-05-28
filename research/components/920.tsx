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
  //    Extract a friendly team name from the URL
  let teamName: string;
  try {
    const urlObj = new URL(value.url);
    const segments = urlObj.pathname.split("/").filter(Boolean);
    teamName = decodeURIComponent(segments.pop() || urlObj.hostname);
  } catch {
    teamName = value.url;
  }
  // Capitalize role and state for display
  const displayRole = value.role.charAt(0).toUpperCase() + value.role.slice(1);
  const displayState = value.state.charAt(0).toUpperCase() + value.state.slice(1);

  // Choose icons based on role and state
  const RoleIcon = value.role === "maintainer"
    ? LucideReact.Shield
    : LucideReact.User;
  const StateIcon = value.state === "active"
    ? LucideReact.CheckCircle
    : LucideReact.Clock;
  const stateColor = value.state === "active" ? "text-green-500" : "text-amber-500";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-md space-y-3">
      {/* Team Name Header */}
      <div className="flex items-center gap-2">
        <LucideReact.Users size={20} className="text-blue-500" />
        <h2 className="text-lg font-semibold truncate">{teamName}</h2>
      </div>

      {/* Role and State Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-1">
          <RoleIcon size={16} className="text-gray-600" />
          <span className="text-gray-700">{displayRole}</span>
        </div>
        <div className="flex items-center gap-1">
          <StateIcon size={16} className={`${stateColor}`} />
          <span className="text-gray-700">{displayState}</span>
        </div>
      </div>

      {/* URL Display */}
      <div className="flex items-center gap-1">
        <LucideReact.Link size={16} className="text-gray-400" />
        <span className="text-sm text-gray-500 truncate">{value.url}</span>
      </div>
    </div>
  );
}
