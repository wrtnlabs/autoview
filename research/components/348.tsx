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
  const createdDate = new Date(value.created_at);
  const formattedCreatedAt = createdDate.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const updatedDate = value.updated_at !== value.created_at ? new Date(value.updated_at) : null;
  const formattedUpdatedAt = updatedDate
    ? updatedDate.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : null;

  // Transform enum to human-readable label
  const assocLabel = value.author_association
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // User info (may be null)
  const user = value.user;
  const userLogin = user?.login ?? "Anonymous";
  const avatarUrl = user?.avatar_url;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${userLogin}'s avatar`}
            className="w-10 h-10 rounded-full object-cover bg-gray-100"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        )}
        <div className="ml-3 flex flex-col">
          <span className="text-sm font-semibold text-gray-900">{userLogin}</span>
          <div className="flex items-center text-xs text-gray-500 space-x-2">
            <span className="capitalize">{assocLabel}</span>
            <span>•</span>
            <span>{formattedCreatedAt}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-800 text-sm break-words line-clamp-5">{value.body}</p>
      {formattedUpdatedAt && (
        <div className="mt-2 text-xs text-gray-400">
          Updated: <time dateTime={value.updated_at}>{formattedUpdatedAt}</time>
        </div>
      )}
    </div>
  );
}
