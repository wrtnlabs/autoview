import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit Comment
     *
     * @title Commit Comment
    */
    export type commit_comment = {
        html_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        body: string;
        path: string | null;
        position: (number & tags.Type<"int32">) | null;
        line: (number & tags.Type<"int32">) | null;
        commit_id: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: AutoViewInputSubTypes.author_association;
        reactions?: AutoViewInputSubTypes.reaction_rollup;
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
    /**
     * @title Reaction Rollup
    */
    export type reaction_rollup = {
        url: string & tags.Format<"uri">;
        total_count: number & tags.Type<"int32">;
        "+1": number & tags.Type<"int32">;
        "-1": number & tags.Type<"int32">;
        laugh: number & tags.Type<"int32">;
        confused: number & tags.Type<"int32">;
        heart: number & tags.Type<"int32">;
        hooray: number & tags.Type<"int32">;
        eyes: number & tags.Type<"int32">;
        rocket: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.commit_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const formattedCreatedAt = createdDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const isEdited = value.updated_at && value.updated_at !== value.created_at;
  const formattedUpdatedAt = isEdited
    ? new Date(value.updated_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  const user = value.user;
  const fileInfo =
    value.path != null
      ? `File: ${value.path}${value.line != null ? ` at line ${value.line}` : ""}`
      : null;

  const reactionIcons: Record<string, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };

  const reactionsList = value.reactions
    ? (Object.entries(value.reactions) as [string, number][])
        .filter(
          ([key, count]) =>
            key !== "url" && key !== "total_count" && count > 0
        )
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-sm space-y-4">
      <header className="flex items-center space-x-3">
        {user && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            {user.avatar_url && (
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.name || user?.login || "Unknown User"}
          </p>
          <p className="text-xs text-gray-500 flex items-center space-x-1">
            <time dateTime={value.created_at}>{formattedCreatedAt}</time>
            {isEdited && (
              <span className="italic">(edited)</span>
            )}
          </p>
        </div>
        <span className="px-2 py-0.5 text-xs font-semibold text-blue-600 uppercase bg-blue-100 rounded">
          {value.author_association}
        </span>
      </header>

      <div className="text-gray-800 text-sm whitespace-pre-wrap line-clamp-3">
        {value.body}
      </div>

      {fileInfo && (
        <div className="text-xs text-gray-500 font-mono">{fileInfo}</div>
      )}

      {reactionsList.length > 0 && (
        <div className="flex flex-wrap items-center space-x-3 text-sm">
          {reactionsList.map(([type, count]) => {
            const icon = reactionIcons[type] || type;
            return (
              <div
                key={type}
                className="flex items-center space-x-1 bg-gray-100 px-2 py-0.5 rounded"
              >
                <span>{icon}</span>
                <span>{count}</span>
              </div>
            );
          })}
        </div>
      )}

      {isEdited && (
        <div className="text-xs text-gray-400 italic">
          Updated: <time dateTime={value.updated_at}>{formattedUpdatedAt}</time>
        </div>
      )}
    </article>
  );
}
