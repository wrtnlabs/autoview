import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface code_scanning_alert_items {
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
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_alert_items[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Format ISO dates to a medium date + short time string.
  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : '—';

  // Map rule severity to Tailwind badge colors.
  const severityColor = {
    none: 'bg-gray-100 text-gray-800',
    note: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  } as Record<NonNullable<AutoViewInputSubTypes.code_scanning_alert_rule_summary['severity']>, string>;

  // Map security severity level to Tailwind badge colors.
  const secSeverityColor = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
    critical: 'bg-purple-100 text-purple-800',
  } as Record<NonNullable<AutoViewInputSubTypes.code_scanning_alert_rule_summary['security_severity_level']>, string>;

  // Return appropriate icon for alert state.
  const getStateIcon = (state: AutoViewInputSubTypes.code_scanning_alert_state) => {
    switch (state) {
      case 'open':
        return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
      case 'fixed':
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case 'dismissed':
        return <LucideReact.XCircle className="text-amber-500" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-400" size={16} />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // Handle empty array gracefully.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No alerts available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((item) => {
        const {
          number,
          state,
          rule,
          created_at,
          updated_at,
          fixed_at,
          dismissed_at,
          dismissed_by,
          dismissed_reason,
          dismissed_comment,
          tool,
          html_url,
        } = item;

        // Derive a display title: prefer rule.name, then rule.id, fallback to alert number.
        const title = rule?.name || rule?.id || `Alert #${number}`;

        return (
          <div key={number} className="p-4 bg-white rounded-lg shadow">
            {/* Header: Icon + Title + Link */}
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                {getStateIcon(state)}
                <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
              </div>
              <div className="flex items-center space-x-1 max-w-xs">
                <LucideReact.Link size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500 truncate">{html_url}</span>
              </div>
            </div>

            {/* Badges: severity, security level, tags */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {rule?.severity && (
                <span
                  className={`px-2 py-0.5 rounded ${severityColor[rule.severity]} text-xs font-medium`}
                >
                  {rule.severity.charAt(0).toUpperCase() + rule.severity.slice(1)}
                </span>
              )}
              {rule?.security_severity_level && (
                <span
                  className={`px-2 py-0.5 rounded ${secSeverityColor[rule.security_severity_level]} text-xs font-medium`}
                >
                  {rule.security_severity_level.charAt(0).toUpperCase() +
                    rule.security_severity_level.slice(1)}
                </span>
              )}
              {rule?.tags && rule.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {rule.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Rule description (truncated) */}
            {rule?.description && (
              <p className="mt-2 text-sm text-gray-700 line-clamp-2">{rule.description}</p>
            )}

            {/* Dates & Tool Info */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} />
                <span>Created: {formatDate(created_at)}</span>
              </div>
              {updated_at && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Edit2 size={16} />
                  <span>Updated: {formatDate(updated_at)}</span>
                </div>
              )}
              {state === 'fixed' && fixed_at && (
                <div className="flex items-center space-x-1">
                  <LucideReact.CheckCircle size={16} className="text-green-500" />
                  <span>Fixed: {formatDate(fixed_at)}</span>
                </div>
              )}
              {state === 'dismissed' && (
                <div className="flex items-center space-x-1">
                  <LucideReact.XCircle size={16} className="text-amber-500" />
                  <span>Dismissed: {formatDate(dismissed_at)}</span>
                </div>
              )}
              {tool?.name && (
                <div className="flex items-center space-x-1 col-span-full sm:col-span-2">
                  <LucideReact.Code size={16} className="text-gray-400" />
                  <span>
                    {tool.name}
                    {tool.version ? ` v${tool.version}` : ''}
                    {tool.guid ? ` (${tool.guid})` : ''}
                  </span>
                </div>
              )}
            </div>

            {/* Dismissal details */}
            {state === 'dismissed' && dismissed_by && (
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Dismissed by:</span> {dismissed_by.login}
                {dismissed_reason && (
                  <>
                    <span className="mx-1">—</span>
                    <span className="italic">{dismissed_reason}</span>
                  </>
                )}
                {dismissed_comment && (
                  <p className="mt-1 text-gray-700 line-clamp-2">{dismissed_comment}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
