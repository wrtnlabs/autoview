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
  const reactions = value ?? [];

  if (reactions.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No reactions yet</span>
      </div>
    );
  }

  // Count reactions by content
  type ContentType = AutoViewInputSubTypes.reaction["content"];
  const counts: Record<ContentType, number> = {
    "+1": 0,
    "-1": 0,
    laugh: 0,
    confused: 0,
    heart: 0,
    hooray: 0,
    rocket: 0,
    eyes: 0,
  };
  reactions.forEach((r) => {
    counts[r.content] += 1;
  });

  const order: ContentType[] = [
    "+1",
    "-1",
    "laugh",
    "confused",
    "heart",
    "hooray",
    "rocket",
    "eyes",
  ];
  const getIcon = (content: ContentType) => {
    switch (content) {
      case "+1":
        return <LucideReact.ThumbsUp className="text-green-500" size={16} />;
      case "-1":
        return <LucideReact.ThumbsDown className="text-red-500" size={16} />;
      case "laugh":
        return <LucideReact.Smile className="text-amber-500" size={16} />;
      case "confused":
        return <LucideReact.Frown className="text-orange-500" size={16} />;
      case "heart":
        return <LucideReact.Heart className="text-red-400" size={16} />;
      case "hooray":
        return <LucideReact.Star className="text-amber-400" size={16} />;
      case "rocket":
        return <LucideReact.Rocket className="text-purple-500" size={16} />;
      case "eyes":
        return <LucideReact.Eye className="text-blue-500" size={16} />;
      default:
        return null;
    }
  };

  // Collect unique users who reacted
  const users = reactions
    .map((r) => r.user)
    .filter((u): u is NonNullable<typeof u> => u != null);
  const uniqueUsers = Array.from(new Map(users.map((u) => [u.id, u])).values());
  const displayUsers = uniqueUsers.slice(0, 5);
  const moreCount = uniqueUsers.length - displayUsers.length;

  // Compute last reaction date
  const lastTs = Math.max(
    ...reactions.map((r) => new Date(r.created_at).getTime()),
  );
  const lastDate = new Date(lastTs);
  const formattedLast = lastDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {order
          .filter((c) => counts[c] > 0)
          .map((c) => (
            <div key={c} className="flex items-center text-sm text-gray-600">
              {getIcon(c)}
              <span className="ml-1">{counts[c]}</span>
            </div>
          ))}
      </div>
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {displayUsers.map((user) => (
            <img
              key={user.id}
              src={user.avatar_url}
              alt={user.login}
              className="w-6 h-6 rounded-full ring-2 ring-white object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  (user.name ?? user.login).trim(),
                )}&background=0D8ABC&color=fff`;
              }}
            />
          ))}
          {moreCount > 0 && (
            <div className="w-6 h-6 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-xs text-gray-600">
              +{moreCount}
            </div>
          )}
        </div>
        <span className="ml-3 text-sm text-gray-500">
          Last reacted on {formattedLast}
        </span>
      </div>
    </div>
  );
}
