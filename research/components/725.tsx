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
export type AutoViewInput = AutoViewInputSubTypes.deployment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    id,
    ref,
    sha,
    environment,
    task,
    description,
    creator,
    created_at,
    updated_at,
    repository_url,
    statuses_url,
    transient_environment,
    production_environment,
  } = value;

  const shortSha = sha.slice(0, 7);
  const createdAt = new Date(created_at).toLocaleString();
  const updatedAt = new Date(updated_at).toLocaleString();
  const isTransient = transient_environment ?? false;
  const isProduction = production_environment ?? false;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Deployment #{id}
        </h2>
        <span
          className={
            "px-2 py-1 text-xs font-medium rounded " +
            (isProduction
              ? "bg-green-100 text-green-800"
              : isTransient
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800")
          }
        >
          {isProduction
            ? "Production"
            : isTransient
            ? "Transient"
            : "Standard"}
        </span>
      </div>

      <div className="flex items-center space-x-3">
        {creator?.avatar_url && creator?.login && (
          <img
            src={creator.avatar_url}
            alt={creator.login}
            className="h-8 w-8 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">
            {creator?.login ?? "Unknown Creator"}
          </span>
          <span className="text-xs text-gray-500">
            Created: {createdAt}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-800">Ref:</span>{" "}
          {ref}
        </div>
        <div>
          <span className="font-medium text-gray-800">SHA:</span>{" "}
          <code className="font-mono">{shortSha}</code>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-800">Task:</span>{" "}
          {task}
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-800">Repository:</span>{" "}
          <span className="truncate block">{repository_url}</span>
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-700 line-clamp-2">
          {description}
        </p>
      )}

      <div className="flex flex-col text-xs text-gray-500 space-y-1">
        <span>Updated: {updatedAt}</span>
        <span>
          Statuses URL:{" "}
          <span className="truncate block">{statuses_url}</span>
        </span>
      </div>
    </div>
  );
}
