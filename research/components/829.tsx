import LucideReact from "lucide-react";
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
  const reactions = value;
  const totalReactions = reactions.length;

  // Define the possible reaction types in a consistent order
  type ReactionContent = AutoViewInputSubTypes.reaction["content"];
  const contentOrder: ReactionContent[] = [
    "+1",
    "-1",
    "laugh",
    "confused",
    "heart",
    "hooray",
    "rocket",
    "eyes",
  ];

  // Initialize counts for each reaction type
  const reactionCounts: Record<ReactionContent, number> = {
    "+1": 0,
    "-1": 0,
    laugh: 0,
    confused: 0,
    heart: 0,
    hooray: 0,
    rocket: 0,
    eyes: 0,
  };

  // Map reaction type to a styled icon
  const iconMap: Record<ReactionContent, JSX.Element> = {
    "+1": <LucideReact.ThumbsUp size={16} className="text-green-500" />,
    "-1": <LucideReact.ThumbsDown size={16} className="text-red-500" />,
    laugh: <LucideReact.Smile size={16} className="text-yellow-500" />,
    confused: <LucideReact.Frown size={16} className="text-gray-500" />,
    heart: <LucideReact.Heart size={16} className="text-red-500" />,
    hooray: <LucideReact.Star size={16} className="text-amber-500" />,
    rocket: <LucideReact.Rocket size={16} className="text-purple-500" />,
    eyes: <LucideReact.Eye size={16} className="text-blue-500" />,
  };

  // Track unique user IDs and latest reaction timestamp
  const userIds = new Set<number>();
  let latestTimestamp = 0;

  for (const reaction of reactions) {
    reactionCounts[reaction.content] += 1;
    if (reaction.user && typeof reaction.user.id === "number") {
      userIds.add(reaction.user.id);
    }
    const ts = new Date(reaction.created_at).getTime();
    if (!isNaN(ts) && ts > latestTimestamp) {
      latestTimestamp = ts;
    }
  }

  const uniqueUsersCount = userIds.size;
  const formattedLast = latestTimestamp
    ? new Date(latestTimestamp).toLocaleString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (totalReactions === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No reactions yet</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md">
      {/* Summary header: unique users and last reaction date */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3">
        <div className="flex items-center mr-4">
          <LucideReact.Users size={16} className="text-gray-400" />
          <span className="ml-1">
            {uniqueUsersCount} user{uniqueUsersCount !== 1 && "s"}
          </span>
        </div>
        {formattedLast && (
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span className="ml-1">Last: {formattedLast}</span>
          </div>
        )}
      </div>

      {/* Reaction counts */}
      <div className="flex flex-wrap items-center gap-4">
        {contentOrder.map((type) =>
          reactionCounts[type] > 0 ? (
            <div key={type} className="flex items-center text-gray-700">
              {iconMap[type]}
              <span className="ml-1 text-sm">{reactionCounts[type]}</span>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
