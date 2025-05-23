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
export type AutoViewInput = AutoViewInputSubTypes.reaction[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Aggregate reactions by content type
  const reactionGroups = value.reduce(
    (acc, reaction) => {
      const key = reaction.content as AutoViewInputSubTypes.reaction["content"];
      if (!acc[key]) acc[key] = [];
      acc[key].push(reaction);
      return acc;
    },
    {} as Record<AutoViewInputSubTypes.reaction["content"], AutoViewInputSubTypes.reaction[]>
  );

  // 2. Define display order and icon/color mapping
  const contentOrder: AutoViewInputSubTypes.reaction["content"][] = [
    "+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes",
  ] as const;

  const iconMap = {
    "+1":    { Icon: LucideReact.ThumbsUp,    color: "text-green-500" },
    "-1":    { Icon: LucideReact.ThumbsDown,  color: "text-red-500" },
    laugh:   { Icon: LucideReact.Smile,       color: "text-yellow-500" },
    confused:{ Icon: LucideReact.HelpCircle,  color: "text-amber-500" },
    heart:   { Icon: LucideReact.Heart,       color: "text-pink-500" },
    hooray:  { Icon: LucideReact.Zap,         color: "text-purple-500" },
    rocket:  { Icon: LucideReact.Rocket,      color: "text-indigo-500" },
    eyes:    { Icon: LucideReact.Eye,         color: "text-blue-500" },
  } as const;

  // 3. Handle empty state
  if (value.length === 0) {
    return (
      <div className="flex items-center text-gray-400 space-x-2 p-4">
        <LucideReact.AlertCircle size={20} />
        <span className="text-sm">No reactions</span>
      </div>
    );
  }

  // 4. Compose visual structure
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      {contentOrder.map((content) => {
        const reactions = reactionGroups[content];
        if (!reactions || reactions.length === 0) return null;
        const { Icon, color } = iconMap[content];
        // Build a tooltip listing reacting users
        const userList = reactions
          .map((r) => r.user?.login ?? "Unknown")
          .join(", ");

        return (
          <div
            key={content}
            className="flex items-center space-x-1 cursor-default"
            title={userList}
          >
            <Icon className={color} size={16} strokeWidth={1.5} />
            <span className="text-sm text-gray-700">{reactions.length}</span>
          </div>
        );
      })}
    </div>
  );
}
