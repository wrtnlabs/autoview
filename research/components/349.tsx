import * as LucideReact from "lucide-react";
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
  const createdAt = new Date(value.created_at);
  const formattedCreatedAt = createdAt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isEdited = value.updated_at !== value.created_at;
  const formattedUpdatedAt = isEdited
    ? new Date(value.updated_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const userName = value.user?.name || value.user?.login || "Unknown";
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userName,
  )}&background=random`;
  const avatarSrc = value.user?.avatar_url || avatarFallback;

  const associationStyles: Record<
    AutoViewInputSubTypes.author_association,
    string
  > = {
    OWNER: "bg-green-100 text-green-800",
    MEMBER: "bg-blue-100 text-blue-800",
    COLLABORATOR: "bg-indigo-100 text-indigo-800",
    CONTRIBUTOR: "bg-teal-100 text-teal-800",
    FIRST_TIMER: "bg-teal-100 text-teal-800",
    FIRST_TIME_CONTRIBUTOR: "bg-teal-100 text-teal-800",
    MANNEQUIN: "bg-gray-100 text-gray-800",
    NONE: "bg-gray-100 text-gray-800",
  };
  const associationClass =
    associationStyles[value.author_association] || "bg-gray-100 text-gray-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-start gap-4">
        <img
          src={avatarSrc}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = avatarFallback;
          }}
          alt={`${userName} avatar`}
          className="w-12 h-12 rounded-full object-cover bg-gray-100"
        />
        <div className="flex-1">
          <header className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-gray-900">{userName}</h3>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${associationClass}`}
            >
              {value.author_association.replace(/_/g, " ").toLowerCase()}
            </span>
            <time
              dateTime={value.created_at}
              className="ml-auto text-xs text-gray-500 flex items-center gap-1"
            >
              <LucideReact.Calendar size={14} />
              {formattedCreatedAt}
            </time>
          </header>
          {isEdited && (
            <div className="mt-1 text-xs text-gray-400 flex items-center gap-1">
              <LucideReact.Edit2 size={12} />
              Edited: {formattedUpdatedAt}
            </div>
          )}
          <p
            className="mt-3 text-gray-700 text-sm line-clamp-4"
            title={value.body}
          >
            {value.body}
          </p>
        </div>
      </div>
    </div>
  );
}
