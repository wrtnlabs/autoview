import { tags } from "typia";
import React from "react";
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
    export type interaction_group = "existing_users" | "contributors_only" | "collaborators_only";
}
export type AutoViewInput = AutoViewInputSubTypes.interaction_limit_response;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Mapping for human-readable labels and badge colors based on the interaction_group
  const limitConfigs: Record<AutoViewInputSubTypes.interaction_group, { label: string; bg: string; text: string }> = {
    existing_users:       { label: "Existing Users",    bg: "bg-blue-100",   text: "text-blue-800"   },
    contributors_only:    { label: "Contributors Only", bg: "bg-green-100",  text: "text-green-800"  },
    collaborators_only:   { label: "Collaborators Only",bg: "bg-purple-100", text: "text-purple-800" },
  };
  const { label: limitLabel, bg: limitBg, text: limitText } = limitConfigs[value.limit];

  // Parse and format the expiration date
  const expiresDate = new Date(value.expires_at);
  const formattedExpires = expiresDate.toLocaleString(undefined, {
    year:   "numeric",
    month:  "long",
    day:    "numeric",
    hour:   "numeric",
    minute: "2-digit",
  });

  // Compute relative time until expiration
  const diffMs = expiresDate.getTime() - Date.now();
  let relativeTime: string;
  if (diffMs < 0) {
    relativeTime = "Expired";
  } else {
    const days    = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    if (days > 0)    relativeTime = `${days} day${days > 1 ? "s" : ""} left`;
    else if (hours > 0)   relativeTime = `${hours} hour${hours > 1 ? "s" : ""} left`;
    else if (minutes > 0) relativeTime = `${minutes} min left`;
    else                  relativeTime = "Less than a minute left";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Interaction Limits</h2>
      <div className="flex flex-col space-y-3">
        {/* Limit */}
        <div className="flex items-center">
          <span className="w-24 text-sm font-medium text-gray-600">Limit:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${limitBg} ${limitText}`}>
            {limitLabel}
          </span>
        </div>
        {/* Origin */}
        <div className="flex items-start">
          <span className="w-24 text-sm font-medium text-gray-600">Origin:</span>
          <span className="text-sm text-gray-800 break-all">{value.origin}</span>
        </div>
        {/* Expires At */}
        <div className="flex items-start">
          <span className="w-24 text-sm font-medium text-gray-600">Expires:</span>
          <div className="flex flex-col">
            <span className="text-sm text-gray-800">{formattedExpires}</span>
            <span className="text-xs text-gray-500">{relativeTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
