import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface code_scanning_organization_alert_items {
        number: AutoViewInputSubTypes.alert_number;
        created_at: AutoViewInputSubTypes.alert_created_at;
        updated_at?: AutoViewInputSubTypes.alert_updated_at;
        url: AutoViewInputSubTypes.alert_url;
        html_url: AutoViewInputSubTypes.alert_html_url;
        instances_url: AutoViewInputSubTypes.alert_instances_url;
        state: AutoViewInputSubTypes.code_scanning_alert_state;
        fixed_at?: AutoViewInputSubTypes.alert_fixed_at;
        dismissed_by: AutoViewInputSubTypes.nullable_simple_user;
        dismissed_at: AutoViewInputSubTypes.alert_dismissed_at;
        dismissed_reason: AutoViewInputSubTypes.code_scanning_alert_dismissed_reason;
        dismissed_comment?: AutoViewInputSubTypes.code_scanning_alert_dismissed_comment;
        rule: AutoViewInputSubTypes.code_scanning_alert_rule_summary;
        tool: AutoViewInputSubTypes.code_scanning_analysis_tool;
        most_recent_instance: AutoViewInputSubTypes.code_scanning_alert_instance;
        repository: AutoViewInputSubTypes.simple_repository;
        dismissal_approved_by?: AutoViewInputSubTypes.nullable_simple_user;
    }
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
    export type alert_updated_at = string;
    /**
     * The REST API URL of the alert resource.
    */
    export type alert_url = string;
    /**
     * The GitHub URL of the alert resource.
    */
    export type alert_html_url = string;
    /**
     * The REST API URL for fetching the list of instances for an alert.
    */
    export type alert_instances_url = string;
    /**
     * State of a code scanning alert.
    */
    export type code_scanning_alert_state = "open" | "dismissed" | "fixed" | null;
    /**
     * The time that the alert was no longer detected and was considered fixed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_fixed_at = (string & tags.Format<"date-time">) | null;
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
     * The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_dismissed_at = (string & tags.Format<"date-time">) | null;
    /**
     * **Required when the state is dismissed.** The reason for dismissing or closing the alert.
    */
    export type code_scanning_alert_dismissed_reason = "false positive" | "won't fix" | "used in tests" | null;
    /**
     * The dismissal comment associated with the dismissal of the alert.
    */
    export type code_scanning_alert_dismissed_comment = (string & tags.MaxLength<280>) | null;
    export interface code_scanning_alert_rule_summary {
        /**
         * A unique identifier for the rule used to detect the alert.
        */
        id?: string | null;
        /**
         * The name of the rule used to detect the alert.
        */
        name?: string;
        /**
         * The severity of the alert.
        */
        severity?: "none" | "note" | "warning" | "error" | null;
        /**
         * The security severity of the alert.
        */
        security_severity_level?: "low" | "medium" | "high" | "critical" | null;
        /**
         * A short description of the rule used to detect the alert.
        */
        description?: string;
        /**
         * A description of the rule used to detect the alert.
        */
        full_description?: string;
        /**
         * A set of tags applicable for the rule.
        */
        tags?: string[] | null;
        /**
         * Detailed documentation for the rule as GitHub Flavored Markdown.
        */
        help?: string | null;
        /**
         * A link to the documentation for the rule used to detect the alert.
        */
        help_uri?: string | null;
    }
    export interface code_scanning_analysis_tool {
        name?: AutoViewInputSubTypes.code_scanning_analysis_tool_name;
        version?: AutoViewInputSubTypes.code_scanning_analysis_tool_version;
        guid?: AutoViewInputSubTypes.code_scanning_analysis_tool_guid;
    }
    /**
     * The name of the tool used to generate the code scanning analysis.
    */
    export type code_scanning_analysis_tool_name = string;
    /**
     * The version of the tool used to generate the code scanning analysis.
    */
    export type code_scanning_analysis_tool_version = string | null;
    /**
     * The GUID of the tool used to generate the code scanning analysis, if provided in the uploaded SARIF data.
    */
    export type code_scanning_analysis_tool_guid = string | null;
    export interface code_scanning_alert_instance {
        ref?: AutoViewInputSubTypes.code_scanning_ref;
        analysis_key?: AutoViewInputSubTypes.code_scanning_analysis_analysis_key;
        environment?: AutoViewInputSubTypes.code_scanning_alert_environment;
        category?: AutoViewInputSubTypes.code_scanning_analysis_category;
        state?: AutoViewInputSubTypes.code_scanning_alert_state;
        commit_sha?: string;
        message?: {
            text?: string;
        };
        location?: AutoViewInputSubTypes.code_scanning_alert_location;
        html_url?: string;
        /**
         * Classifications that have been applied to the file that triggered the alert.
         * For example identifying it as documentation, or a generated file.
        */
        classifications?: AutoViewInputSubTypes.code_scanning_alert_classification[];
    }
    /**
     * The Git reference, formatted as `refs/pull/<number>/merge`, `refs/pull/<number>/head`,
     * `refs/heads/<branch name>` or simply `<branch name>`.
    */
    export type code_scanning_ref = string;
    /**
     * Identifies the configuration under which the analysis was executed. For example, in GitHub Actions this includes the workflow filename and job name.
    */
    export type code_scanning_analysis_analysis_key = string;
    /**
     * Identifies the variable values associated with the environment in which the analysis that generated this alert instance was performed, such as the language that was analyzed.
    */
    export type code_scanning_alert_environment = string;
    /**
     * Identifies the configuration under which the analysis was executed. Used to distinguish between multiple analyses for the same tool and commit, but performed on different languages or different parts of the code.
    */
    export type code_scanning_analysis_category = string;
    /**
     * Describe a region within a file for the alert.
    */
    export interface code_scanning_alert_location {
        path?: string;
        start_line?: number & tags.Type<"int32">;
        end_line?: number & tags.Type<"int32">;
        start_column?: number & tags.Type<"int32">;
        end_column?: number & tags.Type<"int32">;
    }
    /**
     * A classification of the file. For example to identify it as generated.
    */
    export type code_scanning_alert_classification = "source" | "generated" | "test" | "library" | null;
    /**
     * A GitHub repository.
     *
     * @title Simple Repository
    */
    export interface simple_repository {
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
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_organization_alert_items[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateString?: string | null): string =>
    dateString ? new Date(dateString).toLocaleString() : 'N/A';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-lg">No alerts available</span>
        </div>
      ) : (
        value.map((alert) => {
          // Prepare dismissal fallback
          const dismissedByLogin = alert.dismissed_by?.login || 'Unknown';

          // Determine state styling and icon
          const { state } = alert;
          let stateIcon: JSX.Element;
          let stateLabel: string;
          let stateBg: string;
          let stateText: string;
          switch (state) {
            case 'open':
              stateLabel = 'Open';
              stateIcon = <LucideReact.Clock className="text-blue-500" size={16} />;
              stateBg = 'bg-blue-100';
              stateText = 'text-blue-800';
              break;
            case 'fixed':
              stateLabel = 'Fixed';
              stateIcon = <LucideReact.CheckCircle className="text-green-500" size={16} />;
              stateBg = 'bg-green-100';
              stateText = 'text-green-800';
              break;
            case 'dismissed':
              stateLabel = 'Dismissed';
              stateIcon = <LucideReact.XCircle className="text-gray-500" size={16} />;
              stateBg = 'bg-gray-100';
              stateText = 'text-gray-800';
              break;
            default:
              stateLabel = 'Unknown';
              stateIcon = <LucideReact.HelpCircle className="text-gray-400" size={16} />;
              stateBg = 'bg-gray-100';
              stateText = 'text-gray-500';
          }

          // Determine severity styling
          const sevLevel = alert.rule.security_severity_level || alert.rule.severity || 'unknown';
          let sevBg: string;
          let sevText: string;
          switch (sevLevel) {
            case 'critical':
            case 'error':
              sevBg = 'bg-red-100';
              sevText = 'text-red-800';
              break;
            case 'high':
            case 'warning':
              sevBg = 'bg-yellow-100';
              sevText = 'text-yellow-800';
              break;
            case 'medium':
            case 'note':
              sevBg = 'bg-blue-100';
              sevText = 'text-blue-800';
              break;
            case 'low':
            case 'none':
              sevBg = 'bg-gray-100';
              sevText = 'text-gray-800';
              break;
            default:
              sevBg = 'bg-gray-100';
              sevText = 'text-gray-600';
          }

          return (
            <div key={alert.number} className="p-4 bg-white rounded-lg shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {stateIcon}
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    #{alert.number} {alert.rule.name || alert.rule.id || 'Alert'}
                  </h2>
                </div>
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${stateBg} ${stateText}`}>
                  {stateLabel}
                </span>
              </div>
              {/* Metadata */}
              <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar size={16} />
                  <span>Created: {formatDate(alert.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.Link size={16} />
                  <a
                    href={alert.html_url}
                    className="hover:underline text-blue-600 truncate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {alert.repository.full_name}
                  </a>
                </div>
              </div>
              {/* Severity */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${sevBg} ${sevText}`}>
                  {sevLevel}
                </span>
              </div>
              {/* Description */}
              {alert.rule.description && (
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                  {alert.rule.description}
                </p>
              )}
              {/* Location */}
              {alert.most_recent_instance.location?.path && (
                <div className="mt-2 flex items-center text-sm text-gray-500 space-x-1">
                  <LucideReact.FileText size={16} />
                  <span className="truncate">
                    {alert.most_recent_instance.location.path}
                    {alert.most_recent_instance.location.start_line != null &&
                      `:${alert.most_recent_instance.location.start_line}`}
                  </span>
                </div>
              )}
              {/* Dismissal Info */}
              {alert.state === 'dismissed' && alert.dismissed_at && (
                <div className="mt-4 border-t pt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <LucideReact.User size={16} />
                    {alert.dismissed_by?.avatar_url && (
                      <img
                        src={alert.dismissed_by.avatar_url}
                        alt={dismissedByLogin}
                        className="w-5 h-5 rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            dismissedByLogin,
                          )}`;
                        }}
                      />
                    )}
                    <span className="font-medium">{dismissedByLogin}</span>
                    <span className="text-gray-400">
                      dismissed at {formatDate(alert.dismissed_at)}
                    </span>
                  </div>
                  {alert.dismissed_reason && (
                    <p className="mt-1">
                      <strong>Reason:</strong> {alert.dismissed_reason}
                    </p>
                  )}
                  {alert.dismissed_comment && (
                    <p className="mt-1 text-gray-700 line-clamp-2">
                      <strong>Comment:</strong> {alert.dismissed_comment}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
