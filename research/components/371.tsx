import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Thread Subscription
     *
     * @title Thread Subscription
    */
    export interface thread_subscription {
        subscribed: boolean;
        ignored: boolean;
        reason: string | null;
        created_at: (string & tags.Format<"date-time">) | null;
        url: string & tags.Format<"uri">;
        thread_url?: string & tags.Format<"uri">;
        repository_url?: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.thread_subscription;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '—';

  const isIgnored = value.ignored;
  const isSubscribed = value.subscribed;
  const statusText = isIgnored
    ? 'Ignored'
    : isSubscribed
    ? 'Subscribed'
    : 'Unsubscribed';
  const statusIcon = isIgnored ? (
    <LucideReact.EyeOff className="text-gray-500" size={16} />
  ) : isSubscribed ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : (
    <LucideReact.XCircle className="text-red-500" size={16} />
  );
  const statusBg = isIgnored
    ? 'bg-gray-100 text-gray-700'
    : isSubscribed
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-4 text-gray-800">
      {/* Status Badge */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusBg} text-sm font-semibold`}
      >
        {statusIcon}
        <span>{statusText}</span>
      </div>

      {/* Details */}
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <dt className="font-medium">Created</dt>
          <dd className="ml-1">{createdAt}</dd>
        </div>

        <div className="flex items-center gap-1">
          <LucideReact.Link size={16} className="text-gray-500" />
          <dt className="font-medium">URL</dt>
          <dd className="ml-1 truncate">{value.url}</dd>
        </div>

        {value.thread_url && (
          <div className="flex items-center gap-1">
            <LucideReact.MessageCircle size={16} className="text-gray-500" />
            <dt className="font-medium">Thread URL</dt>
            <dd className="ml-1 truncate">{value.thread_url}</dd>
          </div>
        )}

        {value.repository_url && (
          <div className="flex items-center gap-1">
            <LucideReact.GitBranch size={16} className="text-gray-500" />
            <dt className="font-medium">Repository</dt>
            <dd className="ml-1 truncate">{value.repository_url}</dd>
          </div>
        )}
      </dl>

      {/* Reason */}
      {value.reason && (
        <div>
          <dt className="font-medium">Reason</dt>
          <dd className="mt-1 text-sm text-gray-700 line-clamp-3">{value.reason}</dd>
        </div>
      )}
    </div>
  );
}
