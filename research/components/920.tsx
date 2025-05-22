import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // Derive a display-friendly domain from the membership URL
  let domain: string;
  try {
    domain = new URL(value.url).hostname;
  } catch {
    domain = value.url;
  }
  const roleLabel = value.role === "maintainer" ? "Maintainer" : "Member";
  const stateLabel = value.state === "active" ? "Active" : "Pending";

  // Choose appropriate icon for membership state
  const stateIcon =
    value.state === "active" ? (
      <LucideReact.CheckCircle
        className="text-green-500"
        size={16}
        aria-label="Active membership"
      />
    ) : (
      <LucideReact.Clock
        className="text-amber-500"
        size={16}
        aria-label="Pending membership"
      />
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3">
      {/* URL / Team Link (display-only) */}
      <div className="flex items-center gap-2 text-gray-700 text-sm truncate">
        <LucideReact.Link
          className="text-gray-400"
          size={16}
          aria-hidden="true"
        />
        <span className="truncate" title={value.url}>
          {domain}
        </span>
      </div>

      {/* Role Badge */}
      <div className="flex items-center gap-2">
        <LucideReact.User
          className="text-blue-500"
          size={16}
          aria-hidden="true"
        />
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
          {roleLabel}
        </span>
      </div>

      {/* Membership State */}
      <div className="flex items-center gap-2">
        {stateIcon}
        <span
          className={`text-xs font-medium ${
            value.state === "active" ? "text-green-700" : "text-amber-700"
          }`}
        >
          {stateLabel}
        </span>
      </div>
    </div>
  );
}
