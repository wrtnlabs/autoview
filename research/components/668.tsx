import { tags } from "typia";
import React from "react";
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
    export type code_scanning_alert_dismissed_reason = "false positive" | "won't fix" | "used in tests" | null;
    /**
     * The dismissal comment associated with the dismissal of the alert.
    */
    export type code_scanning_alert_dismissed_comment = (string & tags.MaxLength<280>) | null;
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
    export type code_scanning_alert_classification = "source" | "generated" | "test" | "library" | null;
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_alert_items[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalAlerts = value.length;
  const counts = value.reduce(
    (acc, alert) => {
      const stateKey = alert.state ?? "unknown";
      if (stateKey === "open") acc.open++;
      else if (stateKey === "dismissed") acc.dismissed++;
      else if (stateKey === "fixed") acc.fixed++;
      else acc.unknown++;
      return acc;
    },
    { open: 0, dismissed: 0, fixed: 0, unknown: 0 }
  );
  const formatDate = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {/* Summary Bar */}
      <section className="p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
        {totalAlerts} Alert{totalAlerts !== 1 ? "s" : ""}:{" "}
        <span className="font-medium text-green-600">{counts.open} Open</span>,{" "}
        <span className="font-medium text-yellow-600">{counts.dismissed} Dismissed</span>,{" "}
        <span className="font-medium text-gray-600">{counts.fixed} Fixed</span>
      </section>

      {/* Alert List */}
      <ul className="space-y-4">
        {value.map((alert) => {
          const stateKey = alert.state ?? "unknown";
          const stateLabel = stateKey.charAt(0).toUpperCase() + stateKey.slice(1);
          const stateStyles: Record<string, string> = {
            open: "text-green-700 bg-green-100",
            dismissed: "text-yellow-700 bg-yellow-100",
            fixed: "text-gray-700 bg-gray-100",
            unknown: "text-gray-700 bg-gray-100",
          };
          const ruleName = alert.rule?.name ?? alert.rule?.id ?? "Unnamed Rule";
          const severity = alert.rule?.security_severity_level
            ? alert.rule.security_severity_level.toUpperCase()
            : null;
          const toolLabel = alert.tool?.name
            ? alert.tool.version
              ? `${alert.tool.name} v${alert.tool.version}`
              : alert.tool.name
            : null;
          const createdAt = formatDate(alert.created_at);
          const message = alert.most_recent_instance?.message?.text;
          const loc = alert.most_recent_instance?.location;

          return (
            <li
              key={alert.number}
              className="p-4 bg-white rounded-lg shadow flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">#{alert.number}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${stateStyles[stateKey]}`}
                  >
                    {stateLabel}
                  </span>
                </div>
                <time className="text-sm text-gray-500">{createdAt}</time>
              </div>

              {/* Rule & Meta */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                {ruleName}
              </h3>
              <div className="flex flex-wrap items-center text-sm text-gray-600 mb-2 space-x-2">
                {severity && (
                  <span className="px-1 bg-red-100 text-red-800 rounded">{severity}</span>
                )}
                {toolLabel && (
                  <span className="px-1 bg-blue-100 text-blue-800 rounded">{toolLabel}</span>
                )}
              </div>

              {/* Message */}
              {message && (
                <p className="text-gray-700 text-sm mb-2 overflow-hidden line-clamp-2">
                  {message}
                </p>
              )}

              {/* Location */}
              {loc?.path && (
                <p className="text-sm text-gray-500">
                  Path:{" "}
                  <span className="font-mono break-all">
                    {loc.path}
                    {loc.start_line &&
                      `:${loc.start_line}${
                        loc.end_line && loc.end_line !== loc.start_line
                          ? `-${loc.end_line}`
                          : ""
                      }`}
                  </span>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
