import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Project cards represent a scope of work.
     *
     * @title Project Card
    */
    export interface project_card {
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
export type AutoViewInput = AutoViewInputSubTypes.project_card;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreated = new Date(value.created_at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedUpdated = new Date(value.updated_at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  // Fallback name for avatar placeholder
  const avatarName = value.creator
    ? value.creator.name || value.creator.login
    : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-4 flex flex-col space-y-4">
      {/* Header: Note and Archived Badge */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {value.note ?? "No Description"}
        </h2>
        {value.archived && (
          <div className="flex items-center text-sm text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
            <LucideReact.Archive size={16} className="mr-1" />
            <span>Archived</span>
          </div>
        )}
      </div>

      {/* Meta Information: Column, Project URL, Content URL */}
      <div className="text-sm text-gray-700 space-y-2">
        {value.column_name && (
          <div className="flex items-center gap-1">
            <LucideReact.Tag size={16} className="text-gray-500" />
            <span>{value.column_name}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="break-all truncate">{value.project_url}</span>
        </div>
        {value.content_url && (
          <div className="flex items-center gap-1">
            <LucideReact.Link2 size={16} className="text-gray-500" />
            <span className="break-all truncate">{value.content_url}</span>
          </div>
        )}
      </div>

      {/* Footer: Creator and Timestamps */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          {value.creator ? (
            <img
              src={value.creator.avatar_url}
              alt={value.creator.login}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  avatarName
                )}&background=0D8ABC&color=fff`;
              }}
            />
          ) : (
            <LucideReact.User size={24} className="text-gray-400" />
          )}
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              {value.creator?.name ?? value.creator?.login ?? "Unknown"}
            </span>
            <span className="text-gray-500">
              @{value.creator?.login ?? "unknown"}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Created {formattedCreated}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Clock size={16} className="text-gray-400" />
            <span>Updated {formattedUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
