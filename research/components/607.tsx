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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return isNaN(date.getTime())
      ? iso
      : date.toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {value.length === 0 ? (
        <div className="flex items-center justify-center p-6 text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No deployments available</span>
        </div>
      ) : (
        value.map((deploy) => {
          const shortSha = deploy.sha.slice(0, 7);
          const createdAt = formatDate(deploy.created_at);
          const isProd = deploy.production_environment === true;
          const isTransient = deploy.transient_environment === true;

          return (
            <div
              key={deploy.id}
              className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Header: Environment and Flags */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LucideReact.Tag size={16} className="text-gray-500" />
                  <span className="font-semibold text-gray-800 truncate">
                    {deploy.environment}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {isProd && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      <LucideReact.CheckCircle
                        size={12}
                        className="mr-1"
                      />
                      Prod
                    </span>
                  )}
                  {!isProd && isTransient && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                      <LucideReact.Clock size={12} className="mr-1" />
                      Transient
                    </span>
                  )}
                </div>
              </div>

              {/* Body: Ref, SHA, Date, Description */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 space-x-2">
                    <LucideReact.GitBranch size={16} />
                    <span className="truncate">{deploy.ref}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-2">
                    <LucideReact.GitCommit size={16} />
                    <code className="font-mono text-gray-700">{shortSha}</code>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-2">
                    <LucideReact.Calendar size={16} />
                    <time dateTime={deploy.created_at}>{createdAt}</time>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-700 line-clamp-2">
                  {deploy.description ?? "No description provided."}
                </p>
              </div>

              {/* Footer: Creator and Integration */}
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {deploy.creator ? (
                    <>
                      <img
                        src={deploy.creator.avatar_url}
                        alt={deploy.creator.login}
                        className="w-6 h-6 rounded-full object-cover"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            deploy.creator?.login || "User"
                          )}&background=random`;
                        }}
                      />
                      <span className="text-sm text-gray-800 truncate">
                        {deploy.creator.login}
                      </span>
                    </>
                  ) : (
                    <div className="flex items-center text-sm text-gray-500">
                      <LucideReact.User size={16} className="mr-1" />
                      <span>Unknown</span>
                    </div>
                  )}
                </div>
                {deploy.performed_via_github_app && (
                  <div className="flex items-center text-sm text-gray-600 space-x-1">
                    <LucideReact.Box size={16} />
                    <span className="truncate">
                      {deploy.performed_via_github_app.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
