import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Activity
     *
     * @title Activity
    */
    export type activity = {
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The SHA of the commit before the activity.
        */
        before: string;
        /**
         * The SHA of the commit after the activity.
        */
        after: string;
        /**
         * The full Git reference, formatted as `refs/heads/<branch name>`.
        */
        ref: string;
        /**
         * The time when the activity occurred.
        */
        timestamp: string;
        /**
         * The type of the activity that was performed.
        */
        activity_type: "push" | "force_push" | "branch_deletion" | "branch_creation" | "pr_merge" | "merge_queue_merge";
        actor: AutoViewInputSubTypes.nullable_simple_user;
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
export type AutoViewInput = AutoViewInputSubTypes.activity[];



// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Map raw activity_type values to human-readable labels
  const activityTypeMap: Record<AutoViewInputSubTypes.activity["activity_type"], string> = {
    push: "Push",
    force_push: "Force Push",
    branch_deletion: "Branch Deletion",
    branch_creation: "Branch Creation",
    pr_merge: "Pull Request Merge",
    merge_queue_merge: "Merge Queue Merge",
  };

  // Simple "time ago" formatter for recent timestamps
  function formatTimeAgo(dateString: string): string {
    const now = Date.now();
    const then = new Date(dateString).getTime();
    const diffSec = Math.floor((now - then) / 1000);
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 30) return `${diffDay}d ago`;
    const diffMo = Math.floor(diffDay / 30);
    if (diffMo < 12) return `${diffMo}mo ago`;
    const diffYr = Math.floor(diffMo / 12);
    return `${diffYr}y ago`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 italic">
        No activities to display.
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {value.map((act) => {
          const actor = act.actor;
          const displayName = actor?.login ?? "Unknown";
          const avatarUrl = actor?.avatar_url ?? "";
          const actionLabel = activityTypeMap[act.activity_type] ?? act.activity_type;
          const branchName = act.ref.replace(/^refs\/heads\//, "");
          const beforeSHA = act.before.slice(0, 7);
          const afterSHA = act.after.slice(0, 7);
          const timeAgo = formatTimeAgo(act.timestamp);

          return (
            <li key={act.id} className="flex items-start p-4">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
              )}
              <div className="ml-4 flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">
                  <span className="font-semibold">{displayName}</span>{" "}
                  <span>performed</span>{" "}
                  <span className="font-semibold">{actionLabel}</span>{" "}
                  <span>on</span>{" "}
                  <span className="font-semibold">{branchName}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {beforeSHA} → {afterSHA} · {timeAgo}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
