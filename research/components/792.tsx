import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
     *
     * @title Reaction
    */
    export interface reaction {
        id: number & tags.Type<"int32">;
        node_id: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The reaction to use
        */
        content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        created_at: string & tags.Format<"date-time">;
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
}
export type AutoViewInput = AutoViewInputSubTypes.reaction;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    value.user?.login ?? "Unknown"
  )}&background=cccccc&color=ffffff`;
  const avatarUrl = value.user?.avatar_url ?? avatarFallback;
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = avatarFallback;
  };

  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const reactionMap: Record<
    AutoViewInput["content"],
    { icon: React.ComponentType<any>; color: string; label: string }
  > = {
    "+1": { icon: LucideReact.ThumbsUp, color: "text-green-500", label: "Like" },
    "-1": { icon: LucideReact.ThumbsDown, color: "text-red-500", label: "Dislike" },
    laugh: { icon: LucideReact.Smile, color: "text-yellow-500", label: "Laugh" },
    confused: { icon: LucideReact.Frown, color: "text-amber-500", label: "Confused" },
    heart: { icon: LucideReact.Heart, color: "text-red-400", label: "Heart" },
    hooray: { icon: LucideReact.Star, color: "text-blue-400", label: "Hooray" },
    rocket: { icon: LucideReact.Rocket, color: "text-purple-500", label: "Rocket" },
    eyes: { icon: LucideReact.Eye, color: "text-gray-500", label: "Eyes" },
  };
  const { icon: ReactionIcon, color: reactionColor, label: reactionLabel } =
    reactionMap[value.content];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-start gap-4">
      <img
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        src={avatarUrl}
        alt={`${value.user?.login ?? "Unknown"} avatar`}
        onError={handleImgError}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
          <LucideReact.User size={16} className="text-gray-400" />
          <span>{value.user?.login ?? "Unknown user"}</span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <ReactionIcon size={16} className={reactionColor} strokeWidth={1.5} />
          <span className="text-gray-700">{reactionLabel}</span>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <LucideReact.Calendar size={14} />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
