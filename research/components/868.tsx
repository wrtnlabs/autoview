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
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_alert;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr?: string | null): string => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const stateLabel = value.state === "resolved" ? "Resolved" : "Open";

  const resolutionMap: Record<string, string> = {
    false_positive: "False Positive",
    wont_fix: "Won't Fix",
    revoked: "Revoked",
    used_in_tests: "Used in Tests",
  };
  const resolutionLabel = value.resolution ? resolutionMap[value.resolution] || value.resolution : null;

  const validityLabel = value.validity
    ? value.validity.charAt(0).toUpperCase() + value.validity.slice(1)
    : "-";

  const yesNo = (flag?: boolean | null): string => (flag ? "Yes" : "No");

  const displayUser = (user?: AutoViewInputSubTypes.nullable_simple_user): string =>
    user ? user.login : "-";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 truncate">
        Secret Scanning Alert #{value.number}
      </h2>
      <dl className="grid grid-cols-1 gap-y-2">
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Created</dt>
          <dd className="text-sm text-gray-900">{formatDate(value.created_at)}</dd>
        </div>
        {value.updated_at && (
          <div className="flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Updated</dt>
            <dd className="text-sm text-gray-900">{formatDate(value.updated_at)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Status</dt>
          <dd className="text-sm font-semibold text-gray-800">{stateLabel}</dd>
        </div>
        {resolutionLabel && (
          <div className="flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Resolution</dt>
            <dd className="text-sm text-gray-800">{resolutionLabel}</dd>
          </div>
        )}
        {value.resolved_at && (
          <div className="flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Resolved At</dt>
            <dd className="text-sm text-gray-900">{formatDate(value.resolved_at)}</dd>
          </div>
        )}
        {value.resolved_by && (
          <div className="flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Resolved By</dt>
            <dd className="text-sm text-gray-900">{displayUser(value.resolved_by)}</dd>
          </div>
        )}
        {value.secret_type_display_name && (
          <div className="flex justify-between">
            <dt className="text-sm font-medium text-gray-500">Secret Type</dt>
            <dd className="text-sm text-gray-900">{value.secret_type_display_name}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Validity</dt>
          <dd className="text-sm text-gray-900">{validityLabel}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Publicly Leaked</dt>
          <dd className="text-sm text-gray-900">{yesNo(value.publicly_leaked)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Multiple Repos</dt>
          <dd className="text-sm text-gray-900">{yesNo(value.multi_repo)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Base64 Encoded</dt>
          <dd className="text-sm text-gray-900">{yesNo(value.is_base64_encoded)}</dd>
        </div>
        {value.push_protection_bypassed && (
          <>
            <div className="flex justify-between pt-2">
              <dt className="text-sm font-medium text-gray-500">Bypassed</dt>
              <dd className="text-sm font-semibold text-red-600">Yes</dd>
            </div>
            {value.push_protection_bypassed_at && (
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Bypassed At</dt>
                <dd className="text-sm text-gray-900">
                  {formatDate(value.push_protection_bypassed_at)}
                </dd>
              </div>
            )}
            {value.push_protection_bypassed_by && (
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Bypassed By</dt>
                <dd className="text-sm text-gray-900">
                  {displayUser(value.push_protection_bypassed_by)}
                </dd>
              </div>
            )}
          </>
        )}
      </dl>
      {/* Comments Section */}
      {(value.resolution_comment ||
        value.push_protection_bypass_request_comment ||
        value.push_protection_bypass_request_reviewer_comment) && (
        <div className="bg-gray-50 p-3 rounded">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Comments</h3>
          {value.resolution_comment && (
            <p className="text-sm text-gray-800 line-clamp-3 mb-1">
              {value.resolution_comment}
            </p>
          )}
          {value.push_protection_bypass_request_comment && (
            <p className="text-sm text-gray-800 line-clamp-3 mb-1">
              {value.push_protection_bypass_request_comment}
            </p>
          )}
          {value.push_protection_bypass_request_reviewer_comment && (
            <p className="text-sm text-gray-800 line-clamp-3">
              {value.push_protection_bypass_request_reviewer_comment}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
