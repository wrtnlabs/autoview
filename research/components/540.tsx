import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A reply to a discussion within a team.
     *
     * @title Team Discussion Comment
    */
    export interface team_discussion_comment {
        author: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The main text of the comment.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        discussion_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion comment.
        */
        number: number & tags.Type<"int32">;
        updated_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  if (value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
        <span>No comments available.</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((comment) => {
        const author = comment.author;
        const authorName = author?.name ?? author?.login ?? "Unknown";
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          authorName
        )}&background=0D8ABC&color=fff`;
        const avatarSrc = author?.avatar_url || avatarFallback;
        const reactions = comment.reactions;
        const reactionEntries: [string, unknown][] = reactions
          ? Object.entries(reactions).filter(
              ([type]) => type !== "url" && type !== "total_count"
            )
          : [];

        const getIcon = (type: string) => {
          switch (type) {
            case "+1":
              return LucideReact.ThumbsUp;
            case "-1":
              return LucideReact.ThumbsDown;
            case "laugh":
              return LucideReact.Smile;
            case "confused":
              return LucideReact.Frown;
            case "heart":
              return LucideReact.Heart;
            case "hooray":
              return LucideReact.Star;
            case "eyes":
              return LucideReact.Eye;
            case "rocket":
              return LucideReact.Rocket;
            default:
              return LucideReact.Heart;
          }
        };

        return (
          <div key={comment.node_id} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-start">
              <img
                src={avatarSrc}
                alt={authorName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = avatarFallback;
                }}
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{authorName}</span>
                  <span className="text-sm text-gray-500">#{comment.number}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-3">
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar size={14} />
                    <span>{formatDate(comment.created_at)}</span>
                  </div>
                  {comment.last_edited_at && (
                    <div className="flex items-center gap-1 italic text-gray-400">
                      <LucideReact.Edit2 size={14} />
                      <span>Edited {formatDate(comment.last_edited_at)}</span>
                    </div>
                  )}
                </div>
                <div
                  className="mt-2 text-gray-800 text-sm break-words"
                  dangerouslySetInnerHTML={{ __html: comment.body_html }}
                />
                {reactions && reactions.total_count > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    {reactionEntries.map(([type, count]) => {
                      if (typeof count !== "number" || count <= 0) return null;
                      const Icon = getIcon(type);
                      return (
                        <div
                          key={type}
                          className="flex items-center text-gray-500 text-sm gap-1"
                        >
                          <Icon size={16} className="text-gray-500" />
                          <span>{count}</span>
                        </div>
                      );
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
