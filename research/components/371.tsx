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
  const formattedDate = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 gap-2">
        <LucideReact.Bell size={20} className="text-blue-500" />
        Thread Subscription
      </h2>

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subscription:</span>
          <div className="flex items-center gap-1">
            {value.subscribed ? (
              <LucideReact.CheckCircle size={16} className="text-green-500" />
            ) : (
              <LucideReact.XCircle size={16} className="text-red-500" />
            )}
            <span className="text-gray-800">
              {value.subscribed ? "Subscribed" : "Unsubscribed"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Ignored:</span>
          <div className="flex items-center gap-1">
            {value.ignored ? (
              <LucideReact.AlertTriangle size={16} className="text-amber-500" />
            ) : (
              <LucideReact.CheckCircle size={16} className="text-green-500" />
            )}
            <span className="text-gray-800">
              {value.ignored ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {value.reason !== null && value.reason !== "" && (
          <div>
            <span className="text-gray-600">Reason:</span>
            <p className="mt-1 text-gray-800 line-clamp-2">{value.reason}</p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span className="text-gray-600">Created at:</span>
          <span className="text-gray-800">{formattedDate}</span>
        </div>

        <div>
          <span className="text-gray-600">Links:</span>
          <ul className="mt-1 space-y-1">
            <li className="flex items-center gap-2">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span className="text-blue-600 break-all">{value.url}</span>
            </li>
            {value.thread_url && (
              <li className="flex items-center gap-2">
                <LucideReact.Link size={16} className="text-gray-400" />
                <span className="text-blue-600 break-all">
                  {value.thread_url}
                </span>
              </li>
            )}
            {value.repository_url && (
              <li className="flex items-center gap-2">
                <LucideReact.GitBranch size={16} className="text-gray-400" />
                <span className="text-blue-600 break-all">
                  {value.repository_url}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
