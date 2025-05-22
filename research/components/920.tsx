import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Team Membership
     *
     * @title Team Membership
    */
    export type team_membership = {
        url: string & tags.Format<"uri">;
        /**
         * The role of the user in the team.
        */
        role: "member" | "maintainer";
        /**
         * The state of the user's membership in the team.
        */
        state: "active" | "pending";
    };
}
export type AutoViewInput = AutoViewInputSubTypes.team_membership;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Derive a display-friendly team name from the URL:
  const teamName: string = (() => {
    try {
      const urlObj = new URL(value.url);
      const segments = urlObj.pathname.split('/').filter(Boolean);
      const last = segments[segments.length - 1] || "";
      return last ? last.charAt(0).toUpperCase() + last.slice(1) : urlObj.hostname;
    } catch {
      return value.url;
    }
  })();

  // Format state and role labels
  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const roleLabel = value.role.charAt(0).toUpperCase() + value.role.slice(1);

  // Badge styles based on state and role
  const stateBadgeClasses =
    value.state === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  const roleBadgeClasses =
    value.role === "maintainer"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-4 text-gray-900 mobile-first">
      {/* Header: Team Name */}
      <h2 className="text-xl font-semibold truncate">{teamName}</h2>

      {/* Badges */}
      <div className="mt-2 flex flex-wrap gap-2">
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${stateBadgeClasses}`}
        >
          {stateLabel}
        </span>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${roleBadgeClasses}`}
        >
          {roleLabel}
        </span>
      </div>

      {/* URL Display */}
      <p className="mt-3 text-sm text-gray-500 font-mono overflow-x-auto break-all">
        {value.url}
      </p>
    </div>
  );
}
