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
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updatedDate = new Date(value.updated_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isArchived = value.archived ?? false;
  const columnName = value.column_name ?? "Uncategorized";
  const displayCreatorName =
    value.creator?.name ?? value.creator?.login ?? "Unknown";
  const avatarSrc =
    value.creator?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayCreatorName)}`;
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayCreatorName,
    )}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-4">
      <div className="w-12 h-12 flex-shrink-0">
        <img
          src={avatarSrc}
          alt={displayCreatorName}
          onError={handleImageError}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h2
            className="text-lg font-semibold text-gray-800 line-clamp-2"
            title={value.note ?? "Project Card"}
          >
            {value.note ?? "Project Card"}
          </h2>
          {isArchived ? (
            <span className="flex items-center text-sm text-red-500">
              <LucideReact.Archive
                size={16}
                className="mr-1"
                aria-label="Archived"
              />
              Archived
            </span>
          ) : (
            <span className="flex items-center text-sm text-green-500">
              <LucideReact.CheckCircle
                size={16}
                className="mr-1"
                aria-label="Active"
              />
              Active
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-4">
          <div className="flex items-center">
            <LucideReact.Tag size={16} className="mr-1" aria-label="Column" />
            {columnName}
          </div>
          <div className="flex items-center">
            <LucideReact.Calendar
              size={16}
              className="mr-1"
              aria-label="Created"
            />
            {createdDate}
          </div>
          <div className="flex items-center">
            <LucideReact.Calendar
              size={16}
              className="mr-1"
              aria-label="Updated"
            />
            {updatedDate}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center text-sm text-gray-600 gap-4">
          <a
            href={value.project_url}
            className="flex items-center hover:text-blue-600 truncate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LucideReact.Link
              size={16}
              className="mr-1"
              aria-label="Project URL"
            />
            Project
          </a>
          {value.content_url && (
            <a
              href={value.content_url}
              className="flex items-center hover:text-blue-600 truncate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LucideReact.Link
                size={16}
                className="mr-1"
                aria-label="Content URL"
              />
              Content
            </a>
          )}
          <div className="flex items-center truncate">
            <LucideReact.User size={16} className="mr-1" aria-label="Creator" />
            {displayCreatorName}
          </div>
        </div>
      </div>
    </div>
  );
}
