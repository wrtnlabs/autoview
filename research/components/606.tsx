import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Details of a deployment that is waiting for protection rules to pass
     *
     * @title Pending Deployment
    */
    export interface pending_deployment {
        environment: {
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
        };
        /**
         * The set duration of the wait timer
        */
        wait_timer: number & tags.Type<"int32">;
        /**
         * The time that the wait timer began.
        */
        wait_timer_started_at: (string & tags.Format<"date-time">) | null;
        /**
         * Whether the currently authenticated user can approve the deployment
        */
        current_user_can_approve: boolean;
        /**
         * The people or teams that may approve jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed.
        */
        reviewers: {
            type?: AutoViewInputSubTypes.deployment_reviewer_type;
            reviewer?: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.team;
        }[];
    }
    /**
     * The type of reviewer.
    */
    export type deployment_reviewer_type = "User" | "Team";
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
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team
    */
    export interface team {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        slug: string;
        description: string | null;
        privacy?: string;
        notification_setting?: string;
        permission: string;
        permissions?: {
            pull: boolean;
            triage: boolean;
            push: boolean;
            maintain: boolean;
            admin: boolean;
        };
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        members_url: string;
        repositories_url: string & tags.Format<"uri">;
        parent: AutoViewInputSubTypes.nullable_team_simple;
    }
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export type nullable_team_simple = {
        /**
         * Unique identifier of the team
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the team
        */
        url: string;
        members_url: string;
        /**
         * Name of the team
        */
        name: string;
        /**
         * Description of the team
        */
        description: string | null;
        /**
         * Permission that the team will have for its repositories
        */
        permission: string;
        /**
         * The level of privacy this team should have
        */
        privacy?: string;
        /**
         * The notification setting the team has set
        */
        notification_setting?: string;
        html_url: string & tags.Format<"uri">;
        repositories_url: string & tags.Format<"uri">;
        slug: string;
        /**
         * Distinguished Name (DN) that team maps to within LDAP environment
        */
        ldap_dn?: string;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.pending_deployment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const deployments = value;
  const formatDate = (dateStr: string | null): string =>
    dateStr ? new Date(dateStr).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—';

  const formatDuration = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const parts: string[] = [];
    if (h) parts.push(`${h}h`);
    if (m) parts.push(`${m}m`);
    if (s || parts.length === 0) parts.push(`${s}s`);
    return parts.join(' ');
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {deployments.map((dep, idx) => {
        const env = dep.environment;
        return (
          <div key={env.id ?? idx} className="p-4 bg-white rounded-lg shadow-sm">
            {/* Header: Environment Name and Approval Status */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <LucideReact.Tag size={20} className="text-gray-500" />
                <span className="font-semibold text-gray-800">
                  {env.name ?? 'Unnamed Environment'}
                </span>
                {env.html_url && (
                  <a
                    href={env.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-500 hover:underline flex items-center"
                    aria-label="Environment Link"
                  >
                    <LucideReact.Link size={16} />
                  </a>
                )}
              </div>
              <div className="flex items-center">
                {dep.current_user_can_approve ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                    aria-label="You can approve"
                  />
                ) : (
                  <LucideReact.XCircle
                    className="text-red-500"
                    size={16}
                    aria-label="Cannot approve"
                  />
                )}
              </div>
            </div>

            {/* Timer Info */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm text-gray-600 mb-2">
              <div className="flex items-center space-x-1">
                <LucideReact.Clock size={16} />
                <span>Wait: {formatDuration(dep.wait_timer)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} />
                <span>Started: {formatDate(dep.wait_timer_started_at)}</span>
              </div>
            </div>

            {/* Reviewers */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Reviewers:
              </span>
              <div className="flex flex-wrap gap-3">
                {dep.reviewers && dep.reviewers.length > 0 ? (
                  dep.reviewers.map((r, j) => {
                    const reviewer = r.reviewer;
                    if (!reviewer) return null;

                    // User Reviewer
                    if (r.type === 'User' && 'avatar_url' in reviewer) {
                      const displayName = reviewer.name ?? reviewer.login;
                      return (
                        <div key={j} className="flex items-center space-x-2">
                          <img
                            src={reviewer.avatar_url}
                            alt={displayName}
                            className="w-6 h-6 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                displayName
                              )}&background=ddd&color=555`;
                            }}
                          />
                          <span className="text-sm text-gray-800">{displayName}</span>
                        </div>
                      );
                    }

                    // Team Reviewer
                    if (r.type === 'Team' && 'slug' in reviewer) {
                      return (
                        <div key={j} className="flex items-center space-x-2">
                          <LucideReact.Users size={20} className="text-indigo-500" />
                          <span className="text-sm text-gray-800">{reviewer.name}</span>
                        </div>
                      );
                    }

                    return null;
                  })
                ) : (
                  <span className="text-sm text-gray-500">No reviewers assigned</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
