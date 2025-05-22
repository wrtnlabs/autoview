import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type code_scanning_alert = {
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
        rule: AutoViewInputSubTypes.code_scanning_alert_rule;
        tool: AutoViewInputSubTypes.code_scanning_analysis_tool;
        most_recent_instance: AutoViewInputSubTypes.code_scanning_alert_instance;
        dismissal_approved_by?: AutoViewInputSubTypes.nullable_simple_user;
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
    export type code_scanning_alert_rule = {
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
    };
    export type code_scanning_analysis_tool = {
        name?: AutoViewInputSubTypes.code_scanning_analysis_tool_name;
        version?: AutoViewInputSubTypes.code_scanning_analysis_tool_version;
        guid?: AutoViewInputSubTypes.code_scanning_analysis_tool_guid;
    };
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
    export type code_scanning_alert_instance = {
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
    };
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
    export type code_scanning_alert_location = {
        path?: string;
        start_line?: number & tags.Type<"int32">;
        end_line?: number & tags.Type<"int32">;
        start_column?: number & tags.Type<"int32">;
        end_column?: number & tags.Type<"int32">;
    };
    /**
     * A classification of the file. For example to identify it as generated.
    */
    export type code_scanning_alert_classification = "source" | "generated" | "test" | "library" | null;
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_alert;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateColors: Record<string, string> = {
    open: 'bg-blue-100 text-blue-800',
    dismissed: 'bg-yellow-100 text-yellow-800',
    fixed: 'bg-green-100 text-green-800',
  };
  const severityColors: Record<string, string> = {
    none: 'bg-gray-200 text-gray-800',
    note: 'bg-blue-200 text-blue-800',
    warning: 'bg-yellow-200 text-yellow-800',
    error: 'bg-red-200 text-red-800',
  };
  const formatDate = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'N/A';

  const state = value.state || 'open';
  const stateLabel = state.charAt(0).toUpperCase() + state.slice(1);
  const stateClass = stateColors[state] || 'bg-gray-100 text-gray-800';

  const severity = value.rule.severity || 'none';
  const severityLabel = severity.charAt(0).toUpperCase() + severity.slice(1);
  const severityClass = severityColors[severity] || 'bg-gray-200 text-gray-800';

  const securityLevel = value.rule.security_severity_level || 'low';
  const securityLabel = securityLevel.charAt(0).toUpperCase() + securityLevel.slice(1);
  const securityClass =
    securityLevel === 'critical'
      ? 'bg-red-200 text-red-800'
      : securityLevel === 'high'
      ? 'bg-orange-200 text-orange-800'
      : securityLevel === 'medium'
      ? 'bg-yellow-200 text-yellow-800'
      : 'bg-green-200 text-green-800';

  const description = value.rule.full_description || value.rule.description || '';

  const instance = value.most_recent_instance;
  const path = instance?.location?.path;
  const start = instance?.location?.start_line;
  const end = instance?.location?.end_line;
  const commitSha = instance?.commit_sha?.slice(0, 7);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {value.rule.name || value.rule.id || `Rule #${value.number}`}
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${severityClass}`}>
              {severityLabel}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${securityClass}`}>
              {securityLabel}
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${stateClass}`}>
          {stateLabel}
        </span>
      </div>

      {/* Metadata */}
      <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0">
        <span>Created: {formatDate(value.created_at)}</span>
        {value.updated_at && <span>Updated: {formatDate(value.updated_at)}</span>}
        {state === 'fixed' && value.fixed_at && (
          <span>Fixed: {formatDate(value.fixed_at)}</span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-700 text-sm line-clamp-3">
          {description}
        </p>
      )}

      {/* Tool Info */}
      <div className="text-sm text-gray-600">
        <span className="font-medium">Tool:</span>{' '}
        {value.tool.name || 'Unknown'}
        {value.tool.version ? ` v${value.tool.version}` : ''}
      </div>

      {/* Recent Instance */}
      {instance && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Location:</span>{' '}
          {path}
          {start != null && end != null && (
            <>: {start}{start === end ? '' : `–${end}`}</>
          )}
          {commitSha && (
            <span className="ml-2 font-mono text-xs text-gray-500">
              {commitSha}
            </span>
          )}
        </div>
      )}

      {/* Tags */}
      {value.rule.tags && value.rule.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.rule.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Dismissal Info */}
      {state === 'dismissed' && (
        <div className="border-t pt-3 space-y-2 border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">Dismissed</h3>
          <div className="text-sm text-gray-600">
            <span className="font-medium">By:</span>{' '}
            {value.dismissed_by?.login || 'Unknown'}
          </div>
          {value.dismissed_reason && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Reason:</span>{' '}
              {value.dismissed_reason}
            </div>
          )}
          {value.dismissed_comment && (
            <p className="text-gray-700 text-sm line-clamp-2">
              {value.dismissed_comment}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
