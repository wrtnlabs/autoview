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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define derived constants for status and formatted date.
  const status = value.ignored
    ? "Ignored"
    : value.subscribed
      ? "Subscribed"
      : "Not Subscribed";
  const statusIcon = value.ignored ? (
    <LucideReact.XCircle className="text-red-500" size={16} />
  ) : value.subscribed ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : (
    <LucideReact.XCircle className="text-gray-500" size={16} />
  );
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.GitBranch className="text-gray-600 mr-2" size={20} />
        Repository Subscription
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {statusIcon}
          <span className="font-medium text-gray-700">{status}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <LucideReact.Calendar size={16} />
          <span>Created: {formattedDate}</span>
        </div>
        {value.reason && (
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <LucideReact.Info size={16} className="mt-0.5" />
            <span className="truncate" title={value.reason}>
              {value.reason}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-blue-600 break-all">
          <LucideReact.Link size={16} />
          <span>{value.repository_url}</span>
        </div>
      </div>
    </div>
  );
}
