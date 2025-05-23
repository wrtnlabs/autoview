import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Page Build
     *
     * @title Page Build
    */
    export interface page_build {
        url: string & tags.Format<"uri">;
        status: string;
        error: {
            message: string | null;
        };
        pusher: AutoViewInputSubTypes.nullable_simple_user;
        commit: string;
        duration: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.page_build;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusKey = value.status.toLowerCase();
  let StatusIcon = LucideReact.Circle;
  let statusColor = "text-gray-500";
  if (statusKey.includes("success") || statusKey.includes("passed") || statusKey.includes("complete")) {
    StatusIcon = LucideReact.CheckCircle;
    statusColor = "text-green-500";
  } else if (statusKey.includes("fail") || statusKey.includes("error")) {
    StatusIcon = LucideReact.AlertTriangle;
    statusColor = "text-red-500";
  } else if (statusKey.includes("pending") || statusKey.includes("in_progress") || statusKey.includes("queued")) {
    StatusIcon = LucideReact.Clock;
    statusColor = "text-amber-500";
  }

  const shortCommit = value.commit.slice(0, 7);
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();

  const totalSeconds = value.duration;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const formattedDuration = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  const pusher = value.pusher;
  const pusherName = pusher ? (pusher.name ?? pusher.login) : "Unknown";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    pusherName
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = pusher?.avatar_url || avatarFallback;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusIcon size={20} className={statusColor} aria-label={value.status} />
          <span className="font-semibold text-gray-700 truncate">{shortCommit}</span>
        </div>
        <span className="text-sm text-gray-500">{createdAt}</span>
      </div>

      {value.error?.message && (
        <div className="flex items-center gap-1 bg-red-50 text-red-700 text-sm p-2 rounded">
          <LucideReact.AlertTriangle size={16} />
          <span>{value.error.message}</span>
        </div>
      )}

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
          <img
            src={avatarSrc}
            alt={pusherName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = avatarFallback;
            }}
          />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-800">{pusherName}</div>
          <div className="text-xs text-gray-500">Pusher</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Clock size={16} className="text-gray-400" />
          <span>{formattedDuration}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{updatedAt}</span>
        </div>
        <div className="col-span-2 flex items-center gap-1 break-all">
          <LucideReact.Link size={16} className="text-gray-400" />
          <span>{value.url}</span>
        </div>
      </div>
    </div>
  );
}
