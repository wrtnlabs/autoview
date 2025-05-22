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
  const {
    creator,
    note,
    content_url,
    column_name,
    archived,
    project_url,
    created_at,
  } = value;

  const creatorLogin = creator?.login ?? "Unknown";
  const avatarSrc =
    creator?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      creatorLogin,
    )}&background=random&color=fff`;

  const formattedCreated = new Date(created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleAvatarError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      creatorLogin,
    )}&background=random&color=fff`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col space-y-3">
      {/* Header: Creator and Created Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={avatarSrc}
            alt={creatorLogin}
            onError={handleAvatarError}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">
            {creatorLogin}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <LucideReact.Calendar size={16} />
          <span>{formattedCreated}</span>
        </div>
      </div>

      {/* Status & Column */}
      {archived && (
        <div className="inline-flex items-center text-red-500 text-xs font-semibold">
          <LucideReact.Archive size={14} className="mr-1" />
          <span>Archived</span>
        </div>
      )}
      {column_name && (
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Tag size={16} className="mr-1" />
          <span>{column_name}</span>
        </div>
      )}

      {/* Description or Content Link */}
      <div className="text-gray-800 text-sm line-clamp-2">
        {note ? (
          note
        ) : content_url ? (
          <a
            href={content_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline"
          >
            <LucideReact.Link size={16} />
            <span className="ml-1">View content</span>
          </a>
        ) : (
          <span className="text-gray-400">No description</span>
        )}
      </div>

      {/* Project Link */}
      <div className="flex items-center text-sm text-gray-500">
        <LucideReact.Link size={16} className="mr-1" />
        <a
          href={project_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          View project
        </a>
      </div>
    </div>
  );
}
