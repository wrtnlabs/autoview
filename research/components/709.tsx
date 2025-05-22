import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * The status of a commit.
   *
   * @title Status
   */
  export type status = {
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
  };
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
  const renderStateIcon = (state: string): JSX.Element => {
    switch (state) {
      case "success":
        return <LucideReact.CheckCircle size={16} className="text-green-500" />;
      case "pending":
        return <LucideReact.Clock size={16} className="text-amber-500" />;
      case "failure":
        return <LucideReact.XCircle size={16} className="text-red-500" />;
      case "error":
        return <LucideReact.AlertTriangle size={16} className="text-red-500" />;
      default:
        return <LucideReact.HelpCircle size={16} className="text-gray-500" />;
    }
  };

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // 3. Return the React element.
  return (
    <div className="space-y-4">
      {value.map((item) => {
        const creator = item.creator;
        const displayName =
          creator && creator.name
            ? creator.name
            : creator
              ? creator.login
              : "Unknown";
        const avatarSrc =
          creator && creator.avatar_url
            ? creator.avatar_url
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName,
              )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-start md:items-center p-4 bg-white rounded-lg shadow"
          >
            <div className="flex-shrink-0">
              <img
                src={avatarSrc}
                alt={`${displayName} avatar`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName,
                  )}&background=0D8ABC&color=fff`;
                }}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="mt-3 md:mt-0 md:ml-4 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-800">
                <span>{displayName}</span>
                {renderStateIcon(item.state)}
                <span className="text-gray-500">{item.context}</span>
              </div>
              {item.description && (
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center text-xs text-gray-400 gap-4">
                <div className="flex items-center">
                  <LucideReact.Calendar size={14} className="mr-1" />
                  <span>{formatDate(item.created_at)}</span>
                </div>
                {item.target_url && (
                  <div className="flex items-center max-w-xs truncate">
                    <LucideReact.Link size={14} className="mr-1" />
                    <span className="truncate">{item.target_url}</span>
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
