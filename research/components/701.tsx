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
  // 1. Data aggregation/transformation
  const reactions = Array.isArray(value) ? value : [];
  const countMap = reactions.reduce(
    (acc, reaction) => {
      acc[reaction.content] = (acc[reaction.content] || 0) + 1;
      return acc;
    },
    {} as Record<AutoViewInputSubTypes.reaction["content"], number>,
  );

  // get unique reactions by user (latest per user) and limit to 5 for avatars
  const uniqueReactions = Array.from(
    new Map(
      reactions
        .filter((r) => r.user !== null)
        .map(
          (r) =>
            [(r.user as any).id, r] as [number, AutoViewInputSubTypes.reaction],
        ),
    ).values(),
  );
  const displayedReactions = uniqueReactions.slice(0, 5);

  // icon mapping for each reaction type
  const getReactionIcon = (
    content: AutoViewInputSubTypes.reaction["content"],
    size: number = 16,
    className: string = "",
  ) => {
    switch (content) {
      case "+1":
        return <LucideReact.ThumbsUp size={size} className={className} />;
      case "-1":
        return <LucideReact.ThumbsDown size={size} className={className} />;
      case "laugh":
        return <LucideReact.Smile size={size} className={className} />;
      case "confused":
        return <LucideReact.Frown size={size} className={className} />;
      case "heart":
        return <LucideReact.Heart size={size} className={className} />;
      case "hooray":
        return <LucideReact.Star size={size} className={className} />;
      case "rocket":
        return <LucideReact.Rocket size={size} className={className} />;
      case "eyes":
        return <LucideReact.Eye size={size} className={className} />;
      default:
        return <LucideReact.Gift size={size} className={className} />;
    }
  };

  // 2. Compose the visual structure
  if (reactions.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No reactions yet</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Reactions</h2>

      {/* Avatars with reaction badges */}
      <div className="flex -space-x-2 mb-4">
        {displayedReactions.map((reaction) => {
          const user = reaction.user!;
          const avatarSrc =
            user.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.login,
            )}&background=0D8ABC&color=fff`;

          return (
            <div key={reaction.id} className="relative">
              <img
                src={avatarSrc}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.login,
                  )}&background=0D8ABC&color=fff`;
                }}
                alt={user.login}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                title={`${user.login} reacted with "${reaction.content}"`}
              />
              <span className="absolute bottom-0 right-0 bg-white rounded-full p-[2px]">
                {getReactionIcon(reaction.content, 12, "text-gray-600")}
              </span>
            </div>
          );
        })}

        {/* indicator for extra reactions */}
        {uniqueReactions.length > 5 && (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700 border-2 border-white">
            +{uniqueReactions.length - 5}
          </div>
        )}
      </div>

      {/* Counts per reaction type */}
      <div className="flex flex-wrap gap-4">
        {(
          Object.entries(countMap) as [
            AutoViewInputSubTypes.reaction["content"],
            number,
          ][]
        ).map(([content, count]) => (
          <div
            key={content}
            className="flex items-center text-sm text-gray-700"
          >
            {getReactionIcon(content, 16, "text-gray-500")}
            <span className="ml-1">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
