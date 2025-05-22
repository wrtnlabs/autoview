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
  const subscriptionStatus = value.ignored
    ? "Notifications Blocked"
    : value.subscribed
    ? "Subscribed"
    : "Not Subscribed";

  const statusColor = value.ignored
    ? "bg-red-100 text-red-800"
    : value.subscribed
    ? "bg-green-100 text-green-800"
    : "bg-gray-100 text-gray-800";

  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Subscription</h2>
        <span
          className={`px-2 py-1 text-sm font-medium rounded ${statusColor}`}
        >
          {subscriptionStatus}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium text-gray-900">Subscribed On:</span>{" "}
          {formattedDate}
        </div>
        {value.reason && (
          <div>
            <span className="font-medium text-gray-900">Reason:</span>{" "}
            <span className="italic">{value.reason}</span>
          </div>
        )}
      </div>
    </div>
  );
}
