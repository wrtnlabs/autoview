import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Repository invitations let you manage who you collaborate with.
   *
   * @title Repository Invitation
   */
  export type repository_subscription = {
    /**
     * Determines if notifications should be received from this repository.
     */
    subscribed: boolean;
    /**
     * Determines if all notifications should be blocked from this repository.
     */
    ignored: boolean;
    reason: string | null;
    created_at: string & tags.Format<"date-time">;
    url: string & tags.Format<"uri">;
    repository_url: string & tags.Format<"uri">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.repository_subscription;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derive repository display name from its URL
  const repoName = value.repository_url.split("/").slice(-2).join("/");
  // Format creation date for readability
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md space-y-3">
      {/* Repository Name */}
      <div className="flex items-center gap-2">
        <LucideReact.GitBranch
          size={20}
          className="text-gray-500"
          aria-hidden
        />
        <span className="font-semibold text-gray-900 truncate">{repoName}</span>
      </div>

      {/* Subscription Status */}
      <div className="flex items-center gap-1">
        {value.ignored ? (
          <LucideReact.BellOff
            size={16}
            className="text-amber-500"
            aria-label="Ignored"
          />
        ) : value.subscribed ? (
          <LucideReact.CheckCircle
            size={16}
            className="text-green-500"
            aria-label="Subscribed"
          />
        ) : (
          <LucideReact.XCircle
            size={16}
            className="text-red-500"
            aria-label="Unsubscribed"
          />
        )}
        <span className="text-sm text-gray-700">
          {value.ignored
            ? "Ignored"
            : value.subscribed
              ? "Subscribed"
              : "Unsubscribed"}
        </span>
      </div>

      {/* Repository URL (display only) */}
      <div className="flex items-center gap-1 text-sm text-blue-600 truncate">
        <LucideReact.Link size={16} className="text-gray-400" aria-hidden />
        <span className="truncate">{value.repository_url}</span>
      </div>

      {/* Reason, if provided */}
      {value.reason && (
        <div className="text-sm text-gray-600 line-clamp-2">
          <span className="font-medium">Reason:</span>{" "}
          <span>{value.reason}</span>
        </div>
      )}

      {/* Creation Date */}
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <LucideReact.Calendar size={16} className="text-gray-400" aria-hidden />
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}
