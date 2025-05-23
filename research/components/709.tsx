import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The status of a commit.
     *
     * @title Status
    */
    export interface status {
        url: string;
        avatar_url: string | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        state: string;
        description: string | null;
        target_url: string | null;
        context: string;
        created_at: string;
        updated_at: string;
        creator: AutoViewInputSubTypes.nullable_simple_user;
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
export type AutoViewInput = AutoViewInputSubTypes.status[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    - Sort statuses by creation date (newest first)
  const sortedStatuses = React.useMemo(() => {
    return [...value].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [value]);

  //    - Helper to format ISO timestamp into readable string
  const formatDate = (iso: string) => {
    const dt = new Date(iso);
    return dt.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  //    - Map status.state to an icon and color
  const getStateIcon = (state: string) => {
    switch (state.toLowerCase()) {
      case 'success':
        return (
          <LucideReact.CheckCircle
            size={16}
            className="text-green-500 flex-shrink-0"
            aria-label="Success"
          />
        );
      case 'failure':
      case 'error':
        return (
          <LucideReact.AlertTriangle
            size={16}
            className="text-red-500 flex-shrink-0"
            aria-label="Error"
          />
        );
      case 'pending':
      case 'waiting':
        return (
          <LucideReact.Clock
            size={16}
            className="text-amber-500 flex-shrink-0"
            aria-label="Pending"
          />
        );
      default:
        return (
          <LucideReact.Info
            size={16}
            className="text-gray-400 flex-shrink-0"
            aria-label={state}
          />
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (sortedStatuses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No statuses available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md divide-y divide-gray-200">
      {sortedStatuses.map((status) => {
        const creator = status.creator;
        // Choose avatar or fallback
        const avatarUrl =
          creator && creator.avatar_url
            ? creator.avatar_url
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                status.context,
              )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={status.id + '|' + status.context}
            className="flex items-start space-x-4 py-4"
          >
            <img
              src={avatarUrl}
              alt={creator?.login ?? 'Avatar'}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-gray-100"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStateIcon(status.state)}
                  <span className="font-medium text-gray-800 truncate">
                    {status.context}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(status.created_at)}
                </span>
              </div>
              {status.description && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {status.description}
                </p>
              )}
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                {creator && (
                  <div className="flex items-center gap-1">
                    <LucideReact.User size={14} className="text-gray-400" />
                    <span className="truncate">{creator.login}</span>
                  </div>
                )}
                {status.target_url && (
                  <div className="flex items-center gap-1">
                    <LucideReact.Link size={14} className="text-gray-400" />
                    <span className="truncate">{status.target_url}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
