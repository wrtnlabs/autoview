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
  const status = value.ignored
    ? { label: "Ignored", Icon: LucideReact.EyeOff, color: "text-amber-500" }
    : value.subscribed
    ? { label: "Subscribed", Icon: LucideReact.CheckCircle, color: "text-green-500" }
    : { label: "Unsubscribed", Icon: LucideReact.XCircle, color: "text-red-500" };

  const { label: statusLabel, Icon: StatusIcon, color: statusColor } = status;

  const formattedDate = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow border border-gray-200 space-y-4 text-gray-800">
      {/* Status */}
      <div className="flex items-center space-x-2">
        <StatusIcon className={`w-5 h-5 ${statusColor}`} />
        <span className="font-semibold">{statusLabel}</span>
      </div>

      {/* Created At */}
      {formattedDate && (
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <LucideReact.Calendar className="w-4 h-4" />
          <time dateTime={value.created_at ?? undefined}>{formattedDate}</time>
        </div>
      )}

      {/* Reason */}
      {value.reason && (
        <div className="flex items-start space-x-2 bg-yellow-50 p-2 rounded text-yellow-900 text-sm">
          <LucideReact.AlertTriangle className="w-4 h-4 mt-0.5" />
          <p className="line-clamp-3">{value.reason}</p>
        </div>
      )}

      {/* Links */}
      <div className="space-y-2">
        {/* Subscription URL */}
        <div className="flex items-center space-x-2">
          <LucideReact.Link className="w-4 h-4 text-gray-400" />
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate"
            title={value.url}
          >
            Subscription
          </a>
        </div>
        {/* Thread URL */}
        {value.thread_url && (
          <div className="flex items-center space-x-2">
            <LucideReact.MessageCircle className="w-4 h-4 text-gray-400" />
            <a
              href={value.thread_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
              title={value.thread_url}
            >
              Thread
            </a>
          </div>
        )}
        {/* Repository URL */}
        {value.repository_url && (
          <div className="flex items-center space-x-2">
            <LucideReact.GitBranch className="w-4 h-4 text-gray-400" />
            <a
              href={value.repository_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
              title={value.repository_url}
            >
              Repository
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
