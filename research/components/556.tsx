import * as LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.project_card;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isArchived = Boolean(value.archived);
  const statusIcon = isArchived ? (
    <LucideReact.XCircle className="text-red-500" size={16} />
  ) : (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  );
  const statusText = isArchived ? "Archived" : "Active";

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const creator = value.creator;
  const creatorName = creator?.login ?? "Unknown";
  const avatarSrc =
    creator?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(creatorName)}&background=0D8ABC&color=fff`;
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creatorName)}&background=0D8ABC&color=fff`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          {statusIcon}
          <span
            className={`text-sm font-semibold ${isArchived ? "text-red-600" : "text-green-600"}`}
          >
            {statusText}
          </span>
        </div>
        <span className="text-sm text-gray-400">#{value.id}</span>
      </div>

      {value.column_name && (
        <div className="text-sm text-gray-500 mb-2">
          Column:{" "}
          <span className="font-medium text-gray-700">{value.column_name}</span>
        </div>
      )}

      <div className="mt-2 text-gray-800 text-sm line-clamp-3">
        {value.note ?? "No description provided."}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          <img
            src={avatarSrc}
            alt={creatorName}
            className="w-6 h-6 rounded-full object-cover"
            onError={handleImgError}
          />
          <span>{creatorName}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {formatDate(value.created_at)}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Updated: {formatDate(value.updated_at)}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-blue-600">
        <div className="flex items-center gap-1 truncate">
          <LucideReact.Link size={16} />
          <span className="truncate">{value.url}</span>
        </div>
        {value.content_url && (
          <div className="flex items-center gap-1 truncate">
            <LucideReact.Link size={16} />
            <span className="truncate">{value.content_url}</span>
          </div>
        )}
      </div>
    </div>
  );
}
