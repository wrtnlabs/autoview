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
    ? new Date(value.created_at).toLocaleString()
    : "N/A";
  const resolvedAt = value.resolved_at
    ? new Date(value.resolved_at).toLocaleString()
    : null;
  const statusLabel = value.state === "resolved" ? "Resolved" : "Open";
  const resolutionMap: Record<NonNullable<typeof value.resolution>, string> = {
    false_positive: "False Positive",
    wont_fix: "Won't Fix",
    revoked: "Revoked",
    used_in_tests: "Used in Tests",
  };
  const resolutionLabel =
    value.state === "resolved" && value.resolution
      ? resolutionMap[value.resolution]
      : null;
  const maskedSecret = value.secret
    ? value.secret.length > 8
      ? `${value.secret.slice(0, 4)}...${value.secret.slice(-4)}`
      : value.secret
    : null;
  const validity = value.validity || "unknown";
  const validityIcon =
    validity === "active" ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : validity === "inactive" ? (
      <LucideReact.XCircle className="text-red-500" size={16} />
    ) : (
      <LucideReact.HelpCircle className="text-gray-500" size={16} />
    );
  const validityLabel = validity.charAt(0).toUpperCase() + validity.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <LucideReact.AlertTriangle className="text-red-500" size={20} />
          <span>Alert #{value.number ?? "—"}</span>
        </h2>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            value.state === "resolved"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value.state === "resolved" ? (
            <LucideReact.CheckCircle className="mr-1" size={14} />
          ) : (
            <LucideReact.Clock className="mr-1" size={14} />
          )}
          {statusLabel}
        </span>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div className="flex items-center">
          <dt className="w-24 font-medium text-gray-500">Created</dt>
          <dd className="flex items-center text-gray-900">
            <LucideReact.Calendar className="text-gray-400 mr-1" size={16} />
            {createdAt}
          </dd>
        </div>
        {resolvedAt && (
          <div className="flex items-center">
            <dt className="w-24 font-medium text-gray-500">Resolved</dt>
            <dd className="flex items-center text-gray-900">
              <LucideReact.Calendar className="text-gray-400 mr-1" size={16} />
              {resolvedAt}
            </dd>
          </div>
        )}
        {value.resolved_by && (
          <div className="flex items-center">
            <dt className="w-24 font-medium text-gray-500">By</dt>
            <dd className="text-gray-900">{value.resolved_by.login}</dd>
          </div>
        )}
        {resolutionLabel && (
          <div className="flex items-center">
            <dt className="w-24 font-medium text-gray-500">Resolution</dt>
            <dd className="text-gray-900">{resolutionLabel}</dd>
          </div>
        )}
        {value.resolution_comment && (
          <div className="col-span-full">
            <dt className="font-medium text-gray-500">Comment</dt>
            <dd className="mt-1 text-gray-900 line-clamp-2">
              {value.resolution_comment}
            </dd>
          </div>
        )}
        <div className="flex items-center">
          <dt className="w-24 font-medium text-gray-500">Type</dt>
          <dd className="text-gray-900">
            {value.secret_type_display_name ?? value.secret_type ?? "—"}
          </dd>
        </div>
        {maskedSecret && (
          <div className="flex items-center">
            <dt className="w-24 font-medium text-gray-500">Secret</dt>
            <dd className="text-gray-900 font-mono">{maskedSecret}</dd>
          </div>
        )}
        <div className="flex items-center">
          <dt className="w-24 font-medium text-gray-500">Validity</dt>
          <dd className="flex items-center text-gray-900">
            {validityIcon}
            <span className="ml-1">{validityLabel}</span>
          </dd>
        </div>
        {value.publicly_leaked && (
          <div className="flex items-center">
            <dt className="w-24 font-medium text-gray-500">Leaked</dt>
            <dd className="flex items-center text-red-600">
              <LucideReact.AlertTriangle className="mr-1" size={16} />
              Public
            </dd>
          </div>
        )}
        {value.multi_repo && (
          <div className="flex items-center">
            <dt className="w-24 font-medium text-gray-500">Scope</dt>
            <dd className="flex items-center text-gray-900">
              <LucideReact.Users className="mr-1 text-gray-500" size={16} />
              Multiple Repos
            </dd>
          </div>
        )}
        {value.push_protection_bypassed && (
          <div className="flex items-center">
            <dt className="w-24 font-medium text-gray-500">Push Bypass</dt>
            <dd className="flex items-center text-orange-600">
              <LucideReact.ShieldOff className="mr-1" size={16} />
              Bypassed
            </dd>
          </div>
        )}
        {value.push_protection_bypassed_at && (
          <div className="flex items-center">
            <dt className="w-24 font-medium text-gray-500">Bypass At</dt>
            <dd className="flex items-center text-gray-900">
              <LucideReact.Calendar className="text-gray-400 mr-1" size={16} />
              {new Date(value.push_protection_bypassed_at).toLocaleString()}
            </dd>
          </div>
        )}
        {value.push_protection_bypassed_by && (
          <div className="flex items-center">
            <dt className="w-24 font-medium text-gray-500">Bypass By</dt>
            <dd className="text-gray-900">
              {value.push_protection_bypassed_by.login}
            </dd>
          </div>
        )}
      </dl>
      {(value.url || value.html_url) && (
        <div className="mt-4 text-sm space-y-1">
          {value.url && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Link className="text-gray-400 mr-1" size={16} />
              <span className="truncate">{value.url}</span>
            </div>
          )}
          {value.html_url && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Link className="text-gray-400 mr-1" size={16} />
              <span className="truncate">{value.html_url}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
