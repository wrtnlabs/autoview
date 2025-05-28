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
  type Reaction = AutoViewInputSubTypes.reaction;
  type ReactionContent = Reaction["content"];

  // 1. Group reactions by their content type
  const groups = (value ?? []).reduce((acc, reaction) => {
    const key = reaction.content as ReactionContent;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {} as Record<ReactionContent, number>);

  // 2. Map each content type to an icon, color, and label
  const contentConfig: Record<ReactionContent, {
    Icon: React.ComponentType<any>;
    color: string;
    label: string;
  }> = {
    "+1":     { Icon: LucideReact.ThumbsUp,    color: "text-green-500",  label: "Like" },
    "-1":     { Icon: LucideReact.ThumbsDown,  color: "text-red-500",    label: "Dislike" },
    laugh:    { Icon: LucideReact.Smile,       color: "text-yellow-500", label: "Laugh" },
    confused: { Icon: LucideReact.Frown,       color: "text-orange-500", label: "Confused" },
    heart:    { Icon: LucideReact.Heart,       color: "text-red-500",    label: "Heart" },
    hooray:   { Icon: LucideReact.Star,        color: "text-amber-500",  label: "Hooray" },
    rocket:   { Icon: LucideReact.Rocket,      color: "text-purple-500", label: "Rocket" },
    eyes:     { Icon: LucideReact.Eye,         color: "text-blue-500",   label: "Eyes" },
  };

  // 3. Render empty state if there are no reactions
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-400">
        <LucideReact.AlertCircle size={24} className="mb-1" />
        <span className="text-sm">No reactions</span>
      </div>
    );
  }

  // 4. Render the grouped reaction summary
  return (
    <div className="flex flex-wrap items-center gap-4 p-2">
      {Object.entries(groups).map(([content, count]) => {
        const key = content as ReactionContent;
        const { Icon, color, label } = contentConfig[key];
        return (
          <div
            key={key}
            className="flex items-center gap-1"
            role="group"
            aria-label={`${label} reactions`}
          >
            <Icon
              size={16}
              className={color}
              aria-label={label}
              title={label}
            />
            <span className="text-sm text-gray-700">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
