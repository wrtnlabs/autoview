import { tags } from "typia";
import React from "react";
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
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
}
export type AutoViewInput = AutoViewInputSubTypes.gist_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user;
  const displayName = user?.name?.trim() || user?.login || "Unknown";
  const avatarUrl = user?.avatar_url;
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const isEdited = value.updated_at !== value.created_at;
  const editedDate = isEdited
    ? new Date(value.updated_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";
  const assocLabel = value.author_association
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const assocColors: Record<string, string> = {
    OWNER: "bg-purple-100 text-purple-800",
    MEMBER: "bg-indigo-100 text-indigo-800",
    COLLABORATOR: "bg-green-100 text-green-800",
    CONTRIBUTOR: "bg-blue-100 text-blue-800",
    FIRST_TIMER: "bg-yellow-100 text-yellow-800",
    FIRST_TIME_CONTRIBUTOR: "bg-yellow-100 text-yellow-800",
    MANNEQUIN: "bg-gray-100 text-gray-800",
    NONE: "bg-gray-100 text-gray-800",
  };
  const badgeStyle = assocColors[value.author_association] || "bg-gray-100 text-gray-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <article className="flex items-start p-4 bg-white rounded-lg shadow-md w-full max-w-md">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
          <span className="text-gray-400 text-xl">?</span>
        </div>
      )}
      <div className="flex-1 ml-4">
        <header className="flex flex-wrap items-center space-x-2">
          <h3 className="font-semibold text-gray-900 truncate">{displayName}</h3>
          <span
            className={`${badgeStyle} text-xs font-medium px-2 py-0.5 rounded`}
          >
            {assocLabel}
          </span>
          <time
            dateTime={value.created_at}
            className="text-sm text-gray-500"
          >
            {createdDate}
          </time>
          {isEdited && (
            <time
              dateTime={value.updated_at}
              className="text-sm text-gray-400 italic"
            >
              (edited)
            </time>
          )}
        </header>
        <p className="mt-2 text-gray-700 text-sm overflow-hidden line-clamp-3">
          {value.body}
        </p>
      </div>
    </article>
  );
}
