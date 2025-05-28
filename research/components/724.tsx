import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A request for a specific ref(branch,sha,tag) to be deployed
     *
     * @title Deployment
    */
    export interface deployment {
        url: string & tags.Format<"uri">;
        /**
         * Unique identifier of the deployment
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        sha: string;
        /**
         * The ref to deploy. This can be a branch, tag, or sha.
        */
        ref: string;
        /**
         * Parameter to specify a task to execute
        */
        task: string;
        payload: {} | string;
        original_environment?: string;
        /**
         * Name for the target deployment environment.
        */
        environment: string;
        description: string | null;
        creator: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        statuses_url: string & tags.Format<"uri">;
        repository_url: string & tags.Format<"uri">;
        /**
         * Specifies if the given environment is will no longer exist at some point in the future. Default: false.
        */
        transient_environment?: boolean;
        /**
         * Specifies if the given environment is one that end-users directly interact with. Default: false.
        */
        production_environment?: boolean;
        performed_via_github_app?: AutoViewInputSubTypes.nullable_integration;
    }
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
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type nullable_integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
    /**
     * An enterprise on GitHub.
     *
     * @title Enterprise
    */
    export interface enterprise {
        /**
         * A short description of the enterprise.
        */
        description?: string | null;
        html_url: string & tags.Format<"uri">;
        /**
         * The enterprise's website URL.
        */
        website_url?: (string & tags.Format<"uri">) | null;
        /**
         * Unique identifier of the enterprise
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the enterprise.
        */
        name: string;
        /**
         * The slug url identifier for the enterprise.
        */
        slug: string;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        avatar_url: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.deployment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants and helper functions
  const totalDeployments = value.length;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  const shortSha = (sha: string) => sha.slice(0, 7);

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="text-sm text-gray-500">
        Total Deployments: {totalDeployments}
      </div>
      {/* Deployment List */}
      <div className="space-y-4">
        {value.map((deployment) => {
          const creator = deployment.creator;
          const creatorName = creator?.login || 'Unknown';
          const avatarSrc =
            creator?.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              creatorName
            )}&background=random`;
          return (
            <div
              key={deployment.id}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {deployment.production_environment ? (
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={20}
                    />
                  ) : deployment.transient_environment ? (
                    <LucideReact.Clock
                      className="text-amber-500"
                      size={20}
                    />
                  ) : (
                    <LucideReact.Tag
                      className="text-gray-500"
                      size={20}
                    />
                  )}
                  <span className="text-lg font-semibold text-gray-800">
                    {deployment.environment}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  #{deployment.id}
                </span>
              </div>

              {/* Core Details */}
              <div className="mt-2 text-sm text-gray-700 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <LucideReact.GitBranch
                    className="text-gray-400"
                    size={16}
                  />
                  <span className="ml-1">Ref: {deployment.ref}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Code
                    className="text-gray-400"
                    size={16}
                  />
                  <span className="ml-1">
                    SHA: {shortSha(deployment.sha)}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Terminal
                    className="text-gray-400"
                    size={16}
                  />
                  <span className="ml-1">Task: {deployment.task}</span>
                </div>
              </div>

              {/* Description */}
              {deployment.description && (
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                  {deployment.description}
                </p>
              )}

              {/* Footer: Creator & Dates */}
              <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2 mb-2 md:mb-0">
                  <img
                    src={avatarSrc}
                    alt={creatorName}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      (
                        e.target as HTMLImageElement
                      ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        creatorName
                      )}&background=random`;
                    }}
                  />
                  <span>{creatorName}</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <LucideReact.Calendar
                      className="text-gray-400"
                      size={16}
                    />
                    <span className="ml-1">
                      Created: {formatDate(deployment.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Calendar
                      className="text-gray-400"
                      size={16}
                    />
                    <span className="ml-1">
                      Updated: {formatDate(deployment.updated_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performed via GitHub App */}
              {deployment.performed_via_github_app?.name && (
                <div className="mt-3 flex items-center space-x-2 text-sm text-gray-500">
                  <LucideReact.AppWindow
                    className="text-gray-400"
                    size={16}
                  />
                  <span>
                    Performed via: {deployment.performed_via_github_app.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
