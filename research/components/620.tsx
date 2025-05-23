import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Activity
     *
     * @title Activity
    */
    export interface activity {
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
export type AutoViewInput = AutoViewInputSubTypes.activity[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

  const activityMap: Record<
    AutoViewInputSubTypes.activity['activity_type'],
    { label: string; icon: JSX.Element; color: string }
  > = {
    push: { label: 'Pushed commits to', icon: <LucideReact.GitCommit size={16} />, color: 'text-blue-500' },
    force_push: { label: 'Force pushed to', icon: <LucideReact.Zap size={16} />, color: 'text-yellow-500' },
    branch_creation: { label: 'Created branch', icon: <LucideReact.GitBranch size={16} />, color: 'text-green-500' },
    branch_deletion: { label: 'Deleted branch', icon: <LucideReact.GitBranch size={16} />, color: 'text-red-500' },
    pr_merge: { label: 'Merged pull request into', icon: <LucideReact.GitMerge size={16} />, color: 'text-purple-500' },
    merge_queue_merge: {
      label: 'Merge queue merged into',
      icon: <LucideReact.GitMerge size={16} />,
      color: 'text-indigo-500',
    },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-4 text-lg">No activity available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((activity) => {
        const { id, actor, ref, before, after, timestamp, activity_type } = activity;
        const config = activityMap[activity_type];
        const branch = ref.split('/').pop() || ref;
        const shortBefore = before.slice(0, 7);
        const shortAfter = after.slice(0, 7);
        const displayName = actor?.name || actor?.login || 'Unknown User';
        const avatarUrl = actor?.avatar_url || '';
        const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=0D8ABC&color=fff`;

        return (
          <div key={id} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex-shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = placeholderAvatar;
                  }}
                />
              ) : (
                <LucideReact.User size={40} className="text-gray-300" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">{displayName}</span>
                <div className="flex items-center text-gray-500 text-sm">
                  <LucideReact.Clock size={14} className="mr-1" />
                  <span>{formatDate(timestamp)}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <div className={`${config.color} flex-shrink-0`}>{config.icon}</div>
                <span className="ml-2 text-gray-700">
                  {config.label} <span className="font-medium">{branch}</span>
                </span>
              </div>
              <div className="mt-1 text-gray-500 font-mono text-xs">
                <span>{shortBefore}</span>
                <LucideReact.ArrowRight size={12} className="inline text-gray-400 mx-1" />
                <span>{shortAfter}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
