import LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_alert;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "N/A";

  const resolvedAt = value.resolved_at
    ? new Date(value.resolved_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const stateIcon =
    value.state === "resolved" ? (
      <LucideReact.CheckCircle
        className="text-green-500"
        size={16}
        aria-label="Resolved"
      />
    ) : (
      <LucideReact.Clock
        className="text-amber-500"
        size={16}
        aria-label="Open"
      />
    );
  const stateLabel = value.state === "resolved" ? "Resolved" : "Open";

  const secretType =
    value.secret_type_display_name || value.secret_type || "Unknown";
  const secretRaw = value.secret ?? "";
  const maskedSecret =
    secretRaw.length > 8
      ? `${secretRaw.slice(0, 4)}…${secretRaw.slice(-4)}`
      : secretRaw;

  const resolutionMap: Record<string, string> = {
    false_positive: "False Positive",
    wont_fix: "Won't Fix",
    revoked: "Revoked",
    used_in_tests: "Used in Tests",
  };
  const resolutionLabel =
    value.resolution != null
      ? resolutionMap[value.resolution] || value.resolution
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-sm space-y-3">
      {/* Header: Alert number, created date, state */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-medium">#{value.number}</span>
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span>{createdAt}</span>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          {stateIcon}
          <span className="text-gray-700">{stateLabel}</span>
        </div>
      </div>

      {/* Secret type */}
      <div className="flex items-center space-x-1 text-sm text-gray-700">
        <LucideReact.Tag className="text-blue-500" size={16} />
        <span>{secretType}</span>
      </div>

      {/* Masked secret */}
      {secretRaw && (
        <div className="flex items-center space-x-1 text-sm text-gray-700">
          <LucideReact.Lock className="text-gray-500" size={16} />
          <span className="font-mono">{maskedSecret}</span>
          {value.is_base64_encoded && (
            <LucideReact.Code
              className="text-gray-400"
              size={16}
              aria-label="Base64 encoded"
            />
          )}
        </div>
      )}

      {/* Status badges: validity, leaked, multi-repo */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {value.validity && (
          <div className="flex items-center space-x-1">
            {value.validity === "active" ? (
              <LucideReact.ShieldCheck
                className="text-green-500"
                size={16}
                aria-label="Valid"
              />
            ) : value.validity === "inactive" ? (
              <LucideReact.ShieldOff
                className="text-red-500"
                size={16}
                aria-label="Invalid"
              />
            ) : (
              <LucideReact.HelpCircle
                className="text-gray-400"
                size={16}
                aria-label="Unknown"
              />
            )}
            <span className="capitalize text-gray-700">{value.validity}</span>
          </div>
        )}
        {value.publicly_leaked && (
          <div className="flex items-center space-x-1">
            <LucideReact.AlertTriangle
              className="text-red-500"
              size={16}
              aria-label="Leaked"
            />
            <span className="text-red-600">Leaked</span>
          </div>
        )}
        {value.multi_repo && (
          <div className="flex items-center space-x-1">
            <LucideReact.Users
              className="text-blue-500"
              size={16}
              aria-label="Multi-repo"
            />
            <span className="text-gray-700">Multi-repo</span>
          </div>
        )}
      </div>

      {/* Resolution details */}
      {value.state === "resolved" && (
        <div className="border-t pt-3 text-sm text-gray-600 space-y-2">
          {resolutionLabel && (
            <div className="flex items-center space-x-1">
              <LucideReact.CheckCircle
                className="text-green-500"
                size={16}
                aria-label="Resolution"
              />
              <span>{resolutionLabel}</span>
            </div>
          )}
          {resolvedAt && (
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar
                className="text-gray-400"
                size={16}
                aria-label="Resolved at"
              />
              <span>{resolvedAt}</span>
            </div>
          )}
          {value.resolved_by && (
            <div className="flex items-center space-x-2">
              <img
                src={value.resolved_by.avatar_url}
                alt={value.resolved_by.login}
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  const name =
                    value.resolved_by?.name || value.resolved_by?.login;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name || "User",
                  )}&background=0D8ABC&color=fff`;
                }}
              />
              <span className="text-gray-700">{value.resolved_by.login}</span>
            </div>
          )}
          {value.resolution_comment && (
            <div className="pl-6 italic text-gray-500">
              “{value.resolution_comment.trim()}”
            </div>
          )}
        </div>
      )}
    </div>
  );
}
