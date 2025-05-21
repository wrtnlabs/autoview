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
  const formattedCreatedAt = new Date(value.created_at).toLocaleString();
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString();
  const formattedExpiresAt = value.expires_at
    ? new Date(value.expires_at).toLocaleString()
    : null;

  const tokenDisplay = value.token_last_eight
    ? `••••••••${value.token_last_eight}`
    : "••••••••";

  const scopesList = Array.isArray(value.scopes) && value.scopes.length > 0
    ? value.scopes
    : [];

  const fingerprint = value.fingerprint;

  const user = value.user;
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      {/* App Information */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.app.name}
        </h2>
        <p
          className="text-sm text-blue-600 truncate"
          title={value.app.url}
        >
          {value.app.url}
        </p>
      </div>

      {/* Token & Dates */}
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Token:</span>{" "}
          <span className="font-mono">{tokenDisplay}</span>
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-600">
          <p>
            <span className="font-medium">Created:</span>{" "}
            {formattedCreatedAt}
          </p>
          <p>
            <span className="font-medium">Updated:</span>{" "}
            {formattedUpdatedAt}
          </p>
          {formattedExpiresAt && (
            <p>
              <span className="font-medium">Expires:</span>{" "}
              {formattedExpiresAt}
            </p>
          )}
        </div>
      </div>

      {/* Scopes */}
      <div>
        <p className="font-medium text-gray-800 mb-1">Scopes</p>
        {scopesList.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {scopesList.map((scope) => (
              <span
                key={scope}
                className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded"
              >
                {scope}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No scopes granted</p>
        )}
      </div>

      {/* Fingerprint */}
      {fingerprint && (
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Fingerprint:</span> {fingerprint}
          </p>
        </div>
      )}

      {/* Associated User */}
      {user && (
        <div className="flex items-center space-x-3 pt-2 border-t border-gray-200">
          <img
            src={user.avatar_url}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {user.login}
            </p>
            {user.name && (
              <p className="text-xs text-gray-500 truncate">{user.name}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
