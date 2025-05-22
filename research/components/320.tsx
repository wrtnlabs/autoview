import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The authorization for an OAuth app, GitHub App, or a Personal Access Token.
     *
     * @title Authorization
    */
    export type authorization = {
        id: number & tags.Type<"int32">;
        url: string & tags.Format<"uri">;
        /**
         * A list of scopes that this authorization is in.
        */
        scopes: string[] | null;
        token: string;
        token_last_eight: string | null;
        hashed_token: string | null;
        app: {
            client_id: string;
            name: string;
            url: string & tags.Format<"uri">;
        };
        note: string | null;
        note_url: (string & tags.Format<"uri">) | null;
        updated_at: string & tags.Format<"date-time">;
        created_at: string & tags.Format<"date-time">;
        fingerprint: string | null;
        user?: AutoViewInputSubTypes.nullable_simple_user;
        installation?: AutoViewInputSubTypes.nullable_scoped_installation;
        expires_at: (string & tags.Format<"date-time">) | null;
    };
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
     * @title Scoped Installation
    */
    export type nullable_scoped_installation = {
        permissions: any;
        /**
         * Describe whether all repositories have been selected or there's a selection involved
        */
        repository_selection: "all" | "selected";
        single_file_name: string | null;
        has_multiple_single_files?: boolean;
        single_file_paths?: string[];
        repositories_url: string & tags.Format<"uri">;
        account: any;
    } | null;
    export type app_permissions = any;
    export type simple_user = any;
}
export type AutoViewInput = AutoViewInputSubTypes.authorization;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const expiresAt = value.expires_at
    ? new Date(value.expires_at).toLocaleString()
    : "Never";
  const isExpired =
    value.expires_at !== null && new Date(value.expires_at) < new Date();
  const status = isExpired ? "Expired" : "Active";
  const statusColor = isExpired
    ? "bg-red-100 text-red-800"
    : "bg-green-100 text-green-800";
  const maskedToken = value.token_last_eight
    ? `••••••••${value.token_last_eight}`
    : "••••••••";
  const scopes = Array.isArray(value.scopes) ? value.scopes : [];
  const appName = value.app?.name ?? "Unknown App";
  const appUrl = value.app?.url;
  const fingerprint = value.fingerprint;
  const note = value.note;
  const user = value.user;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden mobile-first">
      <div className="p-6 space-y-4">
        {/* Header: App name and status */}
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {appName}
            </h2>
            {appUrl && (
              <p className="text-sm text-blue-600 truncate">{appUrl}</p>
            )}
          </div>
          <span
            className={`px-2 inline-flex text-xs font-medium rounded-full ${statusColor}`}
          >
            {status}
          </span>
        </div>

        {/* Details: Token, dates, fingerprint, note */}
        <div className="text-sm text-gray-800 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Token</span>
            <span className="font-mono">{maskedToken}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Created</span>
            <span>{createdAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Updated</span>
            <span>{updatedAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Expires</span>
            <span>{expiresAt}</span>
          </div>
          {fingerprint && (
            <div className="flex justify-between">
              <span className="text-gray-600">Fingerprint</span>
              <span className="font-mono truncate">{fingerprint}</span>
            </div>
          )}
          {note && (
            <div>
              <span className="text-gray-600">Note</span>
              <p className="mt-1 text-gray-800 line-clamp-2">{note}</p>
            </div>
          )}
        </div>

        {/* Scopes */}
        {scopes.length > 0 && (
          <div>
            <span className="text-gray-600 text-sm">Scopes</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {scopes.map((scope) => (
                <span
                  key={scope}
                  className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
                >
                  {scope}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* User Info */}
        {user && (
          <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.login}
              </p>
              {user.name && (
                <p className="text-xs text-gray-600 truncate">{user.name}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
