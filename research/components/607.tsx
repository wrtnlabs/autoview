import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A request for a specific ref(branch,sha,tag) to be deployed
     *
     * @title Deployment
    */
    export type deployment = {
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
        owner: any | any;
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
    export type simple_user = any;
    export type enterprise = any;
}
export type AutoViewInput = AutoViewInputSubTypes.deployment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };
  const abbreviate = (str: string, length = 7): string =>
    str.length > length ? `${str.slice(0, length)}…` : str;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Render a list of deployment cards with key details.
  return (
    <div className="space-y-4">
      {value.map((dep) => {
        const created = formatDate(dep.created_at);
        const updated = formatDate(dep.updated_at);
        const sha = abbreviate(dep.sha, 7);

        return (
          <div key={dep.id} className="p-4 bg-white rounded-lg shadow-md">
            {/* Header: environment name, task, status badges */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {dep.environment}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Task: {dep.task}
                </p>
              </div>
              <div className="flex space-x-2">
                {dep.production_environment && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Production
                  </span>
                )}
                {dep.transient_environment && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Transient
                  </span>
                )}
              </div>
            </div>

            {/* Deployment details: ref, sha, original environment */}
            <div className="mt-3 text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Ref:</span> {dep.ref}
              </p>
              <p>
                <span className="font-medium">SHA:</span> {sha}
              </p>
              {dep.original_environment && (
                <p>
                  <span className="font-medium">Original Env:</span>{" "}
                  {dep.original_environment}
                </p>
              )}
            </div>

            {/* Optional description, truncated */}
            {dep.description && (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {dep.description}
              </p>
            )}

            {/* Footer: creator info and timestamps */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                {dep.creator?.avatar_url && dep.creator.login && (
                  <img
                    src={dep.creator.avatar_url}
                    alt={dep.creator.login}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                {dep.creator?.login && <span>{dep.creator.login}</span>}
              </div>
              <div className="text-right space-y-0.5">
                <p>Created: {created}</p>
                <p>Updated: {updated}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
