import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type organization_secret_scanning_alert = {
    number?: AutoViewInputSubTypes.alert_number;
    created_at?: AutoViewInputSubTypes.alert_created_at;
    updated_at?: AutoViewInputSubTypes.nullable_alert_updated_at;
    url?: AutoViewInputSubTypes.alert_url;
    html_url?: AutoViewInputSubTypes.alert_html_url;
    /**
     * The REST API URL of the code locations for this alert.
     */
    locations_url?: string;
    state?: AutoViewInputSubTypes.secret_scanning_alert_state;
    resolution?: AutoViewInputSubTypes.secret_scanning_alert_resolution;
    /**
     * The time that the alert was resolved in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
     */
    resolved_at?: (string & tags.Format<"date-time">) | null;
    resolved_by?: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * The type of secret that secret scanning detected.
     */
    secret_type?: string;
    /**
     * User-friendly name for the detected secret, matching the `secret_type`.
     * For a list of built-in patterns, see "[Supported secret scanning patterns](https://docs.github.com/code-security/secret-scanning/introduction/supported-secret-scanning-patterns#supported-secrets)."
     */
    secret_type_display_name?: string;
    /**
     * The secret that was detected.
     */
    secret?: string;
    repository?: AutoViewInputSubTypes.simple_repository;
    /**
     * Whether push protection was bypassed for the detected secret.
     */
    push_protection_bypassed?: boolean | null;
    push_protection_bypassed_by?: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * The time that push protection was bypassed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
     */
    push_protection_bypassed_at?: (string & tags.Format<"date-time">) | null;
    push_protection_bypass_request_reviewer?: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * An optional comment when reviewing a push protection bypass.
     */
    push_protection_bypass_request_reviewer_comment?: string | null;
    /**
     * An optional comment when requesting a push protection bypass.
     */
    push_protection_bypass_request_comment?: string | null;
    /**
     * The URL to a push protection bypass request.
     */
    push_protection_bypass_request_html_url?:
      | (string & tags.Format<"uri">)
      | null;
    /**
     * The comment that was optionally added when this alert was closed
     */
    resolution_comment?: string | null;
    /**
     * The token status as of the latest validity check.
     */
    validity?: "active" | "inactive" | "unknown";
    /**
     * Whether the secret was publicly leaked.
     */
    publicly_leaked?: boolean | null;
    /**
     * Whether the detected secret was found in multiple repositories in the same organization or enterprise.
     */
    multi_repo?: boolean | null;
    /**
     * A boolean value representing whether or not alert is base64 encoded
     */
    is_base64_encoded?: boolean | null;
  };
  /**
   * The security alert number.
   */
  export type alert_number = number & tags.Type<"int32">;
  /**
   * The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type alert_created_at = string;
  /**
   * The time that the alert was last updated in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type nullable_alert_updated_at =
    | (string & tags.Format<"date-time">)
    | null;
  /**
   * The REST API URL of the alert resource.
   */
  export type alert_url = string;
  /**
   * The GitHub URL of the alert resource.
   */
  export type alert_html_url = string;
  /**
   * Sets the state of the secret scanning alert. You must provide `resolution` when you set the state to `resolved`.
   */
  export type secret_scanning_alert_state = "open" | "resolved";
  /**
   * **Required when the `state` is `resolved`.** The reason for resolving the alert.
   */
  export type secret_scanning_alert_resolution =
    | "false_positive"
    | "wont_fix"
    | "revoked"
    | "used_in_tests"
    | null;
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
  /**
   * A GitHub repository.
   *
   * @title Simple Repository
   */
  export type simple_repository = {
    /**
     * A unique identifier of the repository.
     */
    id: number & tags.Type<"int32">;
    /**
     * The GraphQL identifier of the repository.
     */
    node_id: string;
    /**
     * The name of the repository.
     */
    name: string;
    /**
     * The full, globally unique, name of the repository.
     */
    full_name: string;
    owner: AutoViewInputSubTypes.simple_user;
    /**
     * Whether the repository is private.
     */
    private: boolean;
    /**
     * The URL to view the repository on GitHub.com.
     */
    html_url: string;
    /**
     * The repository description.
     */
    description: string | null;
    /**
     * Whether the repository is a fork.
     */
    fork: boolean;
    /**
     * The URL to get more information about the repository from the GitHub API.
     */
    url: string;
    /**
     * A template for the API URL to download the repository as an archive.
     */
    archive_url: string;
    /**
     * A template for the API URL to list the available assignees for issues in the repository.
     */
    assignees_url: string;
    /**
     * A template for the API URL to create or retrieve a raw Git blob in the repository.
     */
    blobs_url: string;
    /**
     * A template for the API URL to get information about branches in the repository.
     */
    branches_url: string;
    /**
     * A template for the API URL to get information about collaborators of the repository.
     */
    collaborators_url: string;
    /**
     * A template for the API URL to get information about comments on the repository.
     */
    comments_url: string;
    /**
     * A template for the API URL to get information about commits on the repository.
     */
    commits_url: string;
    /**
     * A template for the API URL to compare two commits or refs.
     */
    compare_url: string;
    /**
     * A template for the API URL to get the contents of the repository.
     */
    contents_url: string;
    /**
     * A template for the API URL to list the contributors to the repository.
     */
    contributors_url: string;
    /**
     * The API URL to list the deployments of the repository.
     */
    deployments_url: string;
    /**
     * The API URL to list the downloads on the repository.
     */
    downloads_url: string;
    /**
     * The API URL to list the events of the repository.
     */
    events_url: string;
    /**
     * The API URL to list the forks of the repository.
     */
    forks_url: string;
    /**
     * A template for the API URL to get information about Git commits of the repository.
     */
    git_commits_url: string;
    /**
     * A template for the API URL to get information about Git refs of the repository.
     */
    git_refs_url: string;
    /**
     * A template for the API URL to get information about Git tags of the repository.
     */
    git_tags_url: string;
    /**
     * A template for the API URL to get information about issue comments on the repository.
     */
    issue_comment_url: string;
    /**
     * A template for the API URL to get information about issue events on the repository.
     */
    issue_events_url: string;
    /**
     * A template for the API URL to get information about issues on the repository.
     */
    issues_url: string;
    /**
     * A template for the API URL to get information about deploy keys on the repository.
     */
    keys_url: string;
    /**
     * A template for the API URL to get information about labels of the repository.
     */
    labels_url: string;
    /**
     * The API URL to get information about the languages of the repository.
     */
    languages_url: string;
    /**
     * The API URL to merge branches in the repository.
     */
    merges_url: string;
    /**
     * A template for the API URL to get information about milestones of the repository.
     */
    milestones_url: string;
    /**
     * A template for the API URL to get information about notifications on the repository.
     */
    notifications_url: string;
    /**
     * A template for the API URL to get information about pull requests on the repository.
     */
    pulls_url: string;
    /**
     * A template for the API URL to get information about releases on the repository.
     */
    releases_url: string;
    /**
     * The API URL to list the stargazers on the repository.
     */
    stargazers_url: string;
    /**
     * A template for the API URL to get information about statuses of a commit.
     */
    statuses_url: string;
    /**
     * The API URL to list the subscribers on the repository.
     */
    subscribers_url: string;
    /**
     * The API URL to subscribe to notifications for this repository.
     */
    subscription_url: string;
    /**
     * The API URL to get information about tags on the repository.
     */
    tags_url: string;
    /**
     * The API URL to list the teams on the repository.
     */
    teams_url: string;
    /**
     * A template for the API URL to create or retrieve a raw Git tree of the repository.
     */
    trees_url: string;
    /**
     * The API URL to list the hooks on the repository.
     */
    hooks_url: string;
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
export type AutoViewInput =
  AutoViewInputSubTypes.organization_secret_scanning_alert[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso?: string | null): string => {
    if (!iso) return "—";
    const date = new Date(iso);
    return date.toLocaleString();
  };

  const formatResolution = (res?: string | null): string => {
    if (!res) return "—";
    return res
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    (e.g., return <div className="p-4 bg-white rounded-lg shadow-md">...</div>;)
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2">No alerts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((alert, idx) => {
        const key =
          alert.number != null ? `alert-${alert.number}` : `alert-${idx}`;
        const statusIcon =
          alert.state === "resolved" ? (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ) : (
            <LucideReact.Clock className="text-amber-500" size={16} />
          );

        return (
          <div key={key} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {`#${alert.number ?? "—"} — ${
                  alert.secret_type_display_name ||
                  alert.secret_type ||
                  "Secret Alert"
                }`}
              </h3>
              <div className="flex items-center">
                {statusIcon}
                <span className="ml-2 text-sm font-semibold uppercase text-gray-700">
                  {alert.state}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>Created: {formatDate(alert.created_at)}</span>
              </div>

              {alert.updated_at && (
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>Updated: {formatDate(alert.updated_at)}</span>
                </div>
              )}

              {alert.state === "resolved" && alert.resolution && (
                <div className="flex items-center gap-1">
                  <LucideReact.ShieldCheck
                    size={16}
                    className="text-blue-500"
                  />
                  <span>Resolution: {formatResolution(alert.resolution)}</span>
                </div>
              )}

              {alert.resolved_at && (
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>Resolved at: {formatDate(alert.resolved_at)}</span>
                </div>
              )}

              {alert.resolved_by && (
                <div className="flex items-center gap-1">
                  <LucideReact.User size={16} className="text-gray-400" />
                  <span>Resolved by: {alert.resolved_by.login}</span>
                </div>
              )}

              {alert.repository && (
                <div className="flex items-center gap-1">
                  <LucideReact.Folder size={16} className="text-gray-400" />
                  <span className="truncate">
                    Repo: {alert.repository.full_name}
                  </span>
                </div>
              )}

              {alert.validity && (
                <div className="flex items-center gap-1">
                  {alert.validity === "active" && (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                    />
                  )}
                  {alert.validity === "inactive" && (
                    <LucideReact.XCircle size={16} className="text-red-500" />
                  )}
                  {alert.validity === "unknown" && (
                    <LucideReact.AlertTriangle
                      size={16}
                      className="text-amber-500"
                    />
                  )}
                  <span>Validity: {alert.validity}</span>
                </div>
              )}

              {alert.publicly_leaked && (
                <div className="flex items-center gap-1">
                  <LucideReact.AlertTriangle
                    size={16}
                    className="text-red-500"
                  />
                  <span>Publicly Leaked</span>
                </div>
              )}

              {alert.multi_repo && (
                <div className="flex items-center gap-1">
                  <LucideReact.Users size={16} className="text-gray-400" />
                  <span>Multi-Repo</span>
                </div>
              )}

              {alert.push_protection_bypassed && (
                <div className="flex items-center gap-1">
                  <LucideReact.Unlock size={16} className="text-yellow-500" />
                  <span>
                    Bypassed at: {formatDate(alert.push_protection_bypassed_at)}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
