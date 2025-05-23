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
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_alert;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : null;
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : null;
  const resolvedAt = value.resolved_at
    ? new Date(value.resolved_at).toLocaleString()
    : null;

  // Resolution mapping
  type ResolutionKey = Exclude<
    AutoViewInputSubTypes.secret_scanning_alert["resolution"],
    null | undefined
  >;
  const resolutionMap: Record<ResolutionKey, string> = {
    false_positive: "False Positive",
    wont_fix: "Won't Fix",
    revoked: "Revoked",
    used_in_tests: "Used in Tests",
  };
  const resolutionText =
    value.resolution != null
      ? resolutionMap[value.resolution as ResolutionKey]
      : undefined;

  // Validity mapping
  type ValidityKey = Exclude<
    AutoViewInputSubTypes.secret_scanning_alert["validity"],
    undefined
  >;
  const validityMap: Record<
    ValidityKey,
    { label: string; icon: JSX.Element }
  > = {
    active: {
      label: "Active",
      icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
    },
    inactive: {
      label: "Inactive",
      icon: <LucideReact.XCircle className="text-amber-500" size={16} />,
    },
    unknown: {
      label: "Unknown",
      icon: <LucideReact.HelpCircle className="text-gray-500" size={16} />,
    },
  };
  const validityKey = value.validity as ValidityKey | undefined;

  // State icon and label
  const isOpen = value.state === "open";
  const stateIcon = isOpen ? (
    <LucideReact.AlertTriangle className="text-yellow-500" size={16} />
  ) : (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  );
  const stateLabel = isOpen ? "Open" : "Resolved";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md divide-y divide-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          {stateIcon}
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            Alert #{value.number}
            {value.secret_type_display_name
              ? `: ${value.secret_type_display_name}`
              : ""}
          </h2>
        </div>
        <span
          className={`px-2 py-0.5 text-xs font-medium ${
            isOpen
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          } rounded-full`}
        >
          {stateLabel}
        </span>
      </div>

      {/* Details Grid */}
      <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
        {createdAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Created: {createdAt}</span>
          </div>
        )}
        {updatedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.RefreshCw size={16} />
            <span>Updated: {updatedAt}</span>
          </div>
        )}
        {!isOpen && resolvedAt && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} />
            <span>Resolved: {resolvedAt}</span>
          </div>
        )}
        {value.resolved_by?.login && (
          <div className="flex items-center gap-1">
            <LucideReact.UserCheck size={16} />
            <span>By: {value.resolved_by.login}</span>
          </div>
        )}
        {resolutionText && (
          <div className="flex items-center gap-1">
            <LucideReact.Edit3 size={16} />
            <span>Resolution: {resolutionText}</span>
          </div>
        )}
        {value.resolution_comment && (
          <div className="col-span-full">
            <p className="text-gray-600 line-clamp-2">
              <strong>Comment:</strong> {value.resolution_comment}
            </p>
          </div>
        )}
      </div>

      {/* Status & Flags */}
      <div className="pt-4 flex flex-wrap items-center gap-4 text-sm">
        {validityKey && (
          <div className="flex items-center gap-1 text-gray-700">
            {validityMap[validityKey].icon}
            <span>{validityMap[validityKey].label}</span>
          </div>
        )}
        {value.publicly_leaked && (
          <div className="flex items-center gap-1 text-red-500">
            <LucideReact.AlertCircle size={16} />
            <span>Leaked</span>
          </div>
        )}
        {value.multi_repo && (
          <div className="flex items-center gap-1 text-blue-500">
            <LucideReact.Users size={16} />
            <span>Multi-Repo</span>
          </div>
        )}
        {value.is_base64_encoded && (
          <div className="flex items-center gap-1 text-indigo-500">
            <LucideReact.Tag size={16} />
            <span>Base64</span>
          </div>
        )}
        {value.push_protection_bypassed && (
          <div className="flex items-center gap-1 text-amber-500">
            <LucideReact.ShieldOff size={16} />
            <span>Bypassed</span>
          </div>
        )}
      </div>
    </div>
  );
}
