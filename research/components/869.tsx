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
  const formatDateTime = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

  const state = value.state ?? "open";
  const stateBadge =
    state === "resolved" ? (
      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
        Resolved
      </span>
    ) : (
      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-800">
        Open
      </span>
    );

  const resolution =
    value.resolution && value.resolution !== null
      ? value.resolution
          .split("_")
          .map(capitalize)
          .join(" ")
      : null;

  const secretTypeName = value.secret_type_display_name || value.secret_type || "Unknown";

  const validity = value.validity ?? "unknown";
  const validityBadge = {
    active: (
      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
        Valid
      </span>
    ),
    inactive: (
      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
        Inactive
      </span>
    ),
    unknown: (
      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
        Unknown
      </span>
    ),
  }[validity];

  const booleanBadge = (flag: boolean | null | undefined, trueText: string, falseText: string) =>
    flag ? (
      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
        {trueText}
      </span>
    ) : (
      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
        {falseText}
      </span>
    );

  const createdAt = formatDateTime(value.created_at);
  const updatedAt = value.updated_at ? formatDateTime(value.updated_at) : null;
  const resolvedAt = value.resolved_at ? formatDateTime(value.resolved_at) : null;

  const resolvedBy = value.resolved_by?.login ?? null;

  const resolutionComment =
    value.resolution_comment && value.resolution_comment.length > 0
      ? value.resolution_comment.length > 100
        ? value.resolution_comment.slice(0, 100) + "..."
        : value.resolution_comment
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">
          Alert #{value.number ?? "N/A"}
        </h2>
        {stateBadge}
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-2">
        {validityBadge}
        {booleanBadge(value.publicly_leaked, "Publicly Leaked", "Not Leaked")}
        {booleanBadge(value.multi_repo, "Multi-Repo", "Single-Repo")}
        {booleanBadge(value.push_protection_bypassed, "Bypassed", "Protected")}
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Secret Type</span>
          <span>{secretTypeName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Detected At</span>
          <span>{createdAt}</span>
        </div>
        {updatedAt && (
          <div className="flex justify-between">
            <span className="font-medium">Updated</span>
            <span>{updatedAt}</span>
          </div>
        )}
        {state === "resolved" && resolvedAt && (
          <div className="flex justify-between">
            <span className="font-medium">Resolved At</span>
            <span>{resolvedAt}</span>
          </div>
        )}
        {resolution && (
          <div className="flex justify-between">
            <span className="font-medium">Resolution</span>
            <span>{resolution}</span>
          </div>
        )}
        {resolvedBy && (
          <div className="flex justify-between">
            <span className="font-medium">Resolved By</span>
            <span>{resolvedBy}</span>
          </div>
        )}
        {resolutionComment && (
          <div>
            <span className="font-medium">Comment</span>
            <p className="mt-1 text-gray-600">{resolutionComment}</p>
          </div>
        )}
      </div>
    </div>
  );
}
