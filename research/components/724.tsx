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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const deployments = value;
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString();
  const truncate = (text: string, length = 120): string =>
    text.length > length ? text.slice(0, length) + "…" : text;

  if (!deployments || deployments.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No deployments available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {deployments.map((d) => {
        const {
          id,
          environment,
          original_environment,
          created_at,
          ref,
          sha,
          task,
          description,
          production_environment,
          transient_environment,
          creator,
          performed_via_github_app,
        } = d;
        const badges: React.ReactNode[] = [];
        if (production_environment) {
          badges.push(
            <span
              key="prod"
              className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full"
            >
              Production
            </span>
          );
        }
        if (transient_environment) {
          badges.push(
            <span
              key="trans"
              className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
            >
              Transient
            </span>
          );
        }

        return (
          <div key={id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                #{id} {environment}
              </h2>
              <div className="flex space-x-1">{badges}</div>
            </div>

            <div className="text-sm text-gray-500 mb-2">
              Created: {formatDate(created_at)}
            </div>

            <div className="flex flex-wrap items-center text-sm text-gray-700 mb-2 space-x-2">
              <span className="font-medium">Ref:</span>
              <span>{ref}</span>
              <span className="font-medium">SHA:</span>
              <span className="font-mono">{sha.slice(0, 7)}</span>
            </div>

            {task && (
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Task:</span> {task}
              </div>
            )}

            {original_environment && (
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">From:</span> {original_environment}
              </div>
            )}

            {description && (
              <p className="text-sm text-gray-700 mb-2">
                {truncate(description)}
              </p>
            )}

            {creator && (
              <div className="flex items-center mt-2">
                {'avatar_url' in creator && creator.avatar_url && (
                  <img
                    src={creator.avatar_url}
                    alt={creator.login}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                )}
                <span className="text-sm text-gray-600">
                  {creator.name ?? creator.login}
                </span>
              </div>
            )}

            {performed_via_github_app && (
              <div className="text-sm text-gray-700 mt-2">
                <span className="font-medium">Via App:</span>{" "}
                {performed_via_github_app.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
