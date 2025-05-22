import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type secret_scanning_alert = {
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
     * An optional comment to resolve an alert.
     */
    resolution_comment?: string | null;
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
    push_protection_bypass_request_html_url?:
      | (string & tags.Format<"uri">)
      | null;
    /**
     * The token status as of the latest validity check.
     */
    validity?: "active" | "inactive" | "unknown";
    /**
     * Whether the detected secret was publicly leaked.
     */
    publicly_leaked?: boolean | null;
    /**
     * Whether the detected secret was found in multiple repositories under the same organization or enterprise.
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
  export type nullable_alert_updated_at =
    | (string & tags.Format<"date-time">)
    | null;
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
  export type secret_scanning_alert_resolution =
    | "false_positive"
    | "wont_fix"
    | "revoked"
    | "used_in_tests"
    | null;
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
}
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_alert[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso?: string | null): string => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderValidityIcon = (v?: "active" | "inactive" | "unknown") => {
    switch (v) {
      case "active":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "inactive":
        return <LucideReact.XCircle className="text-red-500" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-400" size={16} />;
    }
  };

  const humanize = (str: string | null | undefined): string => {
    if (!str) return "";
    return str
      .replace(/_/g, " ")
      .split(" ")
      .map((w) => w[0]?.toUpperCase() + w.slice(1))
      .join(" ");
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((alert, idx) => {
        const key = alert.number ?? idx;
        const title =
          alert.secret_type_display_name || alert.secret_type || "Secret Alert";
        const isResolved = alert.state === "resolved";

        return (
          <div
            key={key}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">
                  #{alert.number ?? "-"} {title}
                </span>
                {isResolved ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={20}
                  />
                ) : (
                  <LucideReact.Clock className="text-amber-500" size={20} />
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <LucideReact.Calendar className="mr-1" size={16} />
                <span>{formatDate(alert.created_at)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              {/* State */}
              <div className="flex items-center text-sm">
                {isResolved ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                  />
                ) : (
                  <LucideReact.Clock className="text-amber-500" size={16} />
                )}
                <span
                  className={
                    isResolved ? "ml-1 text-green-600" : "ml-1 text-amber-600"
                  }
                >
                  {isResolved ? "Resolved" : "Open"}
                </span>
              </div>

              {/* Validity */}
              {alert.validity && (
                <div className="flex items-center text-sm">
                  {renderValidityIcon(alert.validity)}
                  <span className="ml-1 capitalize">{alert.validity}</span>
                </div>
              )}

              {/* Publicly Leaked */}
              {alert.publicly_leaked && (
                <div className="flex items-center text-sm">
                  <LucideReact.AlertTriangle
                    className="text-red-500"
                    size={16}
                  />
                  <span className="ml-1 text-red-600">Leaked Publicly</span>
                </div>
              )}

              {/* Multi-Repo */}
              {alert.multi_repo && (
                <div className="flex items-center text-sm">
                  <LucideReact.Users className="text-blue-500" size={16} />
                  <span className="ml-1">Multiple Repos</span>
                </div>
              )}

              {/* Push Protection Bypassed */}
              {alert.push_protection_bypassed && (
                <div className="flex items-center text-sm">
                  <LucideReact.Unlock className="text-yellow-500" size={16} />
                  <span className="ml-1">Bypassed Protection</span>
                </div>
              )}

              {/* Resolution Reason */}
              {isResolved && alert.resolution && (
                <div className="flex items-center text-sm">
                  <LucideReact.Tag className="text-gray-500" size={16} />
                  <span className="ml-1">{humanize(alert.resolution)}</span>
                </div>
              )}

              {/* Resolved At */}
              {isResolved && (
                <div className="flex items-center text-sm">
                  <LucideReact.Calendar className="text-gray-400" size={16} />
                  <span className="ml-1">{formatDate(alert.resolved_at)}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
