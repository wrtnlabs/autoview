import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type code_scanning_alert_items = {
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
  export type code_scanning_alert_dismissed_reason =
    | "false positive"
    | "won't fix"
    | "used in tests"
    | null;
  /**
   * The dismissal comment associated with the dismissal of the alert.
   */
  export type code_scanning_alert_dismissed_comment =
    | (string & tags.MaxLength<280>)
    | null;
  export type code_scanning_alert_rule_summary = {
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
  export type code_scanning_alert_classification =
    | "source"
    | "generated"
    | "test"
    | "library"
    | null;
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_alert_items[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleString() : "—";

  const severityColorMap: Record<
    NonNullable<
      AutoViewInputSubTypes.code_scanning_alert_rule_summary["security_severity_level"]
    >,
    string
  > = {
    critical: "border-red-500",
    high: "border-orange-500",
    medium: "border-yellow-500",
    low: "border-green-500",
  };

  const stateBadge = (
    state: AutoViewInputSubTypes.code_scanning_alert_state,
  ) => {
    switch (state) {
      case "open":
        return (
          <div className="inline-flex items-center px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
            <LucideReact.Clock className="mr-1" size={12} />
            Open
          </div>
        );
      case "fixed":
        return (
          <div className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            <LucideReact.CheckCircle className="mr-1" size={12} />
            Fixed
          </div>
        );
      case "dismissed":
        return (
          <div className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
            <LucideReact.XCircle className="mr-1" size={12} />
            Dismissed
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
            Unknown
          </div>
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="flex flex-col items-center text-gray-400 py-8">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No alerts available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((item) => {
        const sevLevel = item.rule.security_severity_level ?? "low";
        const borderColor = severityColorMap[sevLevel] || "border-gray-200";
        return (
          <div
            key={item.number}
            className={`border-l-4 ${borderColor} bg-white p-4 rounded-lg shadow-sm flex flex-col space-y-2`}
          >
            {/* Header: Rule name and state */}
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.rule.name ?? "Unnamed rule"}
              </h3>
              {stateBadge(item.state)}
            </div>

            {/* Summary / Description */}
            {item.rule.description && (
              <p className="text-sm text-gray-700 line-clamp-2">
                {item.rule.description}
              </p>
            )}

            {/* Meta: alert number, created date, tool */}
            <div className="flex flex-wrap text-sm text-gray-500 gap-4">
              <div className="flex items-center gap-1">
                <span className="font-mono text-gray-600">#{item.number}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>{formatDate(item.created_at)}</span>
              </div>
              {item.tool?.name && (
                <div className="flex items-center gap-1">
                  <LucideReact.Code size={16} />
                  <span>{item.tool.name}</span>
                </div>
              )}
            </div>

            {/* Location in most recent instance */}
            {item.most_recent_instance.location?.path && (
              <div className="flex items-center text-sm text-gray-500 gap-1">
                <LucideReact.FileText size={16} />
                <span>
                  {item.most_recent_instance.location.path}
                  {item.most_recent_instance.location.start_line
                    ? `:${item.most_recent_instance.location.start_line}${
                        item.most_recent_instance.location.end_line
                          ? `-${item.most_recent_instance.location.end_line}`
                          : ""
                      }`
                    : ""}
                </span>
              </div>
            )}

            {/* Dismissal or Fix info */}
            {item.state === "dismissed" && item.dismissed_by && (
              <div className="flex flex-col text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-1">
                  <LucideReact.User size={16} />
                  <span>
                    Dismissed by {item.dismissed_by.login} on{" "}
                    {formatDate(item.dismissed_at)}
                  </span>
                </div>
                {item.dismissed_reason && (
                  <div className="flex items-center gap-1">
                    <LucideReact.AlertTriangle size={16} />
                    <span className="capitalize">
                      Reason: {item.dismissed_reason}
                    </span>
                  </div>
                )}
                {item.dismissed_comment && (
                  <p className="text-sm text-gray-700 italic line-clamp-2">
                    “{item.dismissed_comment}”
                  </p>
                )}
              </div>
            )}
            {item.state === "fixed" && item.fixed_at && (
              <div className="flex items-center text-sm text-gray-600 gap-1">
                <LucideReact.CheckCircle size={16} />
                <span>Fixed at {formatDate(item.fixed_at)}</span>
              </div>
            )}

            {/* URL display */}
            {item.html_url && (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <LucideReact.Link size={16} />
                <span className="break-all line-clamp-1">{item.html_url}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
