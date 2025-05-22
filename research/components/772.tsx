import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Interaction limit settings.
   *
   * @title Interaction Limits
   */
  export type interaction_limit_response = {
    limit: AutoViewInputSubTypes.interaction_group;
    origin: string;
    expires_at: string & tags.Format<"date-time">;
  };
  /**
   * The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect.
   */
  export type interaction_group =
    | "existing_users"
    | "contributors_only"
    | "collaborators_only";
}
export type AutoViewInput = AutoViewInputSubTypes.interaction_limit_response;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Friendly labels for each interaction group
  const limitLabels: Record<AutoViewInputSubTypes.interaction_group, string> = {
    existing_users: "Existing users",
    contributors_only: "Contributors only",
    collaborators_only: "Collaborators only",
  };

  // Icon mapping for each interaction group
  const limitIcons: Record<
    AutoViewInputSubTypes.interaction_group,
    JSX.Element
  > = {
    existing_users: (
      <LucideReact.Users size={16} className="text-blue-500" aria-hidden />
    ),
    contributors_only: (
      <LucideReact.UserPlus size={16} className="text-green-500" aria-hidden />
    ),
    collaborators_only: (
      <LucideReact.UserCheck
        size={16}
        className="text-purple-500"
        aria-hidden
      />
    ),
  };

  // Parse and format the expiration date
  const expiresDate = new Date(value.expires_at);
  const formattedExpires = expiresDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Calculate relative time until expiration
  const now = new Date();
  const diffMs = expiresDate.getTime() - now.getTime();
  let expiresRelative = "";
  if (diffMs > 0) {
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days > 0) expiresRelative = `in ${days} day${days > 1 ? "s" : ""}`;
    else {
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      if (hours > 0)
        expiresRelative = `in ${hours} hour${hours > 1 ? "s" : ""}`;
      else {
        const mins = Math.floor(diffMs / (1000 * 60));
        expiresRelative = `in ${mins} minute${mins > 1 ? "s" : ""}`;
      }
    }
  } else {
    expiresRelative = "Expired";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md text-gray-800">
      <div className="flex items-center mb-4">
        <LucideReact.Lock size={20} className="text-gray-600" aria-hidden />
        <h2 className="ml-2 text-lg font-semibold">Interaction Limits</h2>
      </div>
      <div className="space-y-3">
        {/* Who can interact */}
        <div className="flex items-center gap-2">
          {limitIcons[value.limit]}
          <span className="text-sm font-medium text-gray-600">
            Who Can Interact:
          </span>
          <span className="text-sm text-gray-800">
            {limitLabels[value.limit]}
          </span>
        </div>

        {/* Origin */}
        <div className="flex items-center gap-2">
          <LucideReact.Link size={16} className="text-gray-500" aria-hidden />
          <span className="text-sm text-gray-700 truncate">{value.origin}</span>
        </div>

        {/* Expiration */}
        <div className="flex items-center gap-2">
          <LucideReact.Calendar
            size={16}
            className="text-gray-500"
            aria-hidden
          />
          <span className="text-sm text-gray-700">{formattedExpires}</span>
          <span className="text-xs text-gray-500">({expiresRelative})</span>
        </div>
      </div>
    </div>
  );
}
