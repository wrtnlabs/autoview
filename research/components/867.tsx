import { tags } from "typia";
import React from "react";
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
  const alerts = Array.isArray(value) ? value : [];

  function formatDateTime(dateString: string | undefined | null): string {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const resolutionMap: Record<string, string> = {
    false_positive: "False Positive",
    wont_fix: "Won't Fix",
    revoked: "Revoked",
    used_in_tests: "Used in Tests",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (alerts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No secret scanning alerts to display.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        const title =
          alert.secret_type_display_name || alert.secret_type || "Unknown Secret";
        const stateBadgeColor =
          alert.state === "resolved"
            ? "bg-gray-100 text-gray-800"
            : "bg-green-100 text-green-800";
        const stateLabel = alert.state
          ? alert.state.charAt(0).toUpperCase() + alert.state.slice(1)
          : "Unknown";
        return (
          <div
            key={alert.number ?? Math.random()}
            className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:justify-between"
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                #{alert.number} — {title}
              </h2>
              <div className="mt-1 text-sm text-gray-500 space-y-1">
                <p>
                  Created:{" "}
                  <time dateTime={alert.created_at || ""}>
                    {formatDateTime(alert.created_at)}
                  </time>
                </p>
                {alert.state === "resolved" && alert.resolved_at && (
                  <p>
                    Resolved:{" "}
                    <time dateTime={alert.resolved_at}>
                      {formatDateTime(alert.resolved_at)}
                    </time>{" "}
                    {alert.resolved_by?.login
                      ? `by ${alert.resolved_by.login}`
                      : ""}
                  </p>
                )}
                {alert.resolution_comment && (
                  <p className="italic text-gray-600 line-clamp-2">
                    “{alert.resolution_comment}”
                  </p>
                )}
                <p>
                  Validity:{" "}
                  {alert.validity
                    ? alert.validity.charAt(0).toUpperCase() +
                      alert.validity.slice(1)
                    : "Unknown"}
                </p>
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${stateBadgeColor}`}
              >
                {stateLabel}
              </span>
              {alert.state === "resolved" && alert.resolution && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {resolutionMap[alert.resolution] || alert.resolution}
                </span>
              )}
              {alert.push_protection_bypassed && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                  Push Bypassed
                </span>
              )}
              {alert.publicly_leaked && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                  Publicly Leaked
                </span>
              )}
              {alert.multi_repo && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                  Multi-Repo
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
