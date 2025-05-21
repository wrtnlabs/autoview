import { tags } from "typia";
import React from "react";
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
  const createdAt = new Date(value.created_at);
  const updatedAt = new Date(value.updated_at);

  const formattedCreated = createdAt.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formattedUpdated = updatedAt.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const isArchived = Boolean(value.archived);
  const statusLabel = isArchived ? 'Archived' : 'Active';
  const statusColor = isArchived
    ? 'bg-red-100 text-red-800'
    : 'bg-green-100 text-green-800';

  const creator = value.creator;
  const creatorLogin = creator?.login ?? 'Unknown User';
  const creatorName = creator?.name ?? '';
  const avatarUrl = creator?.avatar_url;

  const rawNote = value.note ?? '';
  const displayNote =
    rawNote.trim().length > 0 ? rawNote.trim() : 'No description provided.';

  const columnName = value.column_name ?? 'Unassigned Column';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-4 flex flex-col space-y-4">
      {/* Header with creator info and status badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={creatorLogin}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {creatorLogin}
            </span>
            {creatorName && (
              <span className="text-xs text-gray-500 truncate">
                {creatorName}
              </span>
            )}
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Column name */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {columnName}
        </h3>
      </div>

      {/* Card note */}
      <p className="text-sm text-gray-700 line-clamp-3">{displayNote}</p>

      {/* Timestamps */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Created: {formattedCreated}</span>
        <span>Updated: {formattedUpdated}</span>
      </div>
    </div>
  );
}
