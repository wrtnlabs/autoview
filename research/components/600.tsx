import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * An entry in the reviews log for environment deployments
   *
   * @title Environment Approval
   */
  export type environment_approvals = {
    /**
     * The list of environments that were approved or rejected
     */
    environments: {
      /**
       * The id of the environment.
       */
      id?: number & tags.Type<"int32">;
      node_id?: string;
      /**
       * The name of the environment.
       */
      name?: string;
      url?: string;
      html_url?: string;
      /**
       * The time that the environment was created, in ISO 8601 format.
       */
      created_at?: string;
      /**
       * The time that the environment was last updated, in ISO 8601 format.
       */
      updated_at?: string;
    }[];
    /**
     * Whether deployment to the environment(s) was approved or rejected or pending (with comments)
     */
    state: "approved" | "rejected" | "pending";
    user: AutoViewInputSubTypes.simple_user;
    /**
     * The comment submitted with the deployment review
     */
    comment: string;
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.environment_approvals[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived data and helpers
  const hasApprovals = Array.isArray(value) && value.length > 0;

  // choose icon, color, and label based on state
  const getStateMeta = (state: "approved" | "rejected" | "pending") => {
    switch (state) {
      case "approved":
        return {
          Icon: LucideReact.CheckCircle,
          color: "text-green-500",
          label: "Approved",
        };
      case "rejected":
        return {
          Icon: LucideReact.XCircle,
          color: "text-red-500",
          label: "Rejected",
        };
      case "pending":
      default:
        return {
          Icon: LucideReact.Clock,
          color: "text-amber-500",
          label: "Pending",
        };
    }
  };

  // 2. Render
  if (!hasApprovals) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-300" />
        <p className="mt-4 text-lg">No environment approvals available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {value.map((approval, idx) => {
        const { environments, state, user, comment } = approval;
        const {
          Icon: StateIcon,
          color: stateColor,
          label: stateLabel,
        } = getStateMeta(state);
        const envNames = environments
          .map((env) => env.name?.trim())
          .filter(Boolean)
          .join(", ");

        // fallback for avatar
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          (user.name ?? user.login).trim(),
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center text-sm">
                <StateIcon size={18} className={`${stateColor}`} />
                <span className="ml-2 font-medium text-gray-800">
                  {stateLabel}
                </span>
              </div>
              <div className="mt-3 sm:mt-0 flex items-center">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = avatarFallback;
                  }}
                />
                <span className="ml-2 text-gray-700 font-medium truncate">
                  {user.login}
                </span>
              </div>
            </div>

            {envNames && (
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-medium text-gray-800">Environments:</span>{" "}
                <span className="font-normal">{envNames}</span>
              </div>
            )}

            {comment && (
              <p className="mt-3 text-gray-700 text-sm line-clamp-3">
                {comment}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
