import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface code_scanning_alert {
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
    export interface code_scanning_alert_rule {
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
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_alert;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const title = value.rule.name || value.rule.id || `Alert #${value.number}`;
  const severity = value.rule.security_severity_level || value.rule.severity;
  const stateInfo = (() => {
    switch (value.state) {
      case "open":
        return { label: "Open", Icon: LucideReact.Clock, color: "text-amber-500" };
      case "dismissed":
        return { label: "Dismissed", Icon: LucideReact.AlertTriangle, color: "text-red-500" };
      case "fixed":
        return { label: "Fixed", Icon: LucideReact.CheckCircle, color: "text-green-500" };
      default:
        return { label: "Unknown", Icon: LucideReact.HelpCircle, color: "text-gray-500" };
    }
  })();
  const formattedDate = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleString() : "—";
  const description = value.rule.full_description ?? value.rule.description ?? "";
  const instance = value.most_recent_instance;
  const locationText = instance.location?.path
    ? `${instance.location.path}${instance.location.start_line ? `:${instance.location.start_line}` : ""}`
    : "";
  const dismissedBy = value.dismissed_by?.login;
  const comment = value.dismissed_comment;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
        <div className="flex items-center text-sm font-medium">
          <stateInfo.Icon size={16} className={`mr-1 ${stateInfo.color}`} />
          <span className={stateInfo.color}>{stateInfo.label}</span>
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-600">
        <div className="flex items-center mb-1">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Created: {formattedDate(value.created_at)}</span>
        </div>
        {value.updated_at && (
          <div className="flex items-center mb-1">
            <LucideReact.RefreshCw size={16} className="mr-1" />
            <span>Updated: {formattedDate(value.updated_at)}</span>
          </div>
        )}
        {severity && (
          <div className="flex items-center mb-1">
            <LucideReact.AlertCircle size={16} className="mr-1" />
            <span>Severity: {severity}</span>
          </div>
        )}
        {value.tool?.name && (
          <div className="flex items-center mb-1">
            <LucideReact.Code size={16} className="mr-1" />
            <span>
              Tool: {value.tool.name}
              {value.tool.version ? ` v${value.tool.version}` : ""}
            </span>
          </div>
        )}
        {locationText && (
          <div className="flex items-center mb-1 col-span-2">
            <LucideReact.FileText size={16} className="mr-1" />
            <span>{locationText}</span>
          </div>
        )}
      </div>

      {value.state === "dismissed" && (
        <div className="mt-3 p-3 bg-red-50 rounded-lg">
          <div className="flex items-center text-sm text-red-700 mb-1">
            <LucideReact.User size={16} className="mr-1" />
            <span>Dismissed by: {dismissedBy || "Unknown"}</span>
          </div>
          <div className="flex items-center text-sm text-red-700 mb-1">
            <LucideReact.AlertTriangle size={16} className="mr-1" />
            <span>Reason: {value.dismissed_reason || "—"}</span>
          </div>
          {value.dismissed_at && (
            <div className="flex items-center text-sm text-red-700 mb-1">
              <LucideReact.Calendar size={16} className="mr-1" />
              <span>At: {formattedDate(value.dismissed_at)}</span>
            </div>
          )}
          {comment && (
            <p className="text-sm text-red-700 line-clamp-2">
              "{comment}"
            </p>
          )}
        </div>
      )}

      {value.state === "fixed" && value.fixed_at && (
        <div className="mt-3 flex items-center text-sm text-green-700">
          <LucideReact.CheckCircle size={16} className="mr-1" />
          <span>Fixed at: {formattedDate(value.fixed_at)}</span>
        </div>
      )}
    </div>
  );
}
