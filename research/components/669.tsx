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
  const {
    number,
    created_at,
    updated_at,
    state,
    fixed_at,
    dismissed_at,
    dismissed_by,
    dismissed_reason,
    dismissed_comment,
    rule,
    tool,
    most_recent_instance,
  } = value;

  const parseDate = (iso?: string | null) =>
    iso ? new Date(iso) : null;

  const formatDate = (date: Date | null): string =>
    date
      ? date.toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '--';

  const createdDate = parseDate(created_at);
  const updatedDate = parseDate(updated_at);
  const fixedDate = parseDate(fixed_at as string | null);
  const dismissedDate = parseDate(dismissed_at as string | null);

  const stateColors: Record<string, string> = {
    open: 'bg-green-100 text-green-800',
    fixed: 'bg-blue-100 text-blue-800',
    dismissed: 'bg-yellow-100 text-yellow-800',
    null: 'bg-gray-100 text-gray-800',
  };
  const stateBadgeColor = stateColors[state ?? 'null'];

  const severityColors: Record<string, string> = {
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    note: 'bg-blue-100 text-blue-800',
    none: 'bg-gray-100 text-gray-800',
    null: 'bg-gray-100 text-gray-800',
  };
  const severityBadgeColor = severityColors[rule.severity ?? 'null'];

  const securityColors: Record<string, string> = {
    low: 'bg-green-50 text-green-700',
    medium: 'bg-yellow-50 text-yellow-700',
    high: 'bg-red-50 text-red-700',
    critical: 'bg-purple-50 text-purple-700',
    null: 'bg-gray-50 text-gray-700',
  };
  const securityBadgeColor = securityColors[rule.security_severity_level ?? 'null'];

  const loc = most_recent_instance.location;
  const locationText = loc?.path
    ? `${loc.path}${loc.start_line ? `:${loc.start_line}` : ''}`
    : null;

  const messageText = most_recent_instance.message?.text;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Alert #{number}</h2>
        <span className={`px-2 py-1 text-sm font-medium rounded ${stateBadgeColor}`}>
          {state ?? 'Unknown'}
        </span>
      </header>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <div>
            <dt className="inline font-medium text-gray-600">Created:</dt>{' '}
            <dd className="inline text-gray-900">{formatDate(createdDate)}</dd>
          </div>
          {updatedDate && (
            <div>
              <dt className="inline font-medium text-gray-600">Updated:</dt>{' '}
              <dd className="inline text-gray-900">{formatDate(updatedDate)}</dd>
            </div>
          )}
          {fixedDate && (
            <div>
              <dt className="inline font-medium text-gray-600">Fixed:</dt>{' '}
              <dd className="inline text-gray-900">{formatDate(fixedDate)}</dd>
            </div>
          )}
        </div>
        <div className="space-y-1">
          {tool.name && (
            <div>
              <dt className="inline font-medium text-gray-600">Tool:</dt>{' '}
              <dd className="inline text-gray-900">
                {tool.name}
                {tool.version ? ` v${tool.version}` : ''}
              </dd>
            </div>
          )}
          {rule.name && (
            <div>
              <dt className="inline font-medium text-gray-600">Rule:</dt>{' '}
              <dd className="inline text-gray-900">{rule.name}</dd>
            </div>
          )}
          <div className="flex space-x-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded ${severityBadgeColor}`}>
              {rule.severity ?? 'none'}
            </span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded ${securityBadgeColor}`}>
              {rule.security_severity_level ?? 'N/A'}
            </span>
          </div>
        </div>
      </dl>

      {locationText && (
        <p className="text-sm text-gray-600">
          <span className="font-medium">Location:</span>{' '}
          <span className="text-gray-900">{locationText}</span>
        </p>
      )}

      {messageText && (
        <p className="text-sm text-gray-700 line-clamp-2">{messageText}</p>
      )}

      {state === 'dismissed' && (
        <section className="border-t pt-2 space-y-1 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">Dismissed:</span>{' '}
            <span className="text-gray-900">{formatDate(dismissedDate)}</span>{' '}
            by{' '}
            <span className="text-gray-900">{dismissed_by?.login || 'Unknown'}</span>
          </p>
          {dismissed_reason && (
            <p className="text-gray-600">
              <span className="font-medium">Reason:</span>{' '}
              <span className="capitalize text-gray-900">{dismissed_reason}</span>
            </p>
          )}
          {dismissed_comment && (
            <p className="text-gray-700 line-clamp-2">"{dismissed_comment}"</p>
          )}
        </section>
      )}
    </div>
  );
}
