import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Project cards represent a scope of work.
   *
   * @title Project Card
   */
  export type project_card = {
    url: string & tags.Format<"uri">;
    /**
     * The project card's ID
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    note: string | null;
    creator: AutoViewInputSubTypes.nullable_simple_user;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    /**
     * Whether or not the card is archived
     */
    archived?: boolean;
    column_name?: string;
    project_id?: string;
    column_url: string & tags.Format<"uri">;
    content_url?: string & tags.Format<"uri">;
    project_url: string & tags.Format<"uri">;
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
export type AutoViewInput = AutoViewInputSubTypes.project_card[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " " +
      date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    );
  };

  const avatarFallback = (login: string): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=random&color=fff`;

  // 3. Return the React element
  // Empty state
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2">No project cards available</span>
      </div>
    );
  }

  // List of project cards
  return (
    <div className="space-y-4">
      {value.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center"
        >
          {/* Creator Info */}
          <div className="flex items-center flex-shrink-0">
            <img
              src={
                card.creator?.avatar_url ??
                avatarFallback(card.creator?.login ?? "User")
              }
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = avatarFallback(card.creator?.login ?? "User");
              }}
              alt={card.creator?.login ?? "User avatar"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <div className="font-semibold text-gray-800">
                {card.creator?.login ?? "Unknown User"}
              </div>
              <div className="text-xs text-gray-500">
                User ID: {card.creator?.id ?? "-"}
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="mt-3 sm:mt-0 sm:ml-6 flex-1">
            <h3 className="font-medium text-gray-900 line-clamp-2">
              {card.note ?? "No description provided."}
            </h3>
            <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-3">
              {card.column_name && (
                <div className="flex items-center">
                  <LucideReact.Tag size={16} className="text-blue-500" />
                  <span className="ml-1">{card.column_name}</span>
                </div>
              )}
              {card.archived && (
                <div className="flex items-center">
                  <LucideReact.Archive size={16} className="text-gray-500" />
                  <span className="ml-1">Archived</span>
                </div>
              )}
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="ml-1">
                  Created: {formatDate(card.created_at)}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.Edit2 size={16} className="text-gray-400" />
                <span className="ml-1">
                  Updated: {formatDate(card.updated_at)}
                </span>
              </div>
            </div>
          </div>

          {/* URLs Display */}
          <div className="mt-3 sm:mt-0 sm:ml-6 flex-shrink-0 space-y-1 text-sm text-gray-500">
            <div className="flex items-center">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span className="ml-1 truncate">{card.project_url}</span>
            </div>
            {card.content_url && (
              <div className="flex items-center">
                <LucideReact.Link2 size={16} className="text-gray-400" />
                <span className="ml-1 truncate">{card.content_url}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
