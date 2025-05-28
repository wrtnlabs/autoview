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
  // 1. Derived constants and utility functions
  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      : "—";

  const stateMap: Record<string, { icon: JSX.Element; label: string }> = {
    open: {
      icon: <LucideReact.Clock className="text-amber-500" size={16} />,
      label: "Open",
    },
    fixed: {
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
      label: "Fixed",
    },
    dismissed: {
      icon: <LucideReact.XCircle className="text-red-500" size={16} />,
      label: "Dismissed",
    },
    null: {
      icon: <LucideReact.AlertCircle className="text-gray-400" size={16} />,
      label: "Unknown",
    },
  };

  const rule = value.rule;
  const description = rule?.full_description || rule?.description || "";

  const sev = (rule?.severity as "none" | "note" | "warning" | "error") || "none";
  const severityColors: Record<"none" | "note" | "warning" | "error", string> = {
    none: "bg-gray-100 text-gray-800",
    note: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  const ssl = (rule?.security_severity_level as "low" | "medium" | "high" | "critical") || "low";
  const securityColors: Record<"low" | "medium" | "high" | "critical", string> = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  };

  const stateKey = value.state || "null";
  const { icon: stateIcon, label: stateLabel } = stateMap[stateKey];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.AlertCircle className="text-gray-500" size={20} />
          <span className="font-semibold text-lg">Alert #{value.number}</span>
        </div>
        <div className="flex items-center text-sm font-medium">
          {stateIcon}
          <span className="ml-1">{stateLabel}</span>
        </div>
      </div>

      {/* Rule information */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <LucideReact.FileText className="text-gray-500" size={16} />
          <span className="font-medium">{rule?.name || "Unnamed Rule"}</span>
          <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded ${severityColors[sev]}`}>
            {sev.charAt(0).toUpperCase() + sev.slice(1)}
          </span>
          <span className={`ml-1 text-xs font-semibold px-2 py-0.5 rounded ${securityColors[ssl]}`}>
            {ssl.charAt(0).toUpperCase() + ssl.slice(1)}
          </span>
        </div>
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        )}
      </div>

      {/* Timestamps */}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {formatDate(value.created_at)}</span>
        </div>
        {value.updated_at && (
          <div className="flex items-center gap-1">
            <LucideReact.Edit2 size={16} />
            <span>Updated: {formatDate(value.updated_at)}</span>
          </div>
        )}
        {value.fixed_at && (
          <div className="flex items-center gap-1 col-span-2">
            <LucideReact.CheckCircle className="text-green-500" size={16} />
            <span>Fixed: {formatDate(value.fixed_at)}</span>
          </div>
        )}
        {value.state === "dismissed" && value.dismissed_at && (
          <div className="flex items-center gap-1 col-span-2">
            <LucideReact.XCircle className="text-red-500" size={16} />
            <span>
              Dismissed: {formatDate(value.dismissed_at)}
              {value.dismissed_by?.login && ` by ${value.dismissed_by.login}`}
            </span>
          </div>
        )}
      </div>

      {/* Link to alert */}
      <div className="text-xs text-gray-400 truncate flex items-center gap-1">
        <LucideReact.Link size={14} />
        <span title={value.html_url}>{value.html_url}</span>
      </div>

      {/* Tool info */}
      {value.tool?.name && (
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <LucideReact.Code size={14} />
          <span>
            {value.tool.name}
            {value.tool.version && ` v${value.tool.version}`}
          </span>
        </div>
      )}
    </div>
  );
}
