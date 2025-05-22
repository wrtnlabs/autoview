import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Details of a deployment that is waiting for protection rules to pass
   *
   * @title Pending Deployment
   */
  export type pending_deployment = {
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
  };
  /**
   * The type of reviewer.
   */
  export type deployment_reviewer_type = "User" | "Team";
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
  /**
   * Groups of organization members that gives permissions on specified repositories.
   *
   * @title Team
   */
  export type team = {
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
  };
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
  const formatDate = (dt?: string | null): string =>
    dt ? new Date(dt).toLocaleString() : "N/A";
  const formatDuration = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {deployments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow">
          <LucideReact.AlertCircle size={24} className="text-gray-400 mb-2" />
          <span className="text-gray-600">No pending deployments.</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {deployments.map((dep, idx) => {
            const envName = dep.environment?.name || "Unnamed Environment";
            const waitTimer = formatDuration(dep.wait_timer);
            const startedAt = formatDate(dep.wait_timer_started_at);

            return (
              <li
                key={idx}
                className="p-4 bg-white rounded-lg shadow flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="flex items-center text-lg font-medium text-gray-800">
                    <LucideReact.Layers
                      size={20}
                      className="text-blue-500 mr-2"
                    />
                    {envName}
                  </h3>
                  {dep.current_user_can_approve ? (
                    <div className="flex items-center text-green-600 text-sm">
                      <LucideReact.CheckCircle size={16} className="mr-1" />
                      You can approve
                    </div>
                  ) : (
                    <div className="flex items-center text-amber-600 text-sm">
                      <LucideReact.Clock size={16} className="mr-1" />
                      Awaiting approval
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <LucideReact.Timer size={16} className="mr-1" />
                    Wait Timer: {waitTimer}
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="mr-1" />
                    Started: {startedAt}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Reviewers:
                  </span>
                  {dep.reviewers && dep.reviewers.length > 0 ? (
                    <ul className="mt-1 space-y-1">
                      {dep.reviewers.map((r, i) => {
                        const isTeam = r.type === "Team";
                        const reviewer = r.reviewer;
                        let name = "Unknown";
                        if (reviewer) {
                          if ("login" in reviewer) {
                            // simple_user
                            name = reviewer.name || reviewer.login;
                          } else {
                            // team or nullable_team_simple
                            name = reviewer.name;
                          }
                        }
                        return (
                          <li
                            key={i}
                            className="flex items-center text-sm text-gray-600"
                          >
                            {isTeam ? (
                              <LucideReact.Users
                                size={16}
                                className="text-indigo-500 mr-1"
                              />
                            ) : (
                              <LucideReact.User
                                size={16}
                                className="text-gray-500 mr-1"
                              />
                            )}
                            {name}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="mt-1 text-sm text-gray-500">
                      No reviewers specified.
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
