import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Interaction limit settings.
     *
     * @title Interaction Limits
    */
    export interface interaction_limit_response {
        limit: AutoViewInputSubTypes.interaction_group;
        origin: string;
        expires_at: string & tags.Format<"date-time">;
    }
    /**
     * The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect.
    */
    export type interaction_group = "existing_users" | "contributors_only" | "collaborators_only";
}
export type AutoViewInput = AutoViewInputSubTypes.interaction_limit_response;



// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived values
  const limitLabels: Record<AutoViewInputSubTypes.interaction_group, string> = {
    existing_users: "Existing Users",
    contributors_only: "Contributors Only",
    collaborators_only: "Collaborators Only",
  };
  const formattedLimit = limitLabels[value.limit] ?? value.limit;

  const expiresDate = new Date(value.expires_at);
  const isValidDate = !isNaN(expiresDate.getTime());
  const formattedDate = isValidDate
    ? expiresDate.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Invalid Date";

  // Compute relative time until expiration
  let relativeTime = "";
  if (isValidDate) {
    const diffMs = expiresDate.getTime() - Date.now();
    const absMs = Math.abs(diffMs);
    const minutes = Math.floor(absMs / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (diffMs > 0) {
      if (days >= 1) {
        relativeTime = `in ${days} day${days > 1 ? "s" : ""}`;
      } else if (hours >= 1) {
        relativeTime = `in ${hours} hour${hours > 1 ? "s" : ""}`;
      } else if (minutes >= 1) {
        relativeTime = `in ${minutes} minute${minutes > 1 ? "s" : ""}`;
      } else {
        relativeTime = "in a few moments";
      }
    } else {
      if (days >= 1) {
        relativeTime = `${days} day${days > 1 ? "s" : ""} ago`;
      } else if (hours >= 1) {
        relativeTime = `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else if (minutes >= 1) {
        relativeTime = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      } else {
        relativeTime = "just now";
      }
    }
  }

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Interaction Limit */}
      <div className="flex items-center mb-3 text-gray-700">
        <LucideReact.Users size={16} className="text-gray-500 mr-2" />
        <span className="text-sm">
          <span className="font-medium">Interaction Limit:</span>{" "}
          {formattedLimit}
        </span>
      </div>

      {/* Origin */}
      <div className="flex items-center mb-3 text-gray-700">
        <LucideReact.Link size={16} className="text-gray-500 mr-2" />
        <span className="text-sm truncate">{value.origin}</span>
      </div>

      {/* Expiration */}
      <div className="flex items-center text-gray-700">
        <LucideReact.Calendar size={16} className="text-gray-500 mr-2" />
        <span className="text-sm">
          <span className="font-medium">Expires At:</span> {formattedDate}
          {relativeTime && (
            <span className="ml-1 text-xs text-gray-500">
              ({relativeTime})
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
