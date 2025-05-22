import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    activity_type:
      | "push"
      | "force_push"
      | "branch_deletion"
      | "branch_creation"
      | "pr_merge"
      | "merge_queue_merge";
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

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const activityCount = value.length;

  const typeLabels: Record<
    AutoViewInputSubTypes.activity["activity_type"],
    string
  > = {
    push: "pushed to",
    force_push: "force-pushed to",
    branch_creation: "created branch",
    branch_deletion: "deleted branch",
    pr_merge: "merged pull request on",
    merge_queue_merge: "merged via merge queue on",
  };

  const getIcon = (
    type: AutoViewInputSubTypes.activity["activity_type"],
  ): JSX.Element => {
    switch (type) {
      case "push":
        return <LucideReact.ArrowRight className="text-blue-500" size={20} />;
      case "force_push":
        return <LucideReact.RefreshCw className="text-purple-500" size={20} />;
      case "branch_creation":
        return <LucideReact.PlusSquare className="text-green-500" size={20} />;
      case "branch_deletion":
        return <LucideReact.MinusSquare className="text-red-500" size={20} />;
      case "pr_merge":
        return <LucideReact.GitMerge className="text-indigo-500" size={20} />;
      case "merge_queue_merge":
        return (
          <LucideReact.GitPullRequest className="text-yellow-500" size={20} />
        );
      default:
        return <LucideReact.Activity className="text-gray-400" size={20} />;
    }
  };

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <LucideReact.List className="mr-1" size={16} />
        <span>Total Activities: {activityCount}</span>
      </div>
      <ul className="divide-y divide-gray-200">
        {value.map((activity) => {
          const branch = activity.ref.split("/").pop() || activity.ref;
          const label = typeLabels[activity.activity_type] || "performed";
          const date = formatDate(activity.timestamp);
          const Icon = getIcon(activity.activity_type);

          return (
            <li key={activity.id} className="flex items-start gap-3 py-3">
              <div>{Icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {activity.actor ? (
                    <img
                      src={activity.actor.avatar_url}
                      alt={activity.actor.login}
                      className="w-6 h-6 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(activity.actor?.login || "") +
                          "&background=ccc&color=fff";
                      }}
                    />
                  ) : (
                    <LucideReact.User
                      className="w-6 h-6 text-gray-400"
                      size={24}
                    />
                  )}
                  <span className="font-medium text-gray-800">
                    {activity.actor?.login || "Unknown"}
                  </span>
                </div>
                <div className="text-gray-700 text-sm mt-1">
                  {label} <span className="font-medium">{branch}</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <LucideReact.Calendar className="mr-1" size={12} />
                  <span>{date}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
