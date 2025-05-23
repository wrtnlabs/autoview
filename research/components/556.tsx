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
  const {
    note,
    created_at,
    updated_at,
    creator,
    archived = false,
    column_name,
    content_url,
  } = value;

  const displayNote = note?.trim() ? note : 'No description available.';
  const createdAtFormatted = new Date(created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const updatedAtFormatted = new Date(updated_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const creatorName = creator?.name?.trim() || creator?.login || 'Unknown User';
  const fallbackAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorName,
  )}&background=0D8ABC&color=fff`;

  const [avatarSrc, setAvatarSrc] = React.useState<string>(
    creator?.avatar_url || fallbackAvatarUrl,
  );
  const handleAvatarError = () => {
    if (avatarSrc !== fallbackAvatarUrl) setAvatarSrc(fallbackAvatarUrl);
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          {archived ? (
            <LucideReact.Archive className="text-gray-500" size={16} />
          ) : (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          )}
          <span
            className={`text-sm font-medium ${
              archived ? 'text-gray-500' : 'text-green-600'
            }`}
          >
            {archived ? 'Archived' : 'Active'}
          </span>
        </div>
        {column_name && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <LucideReact.Tag size={16} />
            <span className="truncate">{column_name}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-800 text-base line-clamp-3">{displayNote}</p>
      </div>

      <div className="flex items-center mb-4">
        <img
          src={avatarSrc}
          alt={creatorName}
          onError={handleAvatarError}
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
        <span className="text-sm text-gray-700 font-medium">{creatorName}</span>
      </div>

      <div className="flex items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <time dateTime={created_at}>{createdAtFormatted}</time>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Clock size={16} />
          <time dateTime={updated_at}>{updatedAtFormatted}</time>
        </div>
      </div>

      {content_url && (
        <div className="mt-4 flex items-center gap-1 text-sm text-blue-600">
          <LucideReact.Link size={16} />
          <span className="truncate">{content_url}</span>
        </div>
      )}
    </div>
  );
}
