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
export type AutoViewInput = AutoViewInputSubTypes.commit_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const reactionConfig: { key: keyof AutoViewInputSubTypes.reaction_rollup; icon: string }[] = [
    { key: "+1", icon: "👍" },
    { key: "-1", icon: "👎" },
    { key: "laugh", icon: "😆" },
    { key: "confused", icon: "😕" },
    { key: "heart", icon: "❤️" },
    { key: "hooray", icon: "🎉" },
    { key: "eyes", icon: "👀" },
    { key: "rocket", icon: "🚀" },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const commentItems = value.map((comment) => {
    const user = comment.user;
    const username = user?.login ?? "Unknown";
    const avatarUrl = user?.avatar_url;
    const date = new Date(comment.created_at).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const location = comment.path
      ? `${comment.path}${comment.line != null ? `:${comment.line}` : ""}`
      : null;

    return (
      <div key={comment.id} className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={username}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900 font-medium truncate">{username}</h3>
              <span className="text-xs text-gray-500">{date}</span>
            </div>
            {location && (
              <div className="text-xs text-gray-500 truncate">{location}</div>
            )}
          </div>
        </div>
        <p className="mt-2 text-gray-700 text-sm line-clamp-3">{comment.body}</p>
        {comment.reactions && (
          <div className="mt-3 flex flex-wrap gap-2">
            {reactionConfig.map((r) => {
              const count = comment.reactions?.[r.key] as number;
              return count > 0 ? (
                <span
                  key={r.key}
                  className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                >
                  <span>{r.icon}</span>
                  <span>{count}</span>
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
    );
  });

  // 3. Return the React element.
  return <div className="space-y-4">{commentItems}</div>;
}
