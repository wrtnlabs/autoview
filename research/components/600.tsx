import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * An entry in the reviews log for environment deployments
     *
     * @title Environment Approval
    */
    export interface environment_approvals {
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
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.environment_approvals[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation / derived constants
  const approvals = value;
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  // 2. Compose visual structure using JSX and Tailwind CSS
  if (approvals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span className="text-sm">No deployment reviews available.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {approvals.map((approval, idx) => {
        const { state, user, environments, comment } = approval;
        // Select icon based on state
        const stateIcon =
          state === "approved" ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : state === "rejected" ? (
            <LucideReact.XCircle size={16} className="text-red-500" />
          ) : (
            <LucideReact.Clock size={16} className="text-amber-500" />
          );
        const displayName = user.name ?? user.login;

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            {/* Header: state + user */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                {stateIcon}
                <span className="text-sm font-semibold capitalize text-gray-700">
                  {state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar_url}
                  alt={displayName}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        displayName
                      )}&background=ddd&color=555`;
                  }}
                />
                <span className="text-sm text-gray-800">{displayName}</span>
              </div>
            </div>

            {/* Environments badges */}
            {environments && environments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {environments.map((env, eidx) => (
                  <span
                    key={env.id ?? eidx}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {env.name ?? `Env #${env.id}`}
                  </span>
                ))}
              </div>
            )}

            {/* Environment timestamps (if multiple, show first's updated_at) */}
            {environments[0]?.updated_at && (
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                <LucideReact.Calendar size={14} />
                <span>
                  Last updated: {formatDate(environments[0].updated_at)}
                </span>
              </div>
            )}

            {/* Comment */}
            <p className="text-gray-700 text-sm line-clamp-2">{comment}</p>
          </div>
        );
      })}
    </div>
  );
}
