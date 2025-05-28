import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A comment made to a gist.
     *
     * @title Gist Comment
    */
    export interface gist_comment {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        /**
         * The comment text.
        */
        body: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: AutoViewInputSubTypes.author_association;
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
    /**
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
}
export type AutoViewInput = AutoViewInputSubTypes.gist_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName =
    value.user?.name && value.user.name.trim() !== ""
      ? value.user.name
      : value.user?.login ?? "Unknown User";
  const placeholderUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=0D8ABC&color=fff`;
  const avatarSrc = value.user?.avatar_url ?? placeholderUrl;
  const isEdited = value.updated_at !== value.created_at;
  const createdAt = new Date(value.created_at);
  const updatedAt = new Date(value.updated_at);
  const formattedCreated = createdAt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedUpdated = updatedAt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const assocLabel = value.author_association
    .split("_")
    .map(
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start">
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholderUrl;
          }}
        />
        <div className="ml-3 flex-1">
          <div className="flex items-center flex-wrap">
            <span className="font-medium text-gray-900">{displayName}</span>
            <span className="ml-2 mt-0.5 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
              {assocLabel}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1 flex-wrap gap-x-2">
            <LucideReact.Calendar size={16} className="flex-shrink-0" />
            <span>{formattedCreated}</span>
            {isEdited && (
              <>
                <LucideReact.Edit2 size={16} className="flex-shrink-0 ml-4" />
                <span>Edited: {formattedUpdated}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="text-gray-700 mt-4 line-clamp-3 whitespace-pre-wrap break-words">
        {value.body}
      </p>
      <div className="flex items-center text-sm text-gray-500 mt-3 overflow-hidden">
        <LucideReact.Link size={16} className="flex-shrink-0" />
        <span className="ml-1 truncate">{value.url}</span>
      </div>
    </div>
  );
}
