import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  export type author_association =
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";
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
  const comments = React.useMemo(() => {
    return [...value].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
  }, [value]);

  const emojiMap: Record<
    keyof Omit<AutoViewInputSubTypes.reaction_rollup, "url" | "total_count">,
    string
  > = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
  };

  const formatAssociation = (assoc: string) =>
    assoc
      .toLowerCase()
      .split("_")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!comments.length) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No comments available</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
      {comments.map((comment) => {
        const user = comment.user;
        const username = user?.login || "Unknown User";
        const displayName = user?.name || username;
        const avatarUrl =
          user?.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            displayName,
          )}&background=0D8ABC&color=fff`;
        const createdAt = new Date(comment.created_at).toLocaleString(
          undefined,
          { dateStyle: "medium", timeStyle: "short" },
        );
        const fileLocation = comment.path
          ? `${comment.path}${comment.line ? `:${comment.line}` : ""}`
          : null;
        const reactions = comment.reactions;

        return (
          <div key={comment.id} className="p-4">
            <div className="flex items-start">
              <img
                src={avatarUrl}
                alt={username}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName,
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{username}</span>
                  <span className="text-xs text-gray-500">{createdAt}</span>
                </div>
                {comment.author_association && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                    {formatAssociation(comment.author_association)}
                  </span>
                )}
                {fileLocation && (
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <LucideReact.FileText
                      size={14}
                      className="text-gray-400 mr-1"
                    />
                    <span className="truncate">{fileLocation}</span>
                  </div>
                )}
                <p className="mt-2 text-gray-700 text-sm line-clamp-3 whitespace-pre-wrap">
                  {comment.body}
                </p>
                {reactions && reactions.total_count > 0 && (
                  <div className="mt-3 flex flex-wrap text-xs text-gray-500">
                    {(
                      Object.keys(emojiMap) as Array<keyof typeof emojiMap>
                    ).map((key) => {
                      const count = reactions[key] as number;
                      if (count > 0) {
                        return (
                          <span
                            key={key}
                            className="flex items-center mr-4 mb-1"
                          >
                            <span className="mr-1">{emojiMap[key]}</span>
                            <span>{count}</span>
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
