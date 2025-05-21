import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposCodespaces_New {
        export type GetResponse = {
            billable_owner?: AutoViewInputSubTypes.simple_user;
            defaults?: {
                location: string;
                devcontainer_path: string | null;
            };
        };
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCodespaces_New.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const owner = value.billable_owner;
  const defaults = value.defaults;
  const ownerDisplayName = owner
    ? owner.name && owner.name.trim().length > 0
      ? owner.name
      : owner.login
    : "";
  const devcontainerPathDisplay =
    defaults && defaults.devcontainer_path
      ? defaults.devcontainer_path
      : "Not specified";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Codespaces Settings</h2>

      {owner && (
        <section className="flex items-center space-x-4">
          <img
            src={owner.avatar_url}
            alt={`${ownerDisplayName} avatar`}
            className="w-12 h-12 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {ownerDisplayName}
            </p>
            <p className="text-sm text-gray-500 truncate">{owner.login}</p>
            {owner.email && (
              <p className="text-sm text-gray-500 truncate">{owner.email}</p>
            )}
          </div>
          <span
            className={`ml-auto text-sm font-semibold ${
              owner.site_admin
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {owner.site_admin ? "Admin" : owner.type}
          </span>
        </section>
      )}

      {defaults && (
        <section>
          <h3 className="text-md font-medium text-gray-700 mb-2">
            Default Configuration
          </h3>
          <dl className="grid grid-cols-1 gap-y-2">
            <div className="flex flex-col">
              <dt className="text-sm text-gray-500">Location</dt>
              <dd className="text-sm text-gray-900 truncate">
                {defaults.location}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm text-gray-500">Devcontainer Path</dt>
              <dd className="text-sm text-gray-900 truncate">
                {devcontainerPathDisplay}
              </dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  );
}
