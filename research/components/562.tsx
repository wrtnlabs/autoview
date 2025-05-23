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
  // 1. Data transformation / derived constants
  const creator = value.creator;
  const creatorName = creator?.name ?? creator?.login ?? "Unknown User";
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const isArchived = value.archived ?? false;
  const columnName = value.column_name ?? "Uncategorized";
  const displayNote = value.note?.trim() || "No description provided.";

  // Avatar handling with fallback
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorName,
  )}&background=0D8ABC&color=fff`;
  const [avatarSrc, setAvatarSrc] = React.useState<string>(
    creator?.avatar_url ?? fallbackAvatar,
  );

  // 2. JSX structure
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header: creator info & status */}
      <div className="flex items-center p-4">
        <div className="flex-shrink-0">
          <img
            src={avatarSrc}
            alt={creatorName}
            onError={() => setAvatarSrc(fallbackAvatar)}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{creatorName}</p>
          <div className="flex items-center text-xs text-gray-500">
            <LucideReact.Calendar size={14} className="mr-1" />
            <span>Created {formattedCreatedAt}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-1">
          {isArchived ? (
            <>
              <LucideReact.Archive size={16} className="text-red-500" />
              <span className="text-xs font-semibold text-red-500">Archived</span>
            </>
          ) : (
            <>
              <LucideReact.CheckCircle size={16} className="text-green-500" />
              <span className="text-xs font-semibold text-green-500">Active</span>
            </>
          )}
        </div>
      </div>

      {/* Body: card meta and note */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            Card #{value.id}
          </h2>
          <span className="text-sm text-gray-500">{columnName}</span>
        </div>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">{displayNote}</p>

        {/* Footer: additional metadata */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <div className="flex items-center">
            <LucideReact.Clock size={14} className="mr-1" />
            <span>Updated {formattedUpdatedAt}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Link size={14} className="mr-1" />
            <span className="truncate">{value.url}</span>
          </div>
          {value.content_url && (
            <div className="flex items-center">
              <LucideReact.FileText size={14} className="mr-1" />
              <span className="truncate">{value.content_url}</span>
            </div>
          )}
          <div className="flex items-center">
            <LucideReact.Link2 size={14} className="mr-1" />
            <span className="truncate">{value.project_url}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Link2 size={14} className="mr-1" />
            <span className="truncate">{value.column_url}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
