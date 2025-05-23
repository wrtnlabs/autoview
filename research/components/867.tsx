import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface secret_scanning_alert {
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
        push_protection_bypass_request_html_url?: (string & tags.Format<"uri">) | null;
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
    export type nullable_alert_updated_at = (string & tags.Format<"date-time">) | null;
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
    export type secret_scanning_alert_resolution = "false_positive" | "wont_fix" | "revoked" | "used_in_tests" | null;
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
  const totalAlerts = value.length;
  const openCount = value.filter((a) => a.state === "open").length;
  const resolvedCount = value.filter((a) => a.state === "resolved").length;

  const formatDate = (dateStr?: string | null): string =>
    dateStr ? new Date(dateStr).toLocaleString() : "-";

  const maskSecret = (s: string): string =>
    s.length > 4 ? "****" + s.slice(-4) : s;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {/* Summary Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Secret Scanning Alerts
        </h2>
        <div className="mt-2 sm:mt-0 flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <LucideReact.AlertTriangle
              className="text-amber-500 mr-1"
              size={16}
            />
            Open: {openCount}
          </div>
          <div className="flex items-center">
            <LucideReact.CheckCircle
              className="text-green-500 mr-1"
              size={16}
            />
            Resolved: {resolvedCount}
          </div>
          <div className="flex items-center">
            <LucideReact.List className="text-gray-500 mr-1" size={16} />
            Total: {totalAlerts}
          </div>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {value.map((alert, idx) => (
          <div
            key={alert.number ?? idx}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col space-y-2"
          >
            {/* Header: Number & State */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                #{alert.number ?? "—"}
              </span>
              {alert.state === "open" ? (
                <LucideReact.AlertTriangle
                  className="text-amber-500"
                  size={20}
                />
              ) : (
                <LucideReact.CheckCircle
                  className="text-green-500"
                  size={20}
                />
              )}
            </div>

            {/* Secret Type */}
            <div className="flex items-center text-sm text-gray-600">
              <LucideReact.Tag className="mr-1 text-blue-500" size={16} />
              {alert.secret_type_display_name ?? alert.secret_type ?? "Unknown"}
            </div>

            {/* Created & Resolved Dates */}
            <div className="flex items-center text-sm text-gray-500">
              <LucideReact.Calendar className="mr-1" size={16} />
              Created: {formatDate(alert.created_at)}
            </div>
            {alert.resolved_at && (
              <div className="flex items-center text-sm text-gray-500">
                <LucideReact.Calendar className="mr-1" size={16} />
                Resolved: {formatDate(alert.resolved_at)}
              </div>
            )}

            {/* Resolution Tag */}
            {alert.state === "resolved" && alert.resolution && (
              <div className="inline-block px-2 py-0.5 bg-gray-100 text-xs font-medium text-gray-800 rounded">
                {alert.resolution.replaceAll("_", " ")}
              </div>
            )}

            {/* Masked Secret */}
            {alert.secret && (
              <div className="flex items-center text-sm text-gray-600 break-all">
                <LucideReact.Key className="mr-1 text-gray-400" size={16} />
                {maskSecret(alert.secret)}
              </div>
            )}

            {/* Flags */}
            <div className="flex flex-wrap gap-2 pt-2 text-sm">
              {alert.publicly_leaked && (
                <div className="flex items-center text-red-500">
                  <LucideReact.Eye className="mr-1" size={16} />
                  Leaked
                </div>
              )}
              {alert.multi_repo && (
                <div className="flex items-center text-gray-500">
                  <LucideReact.Users className="mr-1" size={16} />
                  Multi-repo
                </div>
              )}
              {alert.push_protection_bypassed && (
                <div className="flex items-center text-orange-500">
                  <LucideReact.ShieldOff className="mr-1" size={16} />
                  Bypassed
                </div>
              )}
              {alert.is_base64_encoded && (
                <div className="flex items-center text-indigo-500">
                  <LucideReact.Code className="mr-1" size={16} />
                  Base64
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
