import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Repository invitations let you manage who you collaborate with.
     *
     * @title Repository Invitation
    */
    export interface repository_subscription {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.repository_subscription;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const subscriptionStatus = value.ignored
    ? 'Ignored'
    : value.subscribed
    ? 'Subscribed'
    : 'Unsubscribed';

  const statusIcon =
    value.ignored ? (
      <LucideReact.AlertTriangle className="text-red-500" size={16} />
    ) : value.subscribed ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : (
      <LucideReact.XCircle className="text-gray-500" size={16} />
    );

  let repoPath: string;
  try {
    const path = new URL(value.repository_url).pathname.replace(/^\/repos\//, '');
    repoPath = path || value.repository_url;
  } catch {
    repoPath = value.repository_url;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <LucideReact.Folder className="text-gray-500" size={20} />
        <span className="text-lg font-semibold text-gray-800 truncate">
          {repoPath}
        </span>
      </div>
      <div className="flex items-center gap-1">
        {statusIcon}
        <span className="text-sm font-medium text-gray-700">
          {subscriptionStatus}
        </span>
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <LucideReact.Calendar className="text-gray-400" size={16} />
        <span>{formattedDate}</span>
      </div>
      {value.reason && (
        <div className="flex items-start gap-1 text-sm text-gray-600">
          <LucideReact.Info className="text-gray-400 mt-0.5" size={16} />
          <span className="italic">Reason: {value.reason}</span>
        </div>
      )}
    </div>
  );
}
