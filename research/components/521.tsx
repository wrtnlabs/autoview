import { tags } from "typia";
import React from "react";
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
        push_protection_bypass_request_html_url?: (string & tags.Format<"uri">) | null;
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
    export type nullable_alert_updated_at = (string & tags.Format<"date-time">) | null;
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
    export type secret_scanning_alert_resolution = "false_positive" | "wont_fix" | "revoked" | "used_in_tests" | null;
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
        "private": boolean;
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
export type AutoViewInput = AutoViewInputSubTypes.organization_secret_scanning_alert[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Utility functions for formatting and deriving labels
  const formatDate = (dateStr?: string | null): string =>
    dateStr ? new Date(dateStr).toLocaleString() : '-';

  const capitalize = (str?: string | null): string =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '-';

  const resolutionLabel = (res?: string | null): string =>
    res
      ? res
          .split('_')
          .map((w) => capitalize(w))
          .join(' ')
      : '-';

  const maskSecret = (sec?: string): string =>
    sec
      ? sec.length > 12
        ? `${sec.slice(0, 6)}…${sec.slice(-4)}`
        : sec
      : '-';

  // 2. Early return if no data
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No secret-scanning alerts to display.
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="space-y-6">
      {value.map((alert, idx) => (
        <div
          key={idx}
          className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3"
        >
          {/* Header: Alert number and state */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Alert #{alert.number ?? '-'}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                alert.state === 'open'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {capitalize(alert.state)}
            </span>
          </div>

          {/* Resolution info if resolved */}
          {alert.state === 'resolved' && (
            <div className="text-sm text-gray-600">
              Resolved{' '}
              <span className="font-medium">
                {resolutionLabel(alert.resolution)}
              </span>{' '}
              at <span className="font-medium">{formatDate(alert.resolved_at)}</span>
              {alert.resolved_by?.login
                ? ` by ${alert.resolved_by.login}`
                : ''}
            </div>
          )}

          {/* Timestamps */}
          <div className="flex flex-wrap text-sm text-gray-500 gap-x-4">
            <div>Created: {formatDate(alert.created_at)}</div>
            {alert.updated_at && <div>Updated: {formatDate(alert.updated_at)}</div>}
          </div>

          {/* Repository */}
          {alert.repository && (
            <div className="text-sm text-gray-700">
              <span className="font-medium">Repo:</span>{' '}
              {alert.repository.full_name}
            </div>
          )}

          {/* Badges for flags */}
          <div className="flex flex-wrap gap-2">
            {alert.validity && (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  alert.validity === 'active'
                    ? 'bg-green-100 text-green-800'
                    : alert.validity === 'inactive'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                Validity: {capitalize(alert.validity)}
              </span>
            )}
            {alert.publicly_leaked && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                Publicly Leaked
              </span>
            )}
            {alert.multi_repo && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                Multi-Repo
              </span>
            )}
            {alert.push_protection_bypassed && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                Push Bypassed
              </span>
            )}
          </div>

          {/* Secret type and masked secret */}
          <div className="text-sm text-gray-700">
            <span className="font-medium">Secret Type:</span>{' '}
            {alert.secret_type_display_name || alert.secret_type || '-'}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Secret:</span>{' '}
            <span className="font-mono">{maskSecret(alert.secret)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
