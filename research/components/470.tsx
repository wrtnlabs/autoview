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
  const limitLabelMap: Record<AutoViewInputSubTypes.interaction_group, string> =
    {
      existing_users: "Existing users",
      contributors_only: "Contributors only",
      collaborators_only: "Collaborators only",
    };

  const expiresDate = new Date(value.expires_at);
  const now = new Date();

  function getRelativeTime(target: Date): string {
    const diffMs = target.getTime() - now.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffMs / (1000 * 60));
    const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    if (diffHrs >= 1) return `${diffHrs} hour${diffHrs !== 1 ? "s" : ""}`;
    if (diffMin >= 1) return `${diffMin} minute${diffMin !== 1 ? "s" : ""}`;
    if (diffSec >= 0) return `a few seconds`;
    // past
    const pastDays = Math.abs(diffDays);
    if (pastDays >= 1) return `${pastDays} day${pastDays !== 1 ? "s" : ""} ago`;
    const pastHrs = Math.abs(diffHrs);
    if (pastHrs >= 1) return `${pastHrs} hour${pastHrs !== 1 ? "s" : ""} ago`;
    const pastMin = Math.abs(diffMin);
    if (pastMin >= 1) return `${pastMin} minute${pastMin !== 1 ? "s" : ""} ago`;
    return `a few seconds ago`;
  }

  const formattedExpires = expiresDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const relativeExpires =
    expiresDate.getTime() > now.getTime()
      ? `in ${getRelativeTime(expiresDate)}`
      : getRelativeTime(expiresDate);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-4 mx-auto">
      <div className="flex items-center mb-4">
        <LucideReact.Lock className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Interaction Limit
        </h2>
      </div>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center">
          <LucideReact.Users className="text-gray-500" size={16} />
          <span className="ml-2">
            <span className="font-medium">Who can interact:</span>{" "}
            {limitLabelMap[value.limit]}
          </span>
        </li>
        <li className="flex items-center">
          <LucideReact.Globe className="text-gray-500" size={16} />
          <span className="ml-2 truncate break-all">
            <span className="font-medium">Origin:</span> {value.origin}
          </span>
        </li>
        <li className="flex items-center">
          <LucideReact.Calendar className="text-gray-500" size={16} />
          <div className="ml-2 flex flex-col">
            <span className="font-medium">Expires:</span>
            <div className="flex items-baseline space-x-2">
              <span>{formattedExpires}</span>
              <span className="text-sm text-gray-500">({relativeExpires})</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
