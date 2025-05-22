import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Derive repository path (e.g., "owner/repo") from the full URL.
  const repoPath = (() => {
    try {
      const parts = value.repository_url.split("/").filter(Boolean);
      return parts.slice(-2).join("/") || value.repository_url;
    } catch {
      return value.repository_url;
    }
  })();

  //    Format the creation date into a human-readable string.
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  //    Determine subscription status text and corresponding badge color.
  let statusText: string;
  let statusClasses: string;
  if (value.ignored) {
    statusText = "Notifications Ignored";
    statusClasses = "bg-red-100 text-red-800";
  } else if (value.subscribed) {
    statusText = "Subscribed";
    statusClasses = "bg-green-100 text-green-800";
  } else {
    statusText = "Unsubscribed";
    statusClasses = "bg-gray-100 text-gray-800";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: repository name and status badge */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{repoPath}</h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses}`}
        >
          {statusText}
        </span>
      </div>

      {/* Metadata: creation date */}
      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Created:</span> {formattedDate}
      </div>

      {/* Optional reason for subscription/ignore */}
      {value.reason && (
        <div className="text-sm italic text-gray-500 line-clamp-2">
          <span className="font-medium">Reason:</span> {value.reason}
        </div>
      )}
    </div>
  );
}
