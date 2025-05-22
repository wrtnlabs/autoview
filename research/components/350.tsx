import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A comment made to a gist.
   *
   * @title Gist Comment
   */
  export type gist_comment = {
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
  /**
   * How the author is associated with the repository.
   *
   * @title author_association
   */
  export type author_association =
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";
}
export type AutoViewInput = AutoViewInputSubTypes.gist_comment;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const displayName = user?.name ?? user?.login ?? "Unknown User";
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=random`;
  const avatarSrc = user?.avatar_url ?? avatarPlaceholder;

  const createdDate = new Date(value.created_at).toLocaleString("default", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const isEdited = value.updated_at !== value.created_at;
  const editedDate = isEdited
    ? new Date(value.updated_at).toLocaleString("default", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  const associationMap: Record<
    AutoViewInputSubTypes.author_association,
    string
  > = {
    COLLABORATOR: "Collaborator",
    CONTRIBUTOR: "Contributor",
    FIRST_TIMER: "First Timer",
    FIRST_TIME_CONTRIBUTOR: "First Time Contributor",
    MANNEQUIN: "Mannequin",
    MEMBER: "Member",
    NONE: "None",
    OWNER: "Owner",
  };
  const assocLabel =
    associationMap[value.author_association] ?? value.author_association;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-start space-x-3">
        <img
          src={avatarSrc}
          alt={`${displayName} avatar`}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = avatarPlaceholder;
          }}
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900">{displayName}</span>
            {value.author_association && (
              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                {assocLabel}
              </span>
            )}
            <div className="flex items-center text-gray-500">
              <LucideReact.Calendar size={14} />
              <span className="ml-1">{createdDate}</span>
            </div>
            {isEdited && (
              <div className="flex items-center text-gray-500">
                <LucideReact.Edit2 size={14} />
                <span className="ml-1">Edited {editedDate}</span>
              </div>
            )}
          </div>
          <p className="mt-2 text-gray-700 text-sm whitespace-pre-wrap line-clamp-4">
            {value.body}
          </p>
        </div>
      </div>
    </div>
  );
}
