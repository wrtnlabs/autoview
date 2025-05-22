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
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isArchived = value.archived ?? false;
  const note = value.note ?? "No description provided";
  const columnName = value.column_name ?? "Unassigned Column";
  const creator = value.creator;
  const creatorName = creator?.name?.trim() || creator?.login || "Unknown";
  const avatarUrl = creator?.avatar_url;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-4">
      {/* Header: Column name and status badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">{columnName}</span>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            isArchived ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          {isArchived ? "Archived" : "Active"}
        </span>
      </div>

      {/* Main content: Note/description */}
      <p className="text-gray-900 text-lg font-semibold mb-2 line-clamp-3">
        {note}
      </p>

      {/* Footer: Creator info and timestamps */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={creatorName}
              className="w-8 h-8 rounded-full mr-2"
              loading="lazy"
            />
          )}
          <span className="text-sm text-gray-800">{creatorName}</span>
        </div>
        <span className="text-sm text-gray-600">{createdAt}</span>
      </div>
      <p className="mt-1 text-xs text-gray-500">Updated: {updatedAt}</p>
    </div>
  );
}
