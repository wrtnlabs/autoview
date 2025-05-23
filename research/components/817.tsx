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
  const statusLower = value.status.toLowerCase();
  let StatusIcon = LucideReact.Circle;
  let statusColorClass = 'text-gray-500';
  let statusLabel = value.status.charAt(0).toUpperCase() + value.status.slice(1);

  if (statusLower.includes('success')) {
    StatusIcon = LucideReact.CheckCircle;
    statusColorClass = 'text-green-500';
    statusLabel = 'Success';
  } else if (statusLower.includes('fail') || statusLower.includes('error')) {
    StatusIcon = LucideReact.AlertTriangle;
    statusColorClass = 'text-red-500';
    statusLabel = 'Error';
  } else if (statusLower.includes('pending') || statusLower.includes('in_progress') || statusLower.includes('running')) {
    StatusIcon = LucideReact.Clock;
    statusColorClass = 'text-amber-500';
    statusLabel = value.status.charAt(0).toUpperCase() + value.status.slice(1);
  }

  const commitShort = value.commit.slice(0, 7);
  const minutes = Math.floor(value.duration / 60000);
  const seconds = ((value.duration % 60000) / 1000).toFixed(0);
  const durationLabel = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const updatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const pusherName = value.pusher?.name || value.pusher?.login || 'Unknown';
  const avatarUrl =
    value.pusher?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(pusherName)}&background=random`;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      pusherName,
    )}&background=random`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusIcon className={statusColorClass} size={20} />
          <span className="text-lg font-semibold text-gray-800">{statusLabel}</span>
        </div>
        <span className="text-sm text-gray-500">{durationLabel}</span>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={pusherName}
          className="w-10 h-10 rounded-full object-cover"
          onError={handleImgError}
        />
        <div className="flex flex-col">
          <span className="text-gray-800 font-medium">{pusherName}</span>
          {value.pusher?.login && <span className="text-sm text-gray-500">@{value.pusher.login}</span>}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <LucideReact.GitCommit size={16} className="text-gray-400" />
        <span>{commitShort}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.RefreshCw size={16} className="text-gray-400" />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 break-all">
        <LucideReact.Link size={16} className="text-gray-400" />
        <span>{value.url}</span>
      </div>

      {value.error?.message && (
        <div className="flex items-start gap-2 text-sm text-red-600">
          <LucideReact.AlertTriangle size={16} className="flex-shrink-0" />
          <span>Error: {value.error.message}</span>
        </div>
      )}
    </div>
  );
}
