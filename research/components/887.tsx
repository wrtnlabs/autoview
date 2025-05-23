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
  const formattedDate = new Date(value.created_at).toLocaleString();
  const statusInfo = value.ignored
    ? {
        label: "Notifications Blocked",
        icon: (
          <LucideReact.BellOff
            className="text-red-500"
            size={16}
            aria-label="Blocked"
          />
        ),
      }
    : value.subscribed
    ? {
        label: "Subscribed",
        icon: (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={16}
            aria-label="Subscribed"
          />
        ),
      }
    : {
        label: "Not Subscribed",
        icon: (
          <LucideReact.BellOff
            className="text-gray-500"
            size={16}
            aria-label="Not Subscribed"
          />
        ),
      };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md">
      <div className="flex items-center gap-2">
        {statusInfo.icon}
        <span className="text-gray-800 font-medium">{statusInfo.label}</span>
      </div>

      {value.reason && (
        <div className="mt-3 flex items-start gap-2">
          <LucideReact.Info
            className="text-blue-500 mt-0.5"
            size={16}
            aria-label="Reason"
          />
          <p className="text-gray-600 text-sm leading-snug">{value.reason}</p>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        <LucideReact.Calendar
          className="text-gray-400"
          size={16}
          aria-label="Created At"
        />
        <time
          dateTime={value.created_at}
          className="text-gray-600 text-sm"
        >
          {formattedDate}
        </time>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <LucideReact.Link
          className="text-blue-500"
          size={16}
          aria-label="Repository URL"
        />
        <a
          href={value.repository_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline truncate"
        >
          {value.repository_url}
        </a>
      </div>
    </div>
  );
}
