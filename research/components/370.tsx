import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const formattedDate: string = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
      {/* Subscription & Ignored Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {value.subscribed ? (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={20}
              aria-label="Subscribed"
            />
          ) : (
            <LucideReact.XCircle
              className="text-red-500"
              size={20}
              aria-label="Not Subscribed"
            />
          )}
          <span className="font-medium text-gray-800">
            {value.subscribed ? "Subscribed" : "Not Subscribed"}
          </span>
        </div>
        {value.ignored && (
          <div className="flex items-center gap-1 text-yellow-600">
            <LucideReact.EyeOff size={18} aria-label="Ignored" />
            <span className="text-sm">Ignored</span>
          </div>
        )}
      </div>

      {/* Reason */}
      {value.reason && (
        <div className="mb-3">
          <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            <LucideReact.Tag size={14} className="mr-1" aria-hidden="true" />
            <span className="truncate max-w-xs">{value.reason}</span>
          </div>
        </div>
      )}

      {/* Creation Date */}
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <LucideReact.Calendar size={16} className="mr-1" aria-hidden="true" />
        <span>Since {formattedDate}</span>
      </div>

      {/* URLs */}
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-start gap-1 break-all">
          <LucideReact.Link
            size={16}
            className="mt-[2px] text-gray-500"
            aria-hidden="true"
          />
          <span>{value.url}</span>
        </div>
        {value.thread_url && (
          <div className="flex items-start gap-1 break-all">
            <LucideReact.MessageCircle
              size={16}
              className="mt-[2px] text-gray-500"
              aria-hidden="true"
            />
            <span>{value.thread_url}</span>
          </div>
        )}
        {value.repository_url && (
          <div className="flex items-start gap-1 break-all">
            <LucideReact.GitBranch
              size={16}
              className="mt-[2px] text-gray-500"
              aria-hidden="true"
            />
            <span>{value.repository_url}</span>
          </div>
        )}
      </div>
    </div>
  );
}
