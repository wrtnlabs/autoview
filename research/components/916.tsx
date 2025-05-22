import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
   *
   * @title Reaction
   */
  export type reaction = {
    id: number & tags.Type<"int32">;
    node_id: string;
    user: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * The reaction to use
     */
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
    created_at: string & tags.Format<"date-time">;
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
}
export type AutoViewInput = AutoViewInputSubTypes.reaction[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const counts = {
    "+1": 0,
    "-1": 0,
    laugh: 0,
    confused: 0,
    heart: 0,
    hooray: 0,
    rocket: 0,
    eyes: 0,
  } as Record<AutoViewInputSubTypes.reaction["content"], number>;

  value.forEach((reaction) => {
    counts[reaction.content] = (counts[reaction.content] || 0) + 1;
  });

  const reactionMap: Record<
    AutoViewInputSubTypes.reaction["content"],
    { icon: JSX.Element; label: string }
  > = {
    "+1": {
      icon: <LucideReact.ThumbsUp className="text-gray-500" size={16} />,
      label: "Thumbs Up",
    },
    "-1": {
      icon: <LucideReact.ThumbsDown className="text-gray-500" size={16} />,
      label: "Thumbs Down",
    },
    laugh: {
      icon: <LucideReact.Smile className="text-yellow-500" size={16} />,
      label: "Laugh",
    },
    confused: {
      icon: <LucideReact.Frown className="text-yellow-700" size={16} />,
      label: "Confused",
    },
    heart: {
      icon: <LucideReact.Heart className="text-red-500" size={16} />,
      label: "Heart",
    },
    hooray: {
      icon: <LucideReact.Star className="text-amber-400" size={16} />,
      label: "Hooray",
    },
    rocket: {
      icon: <LucideReact.Rocket className="text-indigo-500" size={16} />,
      label: "Rocket",
    },
    eyes: {
      icon: <LucideReact.Eye className="text-blue-500" size={16} />,
      label: "Eyes",
    },
  };

  // Sort reaction types by descending count
  const presentReactions = (
    Object.keys(counts) as Array<AutoViewInputSubTypes.reaction["content"]>
  )
    .filter((key) => counts[key] > 0)
    .sort((a, b) => counts[b] - counts[a]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {presentReactions.length > 0 ? (
        <div className="flex flex-wrap items-center gap-4">
          {presentReactions.map((content) => (
            <div key={content} className="flex items-center space-x-1">
              <span className="sr-only">{reactionMap[content].label}</span>
              {reactionMap[content].icon}
              <span className="text-sm text-gray-700">{counts[content]}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center text-gray-400">
          <LucideReact.AlertCircle size={20} />
          <span className="ml-2 text-sm">No reactions</span>
        </div>
      )}
    </div>
  );
}
