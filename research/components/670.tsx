import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  export type code_scanning_alert_classification =
    | "source"
    | "generated"
    | "test"
    | "library"
    | null;
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_alert;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formattedCreatedAt = formatDate(value.created_at);
  const formattedUpdatedAt = value.updated_at
    ? formatDate(value.updated_at)
    : null;
  const formattedFixedAt = value.fixed_at ? formatDate(value.fixed_at) : null;

  const stateIcon = (() => {
    switch (value.state) {
      case "open":
        return (
          <LucideReact.AlertTriangle
            size={16}
            className="text-blue-500"
            aria-label="Open"
          />
        );
      case "fixed":
        return (
          <LucideReact.CheckCircle
            size={16}
            className="text-green-500"
            aria-label="Fixed"
          />
        );
      case "dismissed":
        return (
          <LucideReact.XCircle
            size={16}
            className="text-amber-500"
            aria-label="Dismissed"
          />
        );
      default:
        return (
          <LucideReact.Circle
            size={16}
            className="text-gray-400"
            aria-label="Unknown"
          />
        );
    }
  })();

  const stateLabel = value.state ?? "unknown";

  const getSeverityBadgeClass = (sev: string) => {
    switch (sev) {
      case "note":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-amber-100 text-amber-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "none":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getSecurityBadgeClass = (lvl: string) => {
    switch (lvl) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const ruleName = value.rule.name ?? value.rule.id ?? "Unnamed rule";
  const severity = value.rule.severity ?? null;
  const securityLevel = value.rule.security_severity_level ?? null;
  const toolName = value.tool.name ?? "Unknown tool";
  const toolVersion = value.tool.version;

  const instance = value.most_recent_instance;
  const filePath = instance?.location?.path;
  const startLine = instance?.location?.start_line;
  const endLine = instance?.location?.end_line;
  const messageText = instance?.message?.text;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-800">
          Alert #{value.number}
        </div>
        <div className="flex items-center text-sm font-medium capitalize">
          {stateIcon}
          <span className="ml-1">{stateLabel}</span>
        </div>
      </div>

      {/* Dates */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 text-gray-500 text-sm">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Created: {formattedCreatedAt}</span>
        </div>
        {formattedUpdatedAt && (
          <div className="flex items-center">
            <LucideReact.Edit2 size={16} className="mr-1" />
            <span>Updated: {formattedUpdatedAt}</span>
          </div>
        )}
        {formattedFixedAt && (
          <div className="flex items-center">
            <LucideReact.CheckCircle
              size={16}
              className="mr-1 text-green-500"
            />
            <span>Fixed: {formattedFixedAt}</span>
          </div>
        )}
      </div>

      {/* Rule & Tool */}
      <div className="border-t pt-3 flex flex-col space-y-4">
        <div>
          <div className="text-sm text-gray-600">Rule</div>
          <div className="text-base font-medium text-gray-800 truncate">
            {ruleName}
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {severity && (
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded ${getSeverityBadgeClass(
                  severity,
                )}`}
              >
                {severity}
              </span>
            )}
            {securityLevel && (
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded ${getSecurityBadgeClass(
                  securityLevel,
                )}`}
              >
                Security: {securityLevel}
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Tool</div>
          <div className="flex items-center text-base text-gray-800">
            <LucideReact.Package size={16} className="mr-1 text-gray-500" />
            <span>
              {toolName}
              {toolVersion ? ` v${toolVersion}` : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Most Recent Instance */}
      {instance && (filePath || messageText) && (
        <div className="border-t pt-3 flex flex-col space-y-2">
          <div className="text-sm text-gray-600">Recent Instance</div>
          {filePath && (
            <div className="flex items-center text-sm text-gray-800 truncate">
              <LucideReact.FileText size={16} className="mr-1" />
              <span>
                {filePath}
                {startLine ? `:${startLine}` : ""}
                {endLine && startLine !== endLine ? `–${endLine}` : ""}
              </span>
            </div>
          )}
          {messageText && (
            <div className="flex items-start text-sm text-gray-700 line-clamp-3">
              <LucideReact.MessageSquare size={16} className="mr-1 mt-0.5" />
              <span>{messageText}</span>
            </div>
          )}
        </div>
      )}

      {/* Dismissal Details */}
      {value.state === "dismissed" && (
        <div className="border-t pt-3 flex flex-col space-y-2 text-sm text-gray-700">
          <div className="text-red-600 font-medium flex items-center">
            <LucideReact.XCircle size={16} className="mr-1" />
            Dismissed
          </div>
          {value.dismissed_by && (
            <div className="flex items-center">
              <LucideReact.User size={16} className="mr-1" />
              <span>{value.dismissed_by.login}</span>
            </div>
          )}
          {value.dismissed_reason && (
            <div>
              <span className="font-medium">Reason:</span>{" "}
              <span className="capitalize">{value.dismissed_reason}</span>
            </div>
          )}
          {value.dismissed_comment && (
            <div className="italic text-gray-600 line-clamp-3">
              "{value.dismissed_comment}"
            </div>
          )}
          {value.dismissal_approved_by && (
            <div>
              <span className="font-medium">Approved by:</span>{" "}
              {value.dismissal_approved_by.login}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
