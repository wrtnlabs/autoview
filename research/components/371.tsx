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
  const subscriptionStatus = value.subscribed
    ? { text: 'Subscribed', bgColor: 'bg-green-100', textColor: 'text-green-800' }
    : { text: 'Unsubscribed', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };

  const ignoredStatus = value.ignored
    ? { text: 'Ignored', bgColor: 'bg-red-100', textColor: 'text-red-800' }
    : { text: 'Not Ignored', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };

  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'N/A';

  const primaryUrl = value.thread_url ?? value.repository_url ?? value.url;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Thread Subscription</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded ${subscriptionStatus.bgColor} ${subscriptionStatus.textColor}`}
        >
          {subscriptionStatus.text}
        </span>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded ${ignoredStatus.bgColor} ${ignoredStatus.textColor}`}
        >
          {ignoredStatus.text}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700">Thread URL</h3>
        <p className="mt-1 text-sm text-blue-600 truncate">{primaryUrl}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700">Reason</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {value.reason ?? 'None'}
        </p>
      </div>

      <div className="flex justify-between text-sm text-gray-700">
        <span>Created At</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}
