import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit Comment
     *
     * @title Commit Comment
    */
    export interface commit_comment {
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
    /**
     * @title Reaction Rollup
    */
    export interface reaction_rollup {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.commit_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Early return for empty data
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle className="text-gray-400" size={24} />
        <span className="mt-2">No comments available.</span>
      </div>
    );
  }

  // 2. Render list of commit comments
  return (
    <div className="space-y-4">
      {value.map((comment) => {
        const user = comment.user;
        const userName = user?.name ?? user?.login ?? "Unknown";
        const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          userName
        )}&background=0D8ABC&color=fff`;
        const avatarUrl = user?.avatar_url ?? placeholderAvatar;
        const formattedDate = new Date(comment.created_at).toLocaleString(
          undefined,
          { dateStyle: "medium", timeStyle: "short" }
        );

        // Build reaction icons list for non-zero counts
        const reactions = comment.reactions;
        const reactionList: { icon: JSX.Element; count: number }[] = [];
        if (reactions) {
          if (reactions["+1"] > 0)
            reactionList.push({
              icon: <LucideReact.ThumbsUp size={16} className="text-gray-500" />,
              count: reactions["+1"],
            });
          if (reactions["-1"] > 0)
            reactionList.push({
              icon: <LucideReact.ThumbsDown size={16} className="text-gray-500" />,
              count: reactions["-1"],
            });
          if (reactions.laugh > 0)
            reactionList.push({
              icon: <LucideReact.Smile size={16} className="text-gray-500" />,
              count: reactions.laugh,
            });
          if (reactions.confused > 0)
            reactionList.push({
              icon: <LucideReact.Frown size={16} className="text-gray-500" />,
              count: reactions.confused,
            });
          if (reactions.heart > 0)
            reactionList.push({
              icon: <LucideReact.Heart size={16} className="text-gray-500" />,
              count: reactions.heart,
            });
          if (reactions.hooray > 0)
            reactionList.push({
              icon: <LucideReact.Star size={16} className="text-gray-500" />,
              count: reactions.hooray,
            });
          if (reactions.eyes > 0)
            reactionList.push({
              icon: <LucideReact.Eye size={16} className="text-gray-500" />,
              count: reactions.eyes,
            });
          if (reactions.rocket > 0)
            reactionList.push({
              icon: <LucideReact.Rocket size={16} className="text-gray-500" />,
              count: reactions.rocket,
            });
        }

        return (
          <div key={comment.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center mb-2">
              <img
                src={avatarUrl}
                alt={`${userName} avatar`}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderAvatar;
                }}
              />
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-800">{userName}</p>
                <p className="flex items-center text-xs text-gray-500">
                  <LucideReact.Calendar className="mr-1" size={14} />
                  {formattedDate}
                </p>
                {comment.path && (
                  <p className="flex items-center text-xs text-gray-400 mt-0.5 truncate">
                    <LucideReact.FileText className="mr-1" size={14} />
                    {comment.path}
                    {comment.line !== null ? `:${comment.line}` : ""}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700 line-clamp-3 whitespace-pre-wrap">
              {comment.body}
            </p>
            {reactionList.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                {reactionList.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    {r.icon}
                    <span>{r.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
