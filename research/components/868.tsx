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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived and formatted values
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : 'N/A';
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : undefined;
  const resolvedAt = value.resolved_at
    ? new Date(value.resolved_at).toLocaleString()
    : undefined;
  const typeName = value.secret_type_display_name || value.secret_type || '—';
  const maskedSecret =
    value.secret && value.secret.length > 0
      ? value.secret.length > 8
        ? `${value.secret.slice(0, 4)}…${value.secret.slice(-4)}`
        : value.secret
      : null;

  // State badge
  const stateLabel =
    value.state === 'resolved'
      ? 'Resolved'
      : value.state === 'open'
      ? 'Open'
      : 'Unknown';
  const stateIcon =
    value.state === 'resolved' ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} aria-label="Resolved" />
    ) : value.state === 'open' ? (
      <LucideReact.AlertCircle className="text-amber-500" size={16} aria-label="Open" />
    ) : (
      <LucideReact.HelpCircle className="text-gray-400" size={16} aria-label="Unknown state" />
    );

  // Validity icon
  const validityIcon =
    value.validity === 'active' ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} aria-label="Active" />
    ) : value.validity === 'inactive' ? (
      <LucideReact.XCircle className="text-red-500" size={16} aria-label="Inactive" />
    ) : (
      <LucideReact.HelpCircle className="text-amber-500" size={16} aria-label="Unknown validity" />
    );

  // Flags
  const publicIcon = value.publicly_leaked ? (
    <LucideReact.AlertTriangle className="text-red-500" size={16} aria-label="Publicly Leaked" />
  ) : (
    <LucideReact.ShieldOff className="text-gray-400" size={16} aria-label="Not Publicly Leaked" />
  );
  const multiRepoIcon = value.multi_repo ? (
    <LucideReact.Users className="text-blue-500" size={16} aria-label="Multiple Repos" />
  ) : (
    <LucideReact.UserMinus className="text-gray-400" size={16} aria-label="Single Repo" />
  );
  const base64Icon = value.is_base64_encoded ? (
    <LucideReact.FileText className="text-indigo-500" size={16} aria-label="Base64 Encoded" />
  ) : null;

  // Push protection bypass
  const bypassed = Boolean(value.push_protection_bypassed);
  const bypassIcon = bypassed ? (
    <LucideReact.ShieldCheck className="text-green-500" size={16} aria-label="Bypassed" />
  ) : (
    <LucideReact.ShieldOff className="text-gray-400" size={16} aria-label="Not Bypassed" />
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Alert #{value.number ?? '—'}
        </h2>
        <div className="flex items-center gap-1">
          {stateIcon}
          <span className="text-sm font-medium">{stateLabel}</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Created</span>
          <div className="flex items-center gap-1">
            <LucideReact.Calendar className="text-gray-400" size={16} aria-label="Created date" />
            <span>{createdAt}</span>
          </div>
        </div>

        {updatedAt && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Updated</span>
            <div className="flex items-center gap-1">
              <LucideReact.Calendar className="text-gray-400" size={16} aria-label="Updated date" />
              <span>{updatedAt}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Type</span>
          <span className="font-medium">{typeName}</span>
        </div>

        {maskedSecret && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Secret</span>
            <code className="bg-gray-100 px-1 rounded text-xs">
              {maskedSecret}
            </code>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Validity</span>
          {validityIcon}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Public Leak</span>
          {publicIcon}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Multi-Repo</span>
          {multiRepoIcon}
        </div>

        {base64Icon && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Base64</span>
            {base64Icon}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Bypass</span>
          {bypassIcon}
        </div>

        {bypassed && value.push_protection_bypassed_at && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Bypass At</span>
            <span>
              {new Date(value.push_protection_bypassed_at).toLocaleString()}
            </span>
          </div>
        )}

        {bypassed && value.push_protection_bypassed_by && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Bypassed By</span>
            <span className="font-medium">
              {value.push_protection_bypassed_by.login}
            </span>
          </div>
        )}

        {value.state === 'resolved' && resolvedAt && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Resolved At</span>
            <span>{resolvedAt}</span>
          </div>
        )}

        {value.resolved_by && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Resolved By</span>
            <span className="font-medium">{value.resolved_by.login}</span>
          </div>
        )}

        {value.resolution && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Resolution</span>
            <span className="capitalize">
              {value.resolution.replace('_', ' ')}
            </span>
          </div>
        )}

        {value.resolution_comment && (
          <div>
            <span className="text-gray-600 block">Comment</span>
            <p className="text-gray-700 text-sm line-clamp-2">
              {value.resolution_comment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
