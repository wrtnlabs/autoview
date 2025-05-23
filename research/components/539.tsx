import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A team discussion is a persistent record of a free-form conversation within a team.
     *
     * @title Team Discussion
    */
    export interface team_discussion {
        author: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The main text of the discussion.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        comments_count: number & tags.Type<"int32">;
        comments_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion.
        */
        number: number & tags.Type<"int32">;
        /**
         * Whether or not this discussion should be pinned for easy retrieval.
        */
        pinned: boolean;
        /**
         * Whether or not this discussion should be restricted to team members and organization owners.
        */
        "private": boolean;
        team_url: string & tags.Format<"uri">;
        /**
         * The title of the discussion.
        */
        title: string;
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at).toLocaleString();
  const editedAt = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString()
    : null;
  const snippet =
    value.body.length > 200 ? value.body.slice(0, 200).trimEnd() + "…" : value.body;

  // Prepare reaction list if available
  type ReactionItem = {
    type: string;
    count: number;
    Icon: React.ComponentType<React.ComponentProps<typeof LucideReact.ThumbsUp>>;
  };
  const reactionsList: ReactionItem[] = value.reactions
    ? [
        { type: "+1", count: value.reactions["+1"], Icon: LucideReact.ThumbsUp },
        { type: "-1", count: value.reactions["-1"], Icon: LucideReact.ThumbsDown },
        { type: "laugh", count: value.reactions.laugh, Icon: LucideReact.Smile },
        { type: "confused", count: value.reactions.confused, Icon: LucideReact.Frown },
        { type: "heart", count: value.reactions.heart, Icon: LucideReact.Heart },
        { type: "hooray", count: value.reactions.hooray, Icon: LucideReact.Star },
        { type: "eyes", count: value.reactions.eyes, Icon: LucideReact.Eye },
        { type: "rocket", count: value.reactions.rocket, Icon: LucideReact.Rocket },
      ].filter((r) => r.count > 0)
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Header: author and status */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            <img
              src={
                value.author?.avatar_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  value.author?.login ?? "Unknown"
                )}&background=random&color=fff`
              }
              alt={value.author?.login ?? "Unknown"}
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  value.author?.login ?? "Unknown"
                )}&background=random&color=fff`;
              }}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {value.author?.name ?? value.author?.login ?? "Unknown"}
            </span>
            <span className="text-xs text-gray-500">{createdAt}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          {value.pinned && (
            <LucideReact.Pin
              size={16}
              className="text-gray-500"
              aria-label="Pinned"
            />
          )}
          {value.private && (
            <LucideReact.Lock
              size={16}
              className="text-gray-500"
              aria-label="Private"
            />
          )}
        </div>
      </div>

      {/* Title and identification */}
      <h3 className="mt-4 text-lg font-semibold text-gray-800 flex items-center gap-2">
        <span className="truncate">{value.title}</span>
        <span className="text-sm text-gray-400">#{value.number}</span>
      </h3>
      {editedAt && (
        <p className="mt-1 text-xs text-gray-400 italic">Edited: {editedAt}</p>
      )}

      {/* Body snippet */}
      <p className="mt-3 text-gray-700 text-sm line-clamp-3">{snippet}</p>

      {/* Footer: comments and reactions */}
      <div className="mt-4 flex items-center justify-between text-gray-600 text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <LucideReact.MessageCircle size={16} />
            <span>{value.comments_count}</span>
          </div>
          {reactionsList.length > 0 && (
            <div className="flex items-center gap-3">
              {reactionsList.map(({ type, count, Icon }) => (
                <div key={type} className="flex items-center gap-1">
                  <Icon size={16} />
                  <span>{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
