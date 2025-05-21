import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Thread Subscription
     *
     * @title Thread Subscription
    */
    export type thread_subscription = {
        subscribed: boolean;
        ignored: boolean;
        reason: string | null;
        created_at: (string & tags.Format<"date-time">) | null;
        url: string & tags.Format<"uri">;
        thread_url?: string & tags.Format<"uri">;
        repository_url?: string & tags.Format<"uri">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.thread_subscription;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate =
    value.created_at
      ? new Date(value.created_at).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      : "N/A";

  const statusBadge = value.subscribed ? (
    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm">
      Subscribed
    </span>
  ) : (
    <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-sm">
      Unsubscribed
    </span>
  );

  const ignoredBadge = value.ignored ? (
    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-sm">
      Ignored
    </span>
  ) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header with status badges */}
      <div className="flex flex-wrap items-center space-x-2 mb-4">
        {statusBadge}
        {ignoredBadge}
      </div>

      {/* Details grid */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {/* Created At */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Created At</dt>
          <dd className="mt-1 text-sm text-gray-900">{formattedDate}</dd>
        </div>

        {/* Reason, if provided */}
        {value.reason !== null && value.reason !== "" && (
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Reason</dt>
            <dd className="mt-1 text-sm text-gray-900 line-clamp-2 break-words">
              {value.reason}
            </dd>
          </div>
        )}

        {/* Subscription URL */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Subscription URL</dt>
          <dd className="mt-1 text-sm text-blue-600 font-mono break-all">
            {value.url}
          </dd>
        </div>

        {/* Thread URL, if available */}
        {value.thread_url && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Thread URL</dt>
            <dd className="mt-1 text-sm text-blue-600 font-mono break-all">
              {value.thread_url}
            </dd>
          </div>
        )}

        {/* Repository URL, if available */}
        {value.repository_url && (
          <div>
            <dt className="text-sm font-medium text-gray-500">Repository URL</dt>
            <dd className="mt-1 text-sm text-blue-600 font-mono break-all">
              {value.repository_url}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
