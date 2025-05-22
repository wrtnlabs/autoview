import LucideReact from "lucide-react";
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
  const groupLabels: Record<AutoViewInputSubTypes.interaction_group, string> = {
    existing_users: "Existing Users",
    contributors_only: "Contributors Only",
    collaborators_only: "Collaborators Only",
  };

  const expiresDate = new Date(value.expires_at);
  const now = new Date();
  const timeDiff = expiresDate.getTime() - now.getTime();
  const isExpired = timeDiff <= 0;

  // Compute a simple relative time string
  let relativeExpires: string;
  if (isExpired) {
    relativeExpires = "Expired";
  } else if (timeDiff < 60 * 60 * 1000) {
    // less than 1 hour
    const minutes = Math.ceil(timeDiff / (60 * 1000));
    relativeExpires = `in ${minutes} min`;
  } else if (timeDiff < 24 * 60 * 60 * 1000) {
    // less than 1 day
    const hours = Math.ceil(timeDiff / (60 * 60 * 1000));
    relativeExpires = `in ${hours} hr`;
  } else {
    const days = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    relativeExpires = `in ${days} day${days > 1 ? "s" : ""}`;
  }

  const formattedExpires = expiresDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <LucideReact.Lock size={20} className="text-gray-700" />
        Interaction Limit
      </h2>

      <div className="mt-4 space-y-3">
        {/* Limit Group */}
        <div className="flex items-center gap-2">
          <LucideReact.Users size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">
            {groupLabels[value.limit]}
          </span>
        </div>

        {/* Origin */}
        <div className="flex items-center gap-2">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700 truncate" title={value.origin}>
            {value.origin}
          </span>
        </div>

        {/* Expiration */}
        <div className="flex items-center gap-2">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">{formattedExpires}</span>
          {isExpired ? (
            <span className="ml-auto flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded">
              <LucideReact.XCircle size={14} /> Expired
            </span>
          ) : (
            <span className="ml-auto flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
              <LucideReact.CheckCircle size={14} /> {relativeExpires}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
