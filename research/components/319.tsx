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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const expiresDate = value.expires_at
    ? new Date(value.expires_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const user = value.user;
  const installation = value.installation;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{value.app.name}</h2>
          <p className="text-sm text-gray-600">Client ID: {value.app.client_id}</p>
        </div>
      </div>

      {user && (
        <div className="mt-4 flex items-center">
          {user.avatar_url && (
            <img
              src={user.avatar_url}
              alt={user.login}
              className="h-8 w-8 rounded-full mr-2 object-cover"
            />
          )}
          <div className="text-sm text-gray-700">
            {user.name ? `${user.name} (${user.login})` : user.login}
          </div>
        </div>
      )}

      {value.note && (
        <p className="mt-4 text-gray-700 text-sm line-clamp-2">{value.note}</p>
      )}
      {value.note_url && (
        <p className="mt-1 text-blue-600 text-xs break-words">{value.note_url}</p>
      )}

      {value.scopes && value.scopes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.scopes.map((scope, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
            >
              {scope}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
        <div>
          <span className="font-medium text-gray-700">Created:</span> {createdDate}
        </div>
        <div>
          <span className="font-medium text-gray-700">Last Used:</span> {updatedDate}
        </div>
        {expiresDate && (
          <div>
            <span className="font-medium text-gray-700">Expires:</span> {expiresDate}
          </div>
        )}
        {value.fingerprint && (
          <div>
            <span className="font-medium text-gray-700">Fingerprint:</span>{" "}
            <span className="font-mono">{value.fingerprint}</span>
          </div>
        )}
      </div>

      {installation && (
        <div className="mt-4 text-sm text-gray-700">
          <span className="font-medium">Repositories:</span>{" "}
          {installation.repository_selection === "all"
            ? "All Repositories"
            : installation.single_file_paths
            ? `${installation.single_file_paths.length} Selected`
            : "Selected Repositories"}
        </div>
      )}
    </div>
  );
}
